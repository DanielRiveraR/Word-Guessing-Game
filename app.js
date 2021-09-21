const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const missed = 0;
const btnReset = document.querySelector('.btn__reset');
const keyboardBtns = document.querySelectorAll('.keyrow button');
const heartsImg = document.querySelectorAll('.tries img');


btnReset.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phrases = [
    'A diamond is forever',
    'There is no such thing as a free lunch',
    'You cannot have your cake and eat it too',
    'You cannot judge a book by its cover',
    'Better late than never',
    'Break a leg',
    'It is not rocket science',
    'No pain no gain'
];

function getRandomPhraseAsArray(arr) {
    const randomString = arr[Math.floor(Math.random() * arr.length)];
    const newStringSplit = randomString.split('');
    return newStringSplit;
  }
//   getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr) {
    for (i= 0; i < arr.length; i++ ) {
       const character = arr[i];
       const ul = document.querySelector('#phrase ul');
       const li = document.createElement('li');
       ul.appendChild(li);
       li.textContent = character;
       
       if (arr[i] !== ' ') {
           li.className = 'letter';
       } else {
           li.className = 'space';
       }
    }
  }
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


function checkLetter(playerGuess) {
    const letters = document.getElementsByClassName('letter');
    let correctAnswer = null;
    for (i= 0; i < letters.length; i++)
        if (playerGuess === letters[i].innerText.toLowerCase()) {
            letters[i].className = 'show';
            correctAnswer = letters[i].innerText;
        } 
    return correctAnswer
}


for (i= 0; i< keyboardBtns.length; i++) {
    keyboardBtns[i].addEventListener('click', (e) => {
        let playerGuess = e.target.innerText;
        checkLetter(playerGuess);
        e.target.className += 'chosen';
        e.target.disabled = 'true';
        let letterFound = checkLetter(playerGuess);
        
        if (checkLetter === null) {
            heartsImg[missed].src= 'images/lostHeart.png';
            missed++;
        }
        // checkWin();
    });
}