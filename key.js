function animateToLevelZero() {
    defaultLife.textContent = `  x ${gameState.lives}`;
    heart.style.display = ``;
    timerElement.style.display = ``;
    startButton.style.fontSize = `45px`
    timer = setInterval(() => {
        gameState.seconds = gameState.seconds - 1;
        timerElement.textContent = `${gameState.seconds} `;
        if (gameState.seconds <= 0) {
            clearInterval(timer);
        }
    }, 1000)
    timerElement.style.boxShadow = `0px 0px 4px 3px darkgray`;
    startButton.style.transform = ``
    h3.style.display = ``;
    keyBoard.style.display = ``;
    startButton.textContent = `HOME`;
    startButton.style.transform = `translateX(450%) translateY(-250px)`
    startButton.style.backgroundColor = `red`;
    startButton.style.color = `white`;
    document.body.style.backgroundColor = `whitesmoke`;
    startButton.style.border = `5px solid darkred`
    headings.textContent = `Baby Level`;
    headings.style.color = "darkslategray";
}

function animateToHomePage() {
    clearInterval(timer);
    defaultLife.textContent = ``;
    heart.style.display = `none`;
    timerElement.style.display = `none`;
    headings.innerText = `KEY FOCUS`
    headings.style.color = `black`;
    startButton.style.fontSize = `100px`
    startButton.textContent = `START`;
    document.body.style.backgroundColor = ``;
    h3.style.display = `none`;
    startButton.style.transform = `translateY(200px)`
    keyBoard.style.display = `none`;
    startButton.style.color = ``;
    startButton.style.backgroundColor = ``;
    startButton.style.border = ``;
    span.forEach(element => {
        element.innerText = ``;
    })
}
function animateToRetry() {
    clearInterval(timer);
    defaultLife.textContent = ``;
    heart.style.display = `none`;
    timerElement.style.display = `none`;
    headings.innerText = ``;
    headings.style.color = `black`;
    startButton.style.fontSize = `80px`
    startButton.textContent = `RETRY`;
    document.body.style.backgroundColor = ``;
    h3.style.display = `none`;
    startButton.style.transform = `translateY(200px)`
    keyBoard.style.display = `none`;
    startButton.style.color = `white`;
    startButton.style.backgroundColor = `chocolate`;
    startButton.style.border = `brown`;
    span.forEach(element => {
        element.innerText = ``;
    })
}

// GAME STATE INFO :
// 0. Assign this IIFE's return value to a variable
const gameModule = (function () {
    const getInitialGameState = () => ({
        lives: 3,
        seconds: 60,
        levelsInfo: {
            currentLevel: 0,
            totalLevels: 5,
            setInfoList: [1, 2, 3, 6, 8, 11]
        },
        isStart: false,
        isGameOver: false,
        sound: true,
        gameAudio: {
            getGameAudio: () => new Audio("GameAudio/gameBackgroundMusic.mp3"),
            getClickAudio: () => new Audio("GameAudio/buttonPress.wav"),
            getKeyboardSounds: () => ({
                getInvalidAudio: () => new Audio('GameAudio/invalid.flac'),
                getGreenAudio: () => new Audio()(`GameAudio/greenSound2.mp3`),
                getRedAudio: () => new Audio("GameAudio/MPOP.wav")
            })
        },
    });
    const gameState = getInitialGameState();
    function startGame() {
        gameState.isStart = true;
        gameState.currentLevel = 0;
        gameState.gameAudio.getClickAudio();
        animateToLevelZero();
    }
    function gameOver() {
        if ((!gameState.lives || !gameState.seconds) && !gameState.levelsInfo.currentLevel) {
            gameState = getInitialGameState();
            animateToHomePage();
        }
        if ((!gameState.lives || !gameState.seconds) && gameState.levelsInfo.currentLevel > 0) {
            animateToRetry();
            resetGameLivesAndTimer();
        }
    }
    function levelUp() {
        // Level 0 -> 5:
        const currentLevel = gameState.levelsInfo.currentLevel;
        if (!gameState.levelsInfo.setInfoList[currentLevel] && gameState.lives > 0 && gameState.seconds > 0) {
            resetGameLivesAndTimer();
            const gameLevel = initialGameState();
            gameState.levelsInfo.currentLevel++;
        }
    }
    function resetGameLivesAndTimer() {
        const initialGameState = getInitialGameState();
        gameState.lives = initialGameState.lives;
        gameState.seconds = initialGameState.seconds;
    }
    function resetGameState() {
        gameState = getInitialGameState();
        animateToHomePage();
    }
    function getGameLife() {
        const gameLife = gameState.lives;
        return gameLife;
    }
    function endGame() {
        resetGameState();
        animateToHomePage();
    }
    function gameMusicPlay() {
        const backgroundMusic = gameState.gameAudio.getGameAudio();
        backgroundMusic.currentTime = 0;
        backgroundMusic.play();
    }
    function gameMusicStop() {
        const backgroundMusic = gameState.gameAudio.getGameAudio();
        backgroundMusic.pause();
    }
    function muteAudio() {
        gameState.sound = false;
        const sounds = [
            gameState.gameAudio.getGameAudio(),
            gameState.gameAudio.getClickAudio(),
            gameState.gameAudio.getKeyboardSounds(),
            keyboardSounds.getInvalidAudio(),
            keyboardSounds.getGreenAudio(),
            keyboardSounds.getRedAudio()
        ];
        sounds.forEach(audio => audio.pause());
    }
    function unMuteAudio() {
        gameState.sound = true;
        const sounds = [
            gameState.gameAudio.getGameAudio(),
            gameState.gameAudio.getClickAudio(),
            gameState.gameAudio.getKeyboardSounds(),
            keyboardSounds.getInvalidAudio(),
            keyboardSounds.getGreenAudio(),
            keyboardSounds.getRedAudio()
        ];
        sounds.forEach(audio => {
            audio.currentTime = 0;
            audio.play()
        });
    }
    function decrementGameLife() {
        gameState.lives--;
    }

    function printGameState() {
        console.log(gameState);
    }

    return startGame,
        gameOver,
        levelUp,
        resetGameLivesAndTimer,
        resetGameState,
        muteAudio,
        unMuteAudio,
        decrementGameLife,
        printGameState,
        getGameLife,
        endGame,
        gameMusicPlay,
        gameMusicStop
    // I. create a game state object (ensure it's a deep copy of initialGameState)
    // II. create utility methods to manipulate the game state object
    // 1. incrementGameLevel
    // 2. getGameLevel
    // 3. startGame
    // 4. endGame
    // 5. isGameRunning
    // 6. isGameOver
    // 7. getGameLife
    // 8. decrementGameLife
    // 9. resetGameState
    // 10. getGameAudio
    // 11. printGameState // just for debugging
    // 12. <create any other method you feel that makes sense>
    // III. return an object with all the aforementioned utility methods from 1..9.

    // return {
    //     incrementGameLevel: () => gameState.levelsInfo.currentLevel++
    // }
})();
// IV. Refactor the code below to use the gameModule above for creating the game logic.
// Button Animation Logic :

(function () {

})()
const elementIDs = {
    leftButton: 'left',
    rightButton: 'right'
}

const elementClasses = {
    keyboardElement: 'contents'
}

const stylingClasses = {
    translateMedium: 'translate-medium'
};

const getElement = (elementIdentifier, elementString) => document.querySelector(`${elementIdentifier}${elementString}`);
const getIdElement = elementString => getElement('#', elementString);
const getClassElement = elementString => getElement('.', elementString);

const buttons = document.querySelectorAll('.btns');
const dUp = document.querySelector('#up')
const dLeft = getIdElement(elementIDs.leftButton)
const dRight = document.querySelector(`#${elementIDs.rightButton}`)
const dDown = document.querySelector("#down")
const headings = document.querySelector('h1');
const keyBoard = getClassElement(elementClasses.keyboardElement);
const startButton = document.querySelector('.main');
startButton.style.transform = `translateY(200px)`
startButton.classList.add(stylingClasses.translateMedium);


// TIMER
let timer;
const timerElement = document.querySelector(`h6`);
let seconds = 0;
// LIVES 
let lives = 3; // 3 LIVES by Default
const heart = document.querySelector(`.heart`);
heart.style.display = `none`;
const defaultLife = document.querySelector(`.default`);
// LEVEL ARRAY
const levelArray = [`LEVEL 1 `, `LEVEL 2 `, `LEVEL 3 `, `LEVEL 4 `, `LEVEL 5 `];
let bool = false;
const buttonPress = () => {
    const audio = new Audio("GameAudio/buttonPress.wav");
    audio.currentTime = 0;
    audio.play();
}

const setComplete = () => {
    const audio = new Audio("GameAudio/setComplete.wav");
    audio.currentTime = 0;
    audio.play();
}
const invalidInput = () => {
    const audio = new Audio('GameAudio/invalid.flac')
    audio.currentTime = 0;
    audio.play();
}
const clickSoundGreen = () => {
    const audio = new Audio('GameAudio/greenSound2.mp3');
    audio.currentTime = 0;
    audio.play();
}
const clickSoundRed = () => {
    const audio = new Audio('GameAudio/MPOP.wav')
    audio.currentTime = 0;
    audio.play();
}
// KeyPress Event :

addEventListener('keydown', (e) => {
    const direction = e.key;
    if (direction === 'ArrowUp') {
        dUp.style.transform = `scale(.95) translateY(-3px)`;
        dUp.style.boxShadow = `0px 0px 10px 5px black inset`;
        dUp.style.transition = `.3s ease all`;
    }
    if (direction === 'ArrowDown') {
        dDown.style.transform = `scale(.95) `;
        dDown.style.boxShadow = `0px 0px 10px 5px black inset`;
        dDown.style.transition = `.3s ease all`;
    }
    if (direction === 'ArrowLeft') {
        dLeft.style.transform = `scale(.95) translateX(20px)`;
        dLeft.style.boxShadow = `0px 0px 10px 5px black inset`;
        dLeft.style.transition = `.3s ease all`;
    }
    if (direction === 'ArrowRight') {
        dRight.style.transform = `scale(.95) translateX(-20px)`;
        dRight.style.boxShadow = `0px 0px 10px 5px black inset`;
        dRight.style.transition = `.3s ease all`;
    }
});

const sequenceDisplay = document.querySelector('h3');

// Random KeyGenerator :
const span = document.querySelectorAll('span');
const arr = [];
const newSequence = () => {
    let i = 10;
    while (i--) {
        const random = Math.random();
        if (random <= .25) {
            arr.push("&uarr;");
        }
        else if (random <= .50) {
            arr.push("&rarr;");
        }
        else if (random <= .75) {
            arr.push("&rarr;");
        }
        else {
            arr.push("&darr;");
        }
    }
    span.forEach((item, i) => {
        item.innerHTML = arr[i];
        if (Math.random() <= Math.random()) {
            item.style.color = 'green';
        } else {
            item.style.color = 'red';
        } i++;
    })
}
let levelNumber = 0;
let sets = 0;
const entireLogic = () => {
    const spanCount = span.length;
    let index = 0;
    // Key Interactions Logic : 
    addEventListener('keyup', (e) => {
        dUp.style.transform = ``;
        dRight.style.transform = ``;
        dDown.style.transform = ``;
        dLeft.style.transform = ``;
        dUp.style.boxShadow = ``;
        dRight.style.boxShadow = ``;
        dDown.style.boxShadow = ``;
        dLeft.style.boxShadow = ``;
        const keyPress = e.key;
        const currentSpan = span[index];
        const currentSpanStyles = () => {
            currentSpan.style.color = `gray`;
            currentSpan.style.fontSize = `70px`;
            currentSpan.style.transition = `0.3s ease all`;
        }
        // Successful Sounds : 
        const greenUp = keyPress === `ArrowUp` && currentSpan.innerHTML === `↑` && currentSpan.style.color === `green`;
        const greenDown = keyPress === `ArrowDown` && currentSpan.innerHTML === `↓` && currentSpan.style.color === `green`;
        const greenLeft = keyPress === `ArrowLeft` && currentSpan.innerHTML === `←` && currentSpan.style.color === `green`;
        const greenRight = keyPress === `ArrowRight` && currentSpan.innerHTML === `→` && currentSpan.style.color === `green`;
        const redUp = keyPress === `ArrowDown` && currentSpan.innerHTML === `↑` && currentSpan.style.color === `red`;
        const redDown = keyPress === `ArrowUp` && currentSpan.innerHTML === `↓` && currentSpan.style.color === `red`;
        const redLeft = keyPress === `ArrowRight` && currentSpan.innerHTML === `←` && currentSpan.style.color === `red`;
        const redRight = keyPress === `ArrowLeft` && currentSpan.innerHTML === `→` && currentSpan.style.color === `red`;
        // UnSuccessful Sounds :
        const noTgreenUp = keyPress === `ArrowUp` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `→` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `green`;
        const noTgreenDown = keyPress === `ArrowDown` && (currentSpan.innerHTML === `→` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `green`;
        const noTgreenLeft = keyPress === `ArrowLeft` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `→`) && currentSpan.style.color === `green`;
        const noTgreenRight = keyPress === `ArrowRight` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `green`;
        const noTredUp = keyPress === `ArrowDown` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `→` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `red`;
        const noTredDown = keyPress === `ArrowUp` && (currentSpan.innerHTML === `→` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `red`;
        const noTredLeft = keyPress === `ArrowRight` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `→`) && currentSpan.style.color === `red`;
        const noTredRight = keyPress === `ArrowLeft` && (currentSpan.innerHTML === `↓` || currentSpan.innerHTML === `↑` || currentSpan.innerHTML === `←`) && currentSpan.style.color === `red`;
        if (noTgreenUp || noTgreenDown || noTgreenLeft || noTgreenRight || noTredUp || noTredDown || noTredRight || noTredLeft) {
            lives--;
            console.log(lives);
            defaultLife.textContent = `x ${lives}`
            invalidInput();
            if (!lives) {
                span.length = 0;
                index = 0;
                restart();
            }
        }
        // Gray Out Logic
        else if (greenUp) {
            clickSoundGreen();
            currentSpanStyles();
            index++;
        }
        else if (greenDown) {
            currentSpanStyles();
            clickSoundGreen();
            index++;
        }
        else if (greenLeft) {
            currentSpanStyles();
            clickSoundGreen();
            index++;
        }
        else if (greenRight) {
            currentSpanStyles();
            clickSoundGreen();
            index++;
        }
        else if (redUp) {
            currentSpanStyles();
            clickSoundRed();
            index++;
        }
        else if (redDown) {
            currentSpanStyles();
            clickSoundRed();
            index++;
        }
        else if (redLeft) {
            currentSpanStyles();
            clickSoundRed();
            index++;
        }
        else if (redRight) {
            currentSpanStyles();
            clickSoundRed();
            index++;
        }
        if (index >= spanCount) {
            setComplete();
            if (sets > 0) {
                newSequence();
                sets--;
            }
            index = 0;
            span.forEach(element => {
                element.style.fontSize = `80px`;
            })
        }
    })
}
const restart = () => {
    lives = 3;
    bool = false;
    homeAnimation();
}
const levels = () => {
    console.log(entireLogic())
    entireLogic();
}
// Timer Style :
timerElement.style.fontSize = `45px`
timerElement.style.display = `none`;
h3.style.display = `none`
keyBoard.style.display = `none`;
const levelOne = () => {
    lives++;
    h3.display = `none`;
    keyBoard.style.display = `none`;
    startButton.style.transform = `translateY(200px)`;
    startButton.style.fontSize = `100px`;
}

const homeAnimation = () => {
    clearInterval(timer);
    defaultLife.textContent = ``;
    heart.style.display = `none`;
    timerElement.style.display = `none`;
    headings.innerText = `KEY FOCUS`
    headings.style.color = ``;
    startButton.style.fontSize = `100px`
    startButton.textContent = `START`;
    document.body.style.backgroundColor = ``;
    h3.style.display = `none`;
    startButton.style.transform = `translateY(200px)`
    keyBoard.style.display = `none`;
    startButton.style.color = ``;
    startButton.style.backgroundColor = ``;
    startButton.style.border = ``;
    span.forEach(element => {
        element.innerText = ``;
    })
}

const startAnimation = () => {
    defaultLife.textContent = `  x ${lives}`;
    heart.style.display = ``;
    timerElement.style.display = ``;
    newSequence();
    startButton.style.fontSize = `45px`
    let seconds = 60;
    timer = setInterval(() => {
        seconds--;
        timerElement.textContent = `${seconds} `;
        if (!seconds) {
            clearInterval(timer);
        }
    }, 1000)
    timerElement.style.boxShadow = `0px 0px 4px 3px darkgray`;
    startButton.style.transform = ``
    h3.style.display = ``;
    keyBoard.style.display = ``;
    startButton.textContent = `HOME`;
    startButton.style.transform = `translateX(450%) translateY(-250px)`
    startButton.style.backgroundColor = `red`;
    startButton.style.color = `white`;
    document.body.style.backgroundColor = `whitesmoke`;
    startButton.style.border = `5px solid darkred`
    headings.textContent = `Baby Level`;
    headings.style.color = "darkslategray";
    levels();
}
startButton.addEventListener('click', () => {
    buttonPress()
    bool = !bool;
    console.log(bool);
    if (bool) {
        startAnimation();
    } else {
        homeAnimation();
    }
})

function logic() {
    // ...
    // ...
    gameModule.incrementGameLevel();
}

// gameModule
// gameController


const controller = (function (game, view) {

})(gameModule, viewModule)