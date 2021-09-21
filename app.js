let missed = 0;
const btnReset = document.querySelector('.btn__reset');
const keyboardBtns = document.querySelectorAll('.keyrow button');
const heartsImg = document.querySelectorAll('.tries img');
const overlay = document.getElementById('overlay');

//Starts the game. Hides the start screen when button is clicked.//
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

//This function picks a phrase from the array and returns it split into an aray of characters.//
function getRandomPhraseAsArray(arr) {
    const randomString = arr[Math.floor(Math.random() * arr.length)];
    const newStringSplit = randomString.split('');
    return newStringSplit;
  }

//This function append each item from the new array into a li element in the #phrase ul
//only when the character is not a space, and then gives it the class 'letter'. Otherwise the character receives the class 'space'. 
function addPhraseToDisplay(arr) {
    for (let i= 0; i < arr.length; i++ ) {
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
let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


//This function gets all of the elements with a class of 'letter', loops over them,  and check if they match the letter in the button the player has chosen.
//If a match wasn’t found, the function return null.//
function checkLetter(playerGuess) {
    const letters = document.getElementsByClassName('letter');
    let correctAnswer = null;

    for (let i= 0; i < letters.length; i++)
        if (playerGuess === letters[i].innerText.toLowerCase()) {
            letters[i].className = 'letter show';
            correctAnswer = letters[i].innerText;
        } 
    return correctAnswer;
}



//This function checks whether the game has been won or lost by check if the number of letters with class “show” 
//is equal to the number of letters with class “letters”. //
function checkWin() {
    let numShow = document.querySelectorAll('.show').length;
    let numLetter = document.querySelectorAll('.letter').length;
    const title = document.querySelector('.title');
    let winingPhrase = document.createElement('h2');
    winingPhrase.textContent = `The phrase was "${phraseArray.join('')}."`;
    
    if (numShow === numLetter) {
        setTimeout(function () {
            overlay.style.display = '';
            overlay.className = 'win';
            title.textContent = 'Congrats! You win';
            btnReset.innerText = 'Play again';
            overlay.appendChild(winingPhrase);
            reset();
        }, 1000);
    }
    if (missed >= 5) {
        setTimeout(function () {
            overlay.style.display = '';
            overlay.className = 'lose';
            title.textContent = 'Bummer! You lose';
            btnReset.innerText = 'Try again';
            overlay.appendChild(winingPhrase);
            reset();
        }, 500);
    }
}


//This event handler listen only to button events from the keyboard. When a player chooses a letter, 
//adds the “chosen” class to that button so the same letter can’t be chosen twice.//
for (let i= 0; i < keyboardBtns.length; i++) {
    keyboardBtns[i].addEventListener('click', (e) => {
        let playerGuess = e.target.innerText;
        checkLetter(playerGuess);
        e.target.className += 'chosen';
        e.target.disabled = 'true';
        let letterFound = checkLetter(playerGuess);
        
        if (letterFound === null) {
            heartsImg[missed].src= 'images/lostHeart.png';
            missed++;
        }
        checkWin();
    });
}


//This function resets the game either player win or lose.//
function reset() {
    btnReset.addEventListener('click', () => {
        missed = 0;
        for (let i= 0; i < keyboardBtns.length; i++) {
            keyboardBtns[i].className = '';
            keyboardBtns[i].disabled = '';
        }
        for (let i= 0; i < heartsImg.length; i++) {
            heartsImg[i].src = 'images/liveHeart.png';
        }
        overlay.removeChild(overlay.lastChild);
        const ul = document.querySelector('#phrase ul'); 
        ul.innerHTML = '';
        phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
        
    });    
}