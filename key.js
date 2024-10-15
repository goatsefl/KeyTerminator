
// GAME STATE INFO :
// 0. Assign this IIFE's return value to a variable


const gameModule = (function () {
    const getInitialGameState = () => ({
        lives: 3,
        seconds: 60,
        levelsInfo: {
            currentLevel: 0,
            totalLevels: 5,
            setInfoList: [1, 2, 3, 6, 8, 11],
            currentSetValue: 1
        },
        isStart: false,
        isGameOver: false,
        sound: true,
        gameAudio: {
            getGameAudio: () => new Audio("GameAudio/gameBackgroundMusic.mp3"),
            getClickAudio: () => new Audio("GameAudio/buttonPress.wav"),
            getStartSound: () => new Audio("GameAudio/start_sound.wav"),
            getSetCompleteSound: () => Audio("GameAudio/setComplete.wav"),
            getKeyboardSounds: {
                getInvalidAudio: () => new Audio('GameAudio/invalid.flac'),
                getGreenAudio: () => new Audio()(`GameAudio/greenSound2.mp3`),
                getRedAudio: () => new Audio("GameAudio/MPOP.wav")
            }
        },
    });
    let gameState = getInitialGameState();
    function startGame() {
        gameState.gameAudio.getClickAudio().play();
        gameState.isStart = true;
        gameState.currentLevel = 0;
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
            increaseSetValue();
        }
    }
    function increaseSetValue() {
        const getLevel = gameState.levelsInfo.currentLevel;
        gameState.levelsInfo.currentSetValue = gameState.levelsInfo.setInfoList[getLevel];
    }
    function getSetValue() {
        return gameState.currentSetValue;
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
        // for debugging purpose, Added getGameLife().
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
    function singleSetCompleteSound() {
        gameState.gameAudio.getSetCompleteSound().play();
    }
    function playSuccessfulGreenArrowSound() {
        gameState.gameAudio.getKeyboardSounds.getGreenAudio().play();
    }
    function playSuccessfulRedArrowSound() {
        gameState.gameAudio.getKeyboardSounds.getRedAudio().play();
    }
    function muteAudio() {
        gameState.sound = false;
        [
            gameState.gameAudio.getGameAudio(),
            gameState.gameAudio.getStartSound(),
            gameState.gameAudio.getClickAudio(),
            gameState.gameAudio.getSetCompleteSound(),
            gameState.gameAudio.getKeyboardSounds.getInvalidAudio(),
            gameState.gameAudio.getKeyboardSounds.getGreenAudio(),
            gameState.gameAudio.getKeyboardSounds.getRedAudio()

        ].forEach(audio => audio.pause());

    }
    function unMuteAudio() {
        gameState.sound = true;
        [
            gameState.gameAudio.getGameAudio(),
            gameState.gameAudio.getStartSound(),
            gameState.gameAudio.getClickAudio(),
            gameState.gameAudio.getSetCompleteSound(),
            gameState.gameAudio.getKeyboardSounds.getInvalidAudio(),
            gameState.gameAudio.getKeyboardSounds.getGreenAudio(),
            gameState.gameAudio.getKeyboardSounds.getRedAudio()

        ].forEach(audio => { audio.currentTime = 0; audio.play() });
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
        increaseSetValue,
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
        gameMusicStop,
        playSuccessfulGreenArrowSound,
        playSuccessfulRedArrowSound,
        singleSetCompleteSound,
        getSetValue
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
    // const elementIDs = {
    //     leftButton: 'left',
    //     rightButton: 'right',
    //     upButton: 'up',
    //     downButton: 'down'
    // }
    // //  Timer Object
    // const timerElement = document.querySelector(`.timer`);
    // // Default Lives 
    // const defaultLife = document.querySelector(`.default_lives`);
    // // Displays all the random arrow-elements
    // const sequenceDisplay = document.querySelector('.keyDisplay');
    // const span = document.querySelectorAll('.arrow-element');
    // const heart = document.querySelector(`.heart`);
    // const buttons = document.querySelectorAll('.btns');
    // const dUp = document.querySelector(`#${elementIDs.upButton}`)
    // const dLeft = document.querySelector(`#${elementIDs.leftButton}`)
    // const dRight = document.querySelector(`#${elementIDs.rightButton}`)
    // const dDown = document.querySelector(`#${elementIDs.downButton}`)
    // const headings = document.querySelector('.main_heading');
    // const keyBoard = getClassElement('.contents');
    // const startButton = document.querySelector('.main');

    const DOMStrings = {
        elementIDs: {
            leftButton: '#left',
            rightButton: '#right',
            upButton: '#up',
            downButton: '#down'
        },
        displaySequence: '.keyDisplay',
        container: '.container',
        mainHeading: '.main_heading',
        defaultLives: '.default_lives',
        currentLives: '.lives',
        mainButton: '.main',
        liveDisplay: '.heart',
        timerDisplay: '.timer',
        keyDirections: '.btns',
        randomKeyArrows: '.arrow-element',
        keyboardContents: '.contents'
    }
    function hideDisplayForRetry() {
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach(element => {
            element.classList.add('display-hidden');
        })
        document.querySelector(DOMStrings.defaultLives).classList.add('display-hidden');
        document.querySelector(DOMStrings.displaySequence).classList.add('display-hidden');
        document.querySelector(DOMStrings.heart).classList.add('display-hidden');
        document.querySelector(DOMStrings.timerDisplay).classList.add('display-hidden');
        document.querySelector(DOMStrings.mainHeading).classList.add('display-hidden');
        document.querySelector(DOMStrings.keyboardContents).classList.add('display-hidden');
    }
    function hideDisplayForHome() {
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach(element => {
            element.classList.add('display-hidden');
        })
        document.querySelector(DOMStrings.defaultLives).classList.add('display-hidden');
        document.querySelector(DOMStrings.heart).classList.add('display-hidden');
        document.querySelector(DOMStrings.timerDisplay).classList.add('display-hidden');
        document.querySelector(DOMStrings.displaySequence).classList.add('display-hidden');
        document.querySelector(DOMStrings.keyboardContents).classList.add('display-hidden');
    }
    const newSequence = () => {
        // probabilityHtmlElementMap is an object that has following contents:
        // mapTillNow is the accumulator/object which is spread on every iteration overwriting contents from the previous iteration.
        // currentProbability is currentValue and idx is the index of the arrowHtmlElements to access Html codes for directions.
        /*
        probabilityHtmlElementMap{
                    0.25 : '&uarr;',
                    0.5 : '&larr;',
                    0.75 : '&rarr;',
                    1 : '&darr;',
        }
        */
        // The below part generates returns all the random arrow elements of a desired length.
        const getRandomArrowElements = totalArrows => {
            const probabilities = [0.25, 0.5, 0.75, 1];
            const arrowHtmlElements = ['&uarr;', '&larr;', '&rarr;', '&darr;'];
            const probabilityHtmlElementsMap = probabilities.reduce((mapTillNow, currentProbability, idx) => ({ ...mapTillNow, [currentProbability]: arrowHtmlElements[idx] }), {});
            return Array.from({ length: totalArrows }, () => {
                const randomProbability = Math.random(); // We can opt out of this line and add Math.random() directly into comparison.
                for (const probability of Object.keys(probabilityHtmlElementsMap).sort((a, b) => a - b)) {
                    if (randomProbability <= probability) return probabilityHtmlElementsMap[probability];
                }
                return '&darr;'
            });
        };
        const arrowElements = getRandomArrowElements(10);
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
            item.innerHTML = arrowElements[i];
            item.style.color = (Math.random() <= Math.random()) ? 'green' : 'red';
        })
    }
    function animateToLevelZero() {
        document.querySelector(DOMStrings.defaultLives).textContent = `  x ${gameState.lives}`;
        document.querySelector(DOMStrings.heart).classList.add('display-visible');
        document.querySelector(DOMStrings.timerDisplay).classList.add('display-visible');
        document.querySelector(DOMStrings.mainButton).classList.add('font-size-45');
        document.querySelector(DOMStrings.timerDisplay).classList.add('timer-boxShadow');
        document.querySelector(DOMStrings.displaySequence).classList.add('display-visible');
        document.querySelector(DOMStrings.keyboardContents).classList.add('display-visible');
        document.querySelector(DOMStrings.mainButton).textContent = `HOME`;
        startButton.style.transform = `translateX(450%) translateY(-250px)`;
        document.querySelector(DOMStrings.mainButton).classList.add('bg-red');
        document.querySelector(DOMStrings.mainButton).classList.add('color-white');
        document.querySelector(DOMStrings.mainButton).classList.add('border-home');
        document.body.classList.add('bg-whitesmoke')
        document.querySelector(DOMStrings.mainHeading).textContent = `DEMO LEVEL`;
        document.querySelector(DOMStrings.mainHeading).classList.add('color-darkslategray')
        StartTimer();
    }
    const animateToRetry = () => {
        StopTimer();
        hideDisplayForRetry();
        document.querySelector(DOMStrings.mainButton).classList.add('font-size-80');
        document.querySelector(DOMStrings.mainButton).textContent = `RETRY`;
        document.body.classList.add('bg-lightgreen');
        document.querySelector(DOMStrings.mainButton).classList.add('transform-translate-y-200px')
        document.querySelector(DOMStrings.mainButton).classList.add('bg-color-chocolate');
        document.querySelector(DOMStrings.mainButton).classList.add('color-white')
        document.querySelector(DOMStrings.mainHeading).classList.add('color-black');
        document.querySelector(DOMStrings.mainButton).classList.add('border-retry');
        // document.querySelector(DOMStrings.defaultLives).classList.add('display-hidden');
        // document.querySelector(DOMStrings.heart).classList.add('display-hidden');
        // document.querySelector(DOMStrings.timerDisplay).classList.add('display-hidden');
        // document.querySelector(DOMStrings.mainHeading).classList.add('display-hidden');
        // document.querySelector(DOMStrings.displaySequence).classList.add('display-hidden');
        // document.querySelector(DOMStrings.keyboardContents).classList.add('display-hidden');
        // span.forEach(element => {
        //     element.classList.add('display-hidden');
        // })
    }
    const animateToHomePage = () => {
        StopTimer();
        hideDisplayForHome();
        document.querySelector(DOMStrings.mainHeading).innerText = `KEY FOCUS`;
        document.querySelector(DOMStrings.mainHeading).classList.add('color-black');
        document.querySelector(DOMStrings.mainButton).classList.add('font-size-100');
        document.querySelector(DOMStrings.mainButton).textContent = `START`;
        document.body.classList.add('bg-lightgreen');
        document.querySelector(DOMStrings.mainButton).classList.add('transform-translate-y-200px');
        document.querySelector(DOMStrings.mainButton).classList.add('color-black');
        document.querySelector(DOMStrings.mainButton).classList.add('bg-lightgreen');
        document.querySelector(DOMStrings.mainButton).classList.add('border-start');
        // document.querySelector(DOMStrings.defaultLives).classList.add('display-hidden');
        // document.querySelector(DOMStrings.heart).classList.add('display-hidden');
        // document.querySelector(DOMStrings.timerDisplay).classList.add('display-hidden');
        // document.querySelector(DOMStrings.displaySequence).classList.add('display-hidden');
        // document.querySelector(DOMStrings.keyboardContents).classList.add('display-hidden');
        // span.forEach(element => {
        //     element.classList.add('display-hidden');
        // })
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
                document.querySelector(DOMStrings.elementIDs.upButton).style.transform = `scale(.95) translateY(-3px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.upButton);
            }
            if (direction === 'ArrowDown') {
                document.querySelector(DOMStrings.elementIDs.downButton).style.transform = `scale(.95) `;
                addBoxShadowAndTransition(DOMStrings.elementIDs.downButton);
            }
            if (direction === 'ArrowLeft') {
                document.querySelector(DOMStrings.elementIDs.leftButton).style.transform = `scale(.95) translateX(20px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.leftButton);
            }
            if (direction === 'ArrowRight') {
                document.querySelector(DOMStrings.elementIDs.rightButton).style.transform = `scale(.95) translateX(-20px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.rightButton);
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

// Timer Style :
timerElement.classList.add('font-size-45');
timerElement.classList.add('.display-visible');
sequenceDisplay.classList.add('.display-visible');
keyBoard.classList.add('.display-visible');

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

    const entireLogic = () => {
        const arrowCount = document.querySelector(viewModule.DOMStrings.randomKeyArrows).length;
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
            const currentSpan = document.querySelector(viewModule.DOMStrings.randomKeyArrows)[index];
            const currentSpanStyles = () => {
                currentSpan.classList.add('color-gray');
                currentSpan.classList.add('font-size-70');
                currentSpan.classList.add('arrow-transition-to-gray');
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
                invalidInput();
                game.decrementGameLife();
                document.querySelector(view.DOMStrings.currentLives).textContent = `x ${view.DOMStrings.currentLives}`
            }
            // Gray Out Logic
            else if (greenUp) {
                currentSpanStyles();
                game.playSuccessfulGreenArrowSound();
                index++;
            }
            else if (greenDown) {
                currentSpanStyles();
                game.playSuccessfulGreenArrowSound();
                index++;
            }
            else if (greenLeft) {
                currentSpanStyles();
                game.playSuccessfulGreenArrowSound();
                index++;
            }
            else if (greenRight) {
                currentSpanStyles();
                game.playSuccessfulGreenArrowSound();
                index++;
            }
            else if (redUp) {
                currentSpanStyles();
                game.playSuccessfulRedArrowSound();
                index++;
            }
            else if (redDown) {
                currentSpanStyles();
                game.playSuccessfulRedArrowSound();
                index++;
            }
            else if (redLeft) {
                currentSpanStyles();
                game.playSuccessfulRedArrowSound();
                index++;
            }
            else if (redRight) {
                currentSpanStyles();
                game.playSuccessfulRedArrowSound();
                index++;
            }
            if (index >= arrowCount) {
                game.singleSetCompleteSound();
                if (game.currentSetValue > 0) {
                    view.newSequence();
                    game.currentSetValue--;
                }
                index = 0;
                document.querySelectorAll(game.DOMStrings.randomKeyArrows).forEach(element => {
                    element.classList.add('font-size-80');
                })
            }
        })
    };
})(gameModule, viewModule)