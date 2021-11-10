/* Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri in pagina devono essere rimossi e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati. */

// DOM Refs
const timerDom = document.querySelector('.timer');
const playBtn = document.querySelector('.play-game');
const generatedNumbersDom = document.querySelector('.generated.numbers');
const inputNumbersDom = document.querySelector('.input.numbers');
const resultsDom = document.querySelector('.results');

const genNumSection = document.getElementById('generated-numbers');
const inputNumbSection = document.getElementById('input-numbers');
const resultsSection = document.getElementById('results');

// Game data
let numbersList;
let inputList;
let coincidences;

// Game script
playBtn.addEventListener('click', () => {
    // Reset game data
    numbersList = [];
    inputList = [];
    coincidences = [];

    // Reset DOM
    generatedNumbersDom.innerHTML = '';
    inputNumbersDom.innerHTML = '';
    resultsDom.innerHTML = '';

    // Show timer and generated numbers
    timerDom.classList.remove('d-none');
    genNumSection.classList.remove('d-none');

    // Hide play game button, input numbers and results section
    playBtn.classList.add('d-none');
    inputNumbSection.classList.add('d-none');
    resultsSection.classList.add('d-none');

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
    let timer = 100;
    const refreshTimer = setInterval(() => {
        // Countdown
        timer--;

        // Refresh timer
        timerDom.innerHTML = `${timer / 10} secondi`;

        // End game
        if (timer === 0) {
            // Stop timer
            clearInterval(refreshTimer);

            // Hide timer
            timerDom.classList.add('d-none');

            // Hide generated numbers
            genNumSection.classList.add('d-none');

            setTimeout(() => {
                // Ask five numbers to check
                askFiveNumbers();

                // Check input numbers coincidence and print input numbers
                inputList.forEach(number => {
                    if (numbersList.includes(number)) {
                        coincidences.push(number);
                        inputNumbersDom.innerHTML += `<div class="card-number correct">${number}</div>`;
                    } else {
                        inputNumbersDom.innerHTML += `<div class="card-number wrong">${number}</div>`;
                    }
                });

                // Print results
                let stringCoincidences = '';
                switch (coincidences.length) {
                    case 0:
                        break;
                    case 1:
                        stringCoincidences = `<br>
                        In particolare, hai ricordato il numero ${coincidences[0]}.`;
                        break;
                    default:
                        let correctNumbersList = '';
                        coincidences.forEach( (e, i) => {
                            i === 0 ? correctNumbersList += `${e}` : correctNumbersList += `, ${e}`;
                        });

                        stringCoincidences = `<br>
                        In particolare, hai ricordato correttamente i numeri ${correctNumbersList}.`;
                }

                resultsDom.innerHTML = `Hai ottenuto un punteggio di ${coincidences.length} su 5.${stringCoincidences}`;

                // Show all
                genNumSection.classList.remove('d-none');
                inputNumbSection.classList.remove('d-none');
                resultsSection.classList.remove('d-none');

                // Riactivate play game button
                playBtn.classList.remove('d-none');
            }, 50);
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
            numberInput = parseInt(prompt(`Inserire numero ${i + 1} di 5.`).trim());
        } while (isNaN(numberInput));

        inputList.push(numberInput);
    }
}