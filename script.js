console.log('Rohit Azad')

const cards = document.querySelectorAll(".memoryCard");
let hasFlipedCard =false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockBoard) {
        return;
    }
    this.classList.add('flip');
    if(!hasFlipedCard){
        hasFlipedCard =  true;
        firstCard = this;
        return;
    }
    secondCard = this;
    lockBoard = true;
    checkForMatch();
}
function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework ;
    isMatch ? disabledCards() : unfipCards();
    checkForWin();
}

function disabledCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
function unfipCards(){
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function resetBoard(){
    [hasFlipedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
function shuffleCards(){
    cards.forEach(card=>{
        let ranDomPos = Math.floor(Math.random() * 12);
        card.style.order = ranDomPos;
    })
}

// timer function here 
let timeInterval ;
let seconds = 0;
let timeDiv = document.getElementById("timingShow");

// reset Game
let resetButton = document.getElementById("resetButton");
resetButton.addEventListener('click', resetGame);
function resetGame(){
    cards.forEach(card=>{
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    })
    resetBoard();
    shuffleCards();
    stopTimer();
    seconds = 0;
    startTimer();
    document.getElementById("resultShow").innerHTML = "";
}
function formeTime(time){
    return time < 10 ? `0${time}` : time;
}

function startTimer(){
    timeInterval = setInterval(()=>{
        seconds ++;

        const hours = Math.floor(seconds/3600);
        const minets = Math.floor((seconds % 3600) / 60);
        const rememingSecond = seconds % 60;

        timeDiv.innerHTML = `Timer: ${formeTime(hours)}:${formeTime(minets)}:${formeTime(rememingSecond)}`

    }, 1000)
}

function stopTimer(){
    clearInterval(timeInterval);
}

function checkForWin(){
    if(document.querySelectorAll('.flip').length === cards.length){
        stopTimer();

        const hours = Math.floor(seconds/3600);
        const minets = Math.floor((seconds % 3600) / 60);
        const rememingSecond = seconds % 60;
        document.getElementById("resultShow").innerHTML = `Congratulations! You've completed the game in ${formeTime(hours)}:${formeTime(minets)}:${formeTime(rememingSecond)}`
    }
}


function startGame(){
    startTimer();
    shuffleCards();
    cards.forEach(card=> card.addEventListener('click', flipCard));
    document.getElementById("startButton").remove()
}

let buttonStartGame = document.getElementById("startButton");
buttonStartGame.addEventListener('click', startGame)