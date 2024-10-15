
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
            getStartSound: () => new Audio("GameAudio/start_sound.wav"),
            getKeyboardSounds: () => ({
                getInvalidAudio: () => new Audio('GameAudio/invalid.flac'),
                getGreenAudio: () => new Audio()(`GameAudio/greenSound2.mp3`),
                getRedAudio: () => new Audio("GameAudio/MPOP.wav")
            })
        },
    });
    let gameState = getInitialGameState();
    function startGame() {
        gameState.isStart = true;
        gameState.currentLevel = 0;
        gameState.gameAudio.getClickAudio();
    }
    function gameOver() {
        if ((!gameState.lives || !gameState.seconds) && !gameState.levelsInfo.currentLevel) {
            resetGameState();
        }
        if ((!gameState.lives || !gameState.seconds) && gameState.levelsInfo.currentLevel > 0) {
            resetGameLives();
            resetGameTimer();
        }
    }
    function levelUp() {
        // Level 0 -> 5:
        const currentLevel = gameState.levelsInfo.currentLevel;
        if (gameState.lives > 0 && gameState.seconds > 0) {
            resetGameLives();
            resetGameTimer();
            gameState.levelsInfo.currentLevel++;
            increaseSetCount();
        }
    }
    function increaseSetCount() {
        let level = gameState.levelsInfo.currentLevel;
        gameState.levelsInfo.setInfoList[level];
    }
    function resetGameLives() {
        const initialGameState = getInitialGameState();
        gameState.lives = initialGameState.lives;
    }
    function resetGameTimer() {
        const initialGameState = getInitialGameState();
        gameState.seconds = initialGameState.seconds;
    }
    function resetGameState() {
        gameState = getInitialGameState();
    }
    function getGameLife() {
        const gameLife = gameState.lives;
        return gameLife;
    }
    function endGame() {
        resetGameState();
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
            gameState.gameAudio.getStartSound(),
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
            gameState.gameAudio.getStartSound(),
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

    return {
        startGame,
        gameOver,
        levelUp,
        resetGameLives,
        resetGameTimer,
        resetGameState,
        muteAudio,
        unMuteAudio,
        decrementGameLife,
        printGameState,
        getGameLife,
        endGame,
        gameMusicPlay,
        gameMusicStop
    };
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

const viewModule = (function () {
    // Global Timer Variable :

    let timer;
    function StartTimer() {
        timer = setInterval(() => {
            gameState.seconds = gameState.seconds - 1;
            timerElement.textContent = `${gameState.seconds}`;
            if (gameState.seconds <= 0) {
                clearInterval(timer);
                const secondsReset = initialGameState.seconds;
                gameState.seconds = secondsReset;
            }
        }, 1000)
    }
    function StopTimer() {
        clearInterval(timer);
    }

    // Level timer
    const timerElement = document.querySelector(`timer`);
    // Default Lives 
    const defaultLife = document.querySelector(`.default_lives`);
    // Displays all the random arrow-elements
    const sequenceDisplay = document.querySelector('.keyDisplay');
    const span = document.querySelectorAll('.arrow-element');
    const heart = document.querySelector(`.heart`);
    const buttons = document.querySelectorAll('.btns');
    const dUp = document.querySelector(`#${elementIDs.upButton}`)
    const dLeft = document.querySelector(`#${elementIDs.leftButton}`)
    const dRight = document.querySelector(`#${elementIDs.rightButton}`)
    const dDown = document.querySelector(`#${elementIDs.downButton}`)
    const headings = document.querySelector('main_heading');
    const keyBoard = getClassElement(elementClasses.keyboardElement);
    const startButton = document.querySelector('.main');
    const DOMStrings = {
        container: 'container',
        mainHeading: 'main_heading',
        defaultLives: 'default_lives',
        currentLives: 'lives',
        mainButton: 'main',
        liveDisplay: 'heart',
        timerDisplay: 'timer',
        keyDirections: 'btns',
        randomKeyArrows: 'arrow-element',
        keyboardContents: 'contents'
    }
    const newSequence = () => {
        const arr = [];
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
                arr.push("&larr;");
            }
            else {
                arr.push("&darr;");
            }
        }
        span.forEach((item, i) => {
            item.innerHTML = arr[i];
            item.style.color = (Math.random() <= Math.random()) ? 'green' : 'red';
        })
    }
    function animateToLevelZero() {
        defaultLife.textContent = `  x ${gameState.lives}`;
        heart.classList.add('display-visible');
        timerElement.classList.add('display-visible');
        startButton.classList.add('font-size-45');
        timerElement.classList.add('timer-boxShadow');
        sequenceDisplay.classList.add('display-visible');
        keyBoard.classList.add('display-visible');
        startButton.textContent = `HOME`;
        startButton.style.transform = `translateX(450%) translateY(-250px)`;
        startButton.classList.add('bg-red');
        startButton.classList.add('color-white');
        document.body.classList.add('bg-whitesmoke')
        startButton.classList.add('border-home');
        headings.textContent = `Baby Level`;
        headings.classList.add('color-darkslategray')
        StartTimer();
    }
    const animateToRetry = () => {
        StopTimer();
        defaultLife.classList.add('display-hidden');
        heart.classList.add('display-hidden');
        timerElement.classList.add('display-hidden');
        headings.classList.add('display-hidden');
        headings.classList.add('color-black');
        startButton.classList.add('font-size-80');
        startButton.textContent = `RETRY`;
        document.body.classList.add('bg-lightgreen');
        sequenceDisplay.classList.add('display-hidden');
        startButton.classList.add('transform-translate-y-200px')
        keyBoard.classList.add('display-hidden');
        startButton.classList.add('color-white')
        startButton.classList.add('bg-color-chocolate');
        startButton.classList.add('border-retry');
        span.forEach(element => {
            element.classList.add('display-hidden');
        })
    }
    const animateToHomePage = () => {
        StopTimer();
        defaultLife.classList.add('display-hidden');
        heart.classList.add('display-hidden');
        timerElement.classList.add('display-hidden');
        headings.innerText = `KEY FOCUS`;
        headings.classList.add('color-black');
        startButton.classList.add('font-size-100');
        startButton.textContent = `START`;
        document.body.classList.add('bg-lightgreen');
        sequenceDisplay.classList.add('display-hidden');
        startButton.classList.add('transform-translate-y-200px');
        keyBoard.classList.add('display-hidden');
        startButton.classList.add('color-black');
        startButton.classList.add('bg-lightgreen');
        startButton.classList.add('border-start');
        span.forEach(element => {
            element.classList.add('display-hidden');
        })
    }
    const animateToLevelOne = () => {

    }
    const animateToLevelTwo = () => {

    }
    const animateToLevelThree = () => {

    }
    const animateToLevelFour = () => {

    }
    const animateToLevelFive = () => {

    }
    const keyBoardOnView = () => {
        function addBoxShadowAndTransition(element) {
            element.classList.add('transformKeyBoardOnView');
        }
        addEventListener('keydown', (e) => {
            const direction = e.key;
            if (direction === 'ArrowUp') {
                dUp.style.transform = `scale(.95) translateY(-3px)`;
                addBoxShadowAndTransition(dUp);
            }
            if (direction === 'ArrowDown') {
                dDown.style.transform = `scale(.95) `;
                addBoxShadowAndTransition(dDown);
            }
            if (direction === 'ArrowLeft') {
                dLeft.style.transform = `scale(.95) translateX(20px)`;
                addBoxShadowAndTransition(dLeft);
            }
            if (direction === 'ArrowRight') {
                dRight.style.transform = `scale(.95) translateX(-20px)`;
                addBoxShadowAndTransition(dRight);
            }
        });
    }
    return {
        DOMStrings,
        keyBoardOnView,
        animateToHomePage,
        animateToRetry,
        animateToLevelZero,
        animateToLevelOne,
        animateToLevelTwo,
        animateToLevelThree,
        animateToLevelFour,
        animateToLevelFive,
        newSequence
    };
})()
const elementIDs = {
    leftButton: 'left',
    rightButton: 'right',
    upButton: 'up',
    downButton: 'down'
}

const elementClasses = {
    keyboardElement: 'contents'
}


const getElement = (elementIdentifier, elementString) => document.querySelector(`${elementIdentifier}${elementString}`);
const getIdElement = elementString => getElement('#', elementString);
const getClassElement = elementString => getElement('.', elementString);

const buttons = document.querySelectorAll('.btns');
const dUp = document.querySelector(`#${elementIDs.upButton}`)
const dLeft = document.querySelector(`#${elementIDs.leftButton}`)
const dRight = document.querySelector(`#${elementIDs.rightButton}`)
const dDown = document.querySelector(`#${elementIDs.downButton}`)
const headings = document.querySelector('main_heading');
const keyBoard = getClassElement(elementClasses.keyboardElement);
const startButton = document.querySelector('.main');



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
                element.classList.add('font-size-80');
            })
        }
    })
}

// Timer Style :
timerElement.classList.add('font-size-45');
timerElement.classList.add('.display-hidden');
sequenceDisplay.classList.add('.display-hidden');
keyBoard.classList.add('.display-hidden');
const levelOne = () => {
    lives++;
    sequenceDisplay.display = `hidden`;
    keyBoard.style.display = `hidden`;
    startButton.style.transform = `translateY(200px)`;
    startButton.style.fontSize = `100px`;
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
    startButton.addEventListener('click', game.gameState.startGame());
})(gameModule, viewModule)