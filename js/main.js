/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri in pagina devono essere rimossi e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

// DOM Refs
const timerDom = document.querySelector('.timer');
const playBtn = document.querySelector('.play-game');
const generatedNumbersDom = document.querySelector('.generated.numbers');
const inputNumbersDom = document.querySelector('.input.numbers');
const resultsDom = document.querySelector('.results');

// Game data
let numbersList;
let inputList;
let coincidences;

// Game script
playBtn.addEventListener('click', () => {
    // Show timer
    timerDom.classList.remove('d-none');

    // Disable play game button
    playBtn.classList.add('disabled');

    // Reset game data
    numbersList = [];
    inputList = [];
    coincidences = 0;

    // Five random number generation
    for (let i = 0; i < 5; i++) {
        let randNumber;

        // Gen random number, check for unique number
        do {
            randNumber = genRandInt(0, 100);
        } while (numbersList.includes(randNumber));

        numbersList.push(randNumber);
        generatedNumbersDom.innerHTML += `<div class="card-number">${randNumber}</div>`;
    }

    // Start countdown
    let timer = 300;
    const refreshTimer = setInterval(() => {
        // Countdown
        timer--;

        // Refresh timer
        timerDom.innerHTML = `${timer / 10} secondi`;

        if (timer === 0) {
            // Stop timer
            clearInterval(refreshTimer);

            // Hide timer
            timerDom.classList.add('d-none');

            // Hide generated numbers
            generatedNumbersDom.classList.add('d-none');

            // Ask five numbers to check
            askFiveNumbers();

            // Check input numbers coincidences, print input numbers
            inputList.forEach(number => {
                // Print input number
                inputNumbersDom.innerHTML += `<div class="card-number">${number}</div>`;

                // Check coincidence
                if (numbersList.includes(number)) {
                    coincidences++;
                }
            });

            // Print result
            resultsDom.innerHTML = `Hai ricordato ${coincidences} numeri su 5.`;

            // Riactivate play game button
            playBtn.classList.remove('disabled');
        }

    }, 100);
});


/**
 * FUNCTIONS
 */
function genRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function askFiveNumbers() {
    for (let i = 0; i < 5; i++) {
        let numberInput;
        do {
            numberInput = parseInt(prompt(`Inserire numero ${i} di 5.`).trim());
        } while (isNaN(numberInput));

        inputList.push(numberInput);
    }
}