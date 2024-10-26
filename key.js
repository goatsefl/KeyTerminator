// GAME STATE INFO :
// 0. Assign this IIFE's return value to a variable

const gameModule = (() => {
    const getInitialGameState = () => ({
        lives: 3,
        seconds: 60,
        levelsInfo: {
            currentLevel: 0,
            totalLevels: 5,
            setInEachLevel: [1, 2, 3, 5, 8, 10],
            currentSetValue: 1,
        },
        isStart: false,
        sound: true,
        gameAudio: {
            gameBackgroundMusic: new Audio("GameAudio/gameBackgroundMusic.mp3"),
            clickAudio: new Audio("GameAudio/buttonPress.wav"),
            startSound: new Audio("GameAudio/start_sound.wav"),
            homeSound: new Audio("GameAudio/homeSound.wav"),
            retrySound: new Audio("GameAudio/retry.wav"),
            setCompleteSound: new Audio("GameAudio/setComplete.wav"),
            levelClearedSound: new Audio("GameAudio/levelCompleteSound.mp3"),
            keyboardSounds: {
                invalidAudio: new Audio("GameAudio/invalidSoundFinal.wav"),
                greenAudio: new Audio(`GameAudio/greenSound.wav`),
                redAudio: new Audio("GameAudio/MPOP.wav"),
            },
        },
    });
    var gameState = getInitialGameState();
    function startGame() {
        gameState.gameAudio.clickAudio.addEventListener("ended", () => {
            gameState.gameAudio.startSound.play();
        });
        gameState.gameAudio.clickAudio.play();
        gameState.isStart = true;
        gameState.currentLevel = 0;
    }
    function gameOver() {
        resetGameState();
    }
    function playStartSound() {
        gameState.gameAudio.startSound.play();
    }
    function playHomeSound() {
        gameState.gameAudio.homeSound.play();
    }
    function playRetrySound() {
        gameState.gameAudio.retrySound.play();
    }
    function levelUp() {
        // Level 0 -> 5:
        gameState.levelClearedSound.play();
        resetGameLives();
        resetGameTimer();
        gameState.levelsInfo.currentLevel++;
        increaseSetValue();
    }
    function decrementSeconds() {
        gameState.seconds -= 1;
        return gameState.seconds;
    }
    function gameRetry() {
        resetGameLives();
        resetGameTimer();
    }
    function increaseSetValue() {
        gameState.levelsInfo.currentSetValue =
            gameState.levelsInfo.setInEachLevel[gameState.levelsInfo.currentLevel];
    }
    function getSetValue() {
        return gameState.currentSetValue;
    }
    function resetGameLives() {
        gameState.lives = getInitialGameState().lives;
    }
    function resetGameTimer() {
        gameState.seconds = getInitialGameState().seconds;
    }
    function resetGameState() {
        gameState = getInitialGameState();
    }
    function getGameLevel() {
        return gameState.levelsInfo.currentLevel;
    }
    function getGameLife() {
        // for debugging purpose, Added getGameLife().
        return gameState.lives;
    }
    function endGame() {
        resetGameState();
    }
    function decrementSetValue() {
        gameState.currentSetValue--;
    }
    function gameMusicPlay() {
        gameState.gameAudio.gameBackgroundMusic.play();
    }
    function gameMusicStop() {
        gameState.gameAudio.gameBackgroundMusic.pause();
    }
    function getLevelClearedSound() {
        return gameState.gameAudio.levelClearedSound.play();
    }
    function singleSetCompleteSound() {
        gameState.gameAudio.setCompleteSound.play();
    }
    function playInvalidInputSound() {
        gameState.gameAudio.keyboardSounds.invalidAudio.play();
    }
    function playSuccessfulGreenArrowSound() {
        gameState.gameAudio.keyboardSounds.greenAudio.play();
    }
    function playSuccessfulRedArrowSound() {
        gameState.gameAudio.keyboardSounds.redAudio.play();
    }
    function muteAudio() {
        gameState.sound = false;
        [
            gameState.gameAudio.levelClearedSound,
            gameState.gameAudio.gameBackgroundMusic,
            gameState.gameAudio.startSound,
            gameState.gameAudio.clickAudio,
            gameState.gameAudio.setCompleteSound,
            gameState.gameAudio.keyboardSounds.invalidAudio,
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
        ].forEach((audio) => audio.pause());
    }
    function unMuteAudio() {
        gameState.sound = true;
        [
            gameState.gameAudio.levelClearedSound,
            gameState.gameAudio.gameBackgroundMusic,
            gameState.gameAudio.startSound,
            gameState.gameAudio.clickAudio,
            gameState.gameAudio.setCompleteSound,
            gameState.gameAudio.keyboardSounds.invalidAudio,
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
        ].forEach((audio) => {
            audio.currentTime = 0;
            audio.play();
        });
    }
    function decrementGameLife() {
        gameState.lives--;
    }
    function printGameState() {
        console.log(gameState);
    }
    function getGameState() {
        return gameState;
    }

    return {
        playStartSound,
        decrementSetValue,
        getGameLevel,
        decrementSeconds,
        gameRetry,
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
        playSuccessfulGreenArrowSound, getLevelClearedSound, singleSetCompleteSound, playSuccessfulRedArrowSound, playInvalidInputSound, playHomeSound, playRetrySound,
        getSetValue,
        getGameState,
        playInvalidInputSound, playHomeSound, playRetrySound
    };
})();

const viewModule = ((game) => {
    let secondsInterval;
    function startTimer() {
        stopTimer();
        secondsInterval = setInterval(() => {
            let seconds = game.decrementSeconds();
            document.querySelector(DOMStrings.timerDisplay).textContent = seconds;
            if (seconds <= 0) {
                stopTimer();
                if (!game.getGameLevel()) {
                    game.playHomeSound();
                    game.resetGameState();
                    animateToHomePage();
                }
                else {
                    game.retrySound();
                    animateToRetry();
                    game.gameRetry()
                }
            }
        }, 1000);
    }
    function stopTimer() {
        clearInterval(secondsInterval);
    }
    const DOMStrings = {
        elementIDs: {
            leftButton: ".left-key",
            rightButton: ".right-key",
            upButton: ".up-key",
            downButton: ".down-key",
        },

        randomQuotes: '.random-quotations',
        retryButton: '.retry-btn',
        metaDataContainer: '.game-metadata',
        gamePlayView: '.game-playing-view',
        gameHomeView: '.game-home-view',
        displaySequence: ".key-sequence-container",
        homeButton: '.home-btn',
        container: ".container",
        mainHeading: ".game-title",
        defaultLives: ".lives-indicator",
        currentLives: ".lives-container",
        mainButton: ".start-btn",
        displayLife: ".heart-img",
        timerDisplay: ".timer-countdown",
        keyDirections: ".btns",
        randomKeyArrows: ".arrow-element",
        keyboardContents: ".keyboard-buttons",
        gameOverPage: '.game-over-heading'
    };
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
        const getRandomArrowElements = (totalArrows) => {
            const probabilities = [0.25, 0.5, 0.75, 1];
            const arrowHtmlElements = ["&uarr;", "&larr;", "&rarr;", "&darr;"];
            const probabilityHtmlElementsMap = probabilities.reduce(
                (mapTillNow, currentProbability, idx) => ({
                    ...mapTillNow,
                    [currentProbability]: arrowHtmlElements[idx],
                }),
                {}
            );
            return Array.from({ length: totalArrows }, () => {
                const randomProbability = Math.random(); // We can opt out of this line and add Math.random() directly into comparison.
                for (const probability of Object.keys(probabilityHtmlElementsMap).sort(
                    (a, b) => a - b
                )) {
                    if (randomProbability <= probability)
                        return probabilityHtmlElementsMap[probability];
                }
                return "&darr;";
            });
        };
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
            item.innerHTML = "";
        })
        const arrowElements = getRandomArrowElements(10);
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
            item.innerHTML = arrowElements[i];
            item.classList.remove('arrow-transition-to-small');
            item.classList.add('font-size-80');
            item.style.color = (Math.random() <= 0.5) ? item.style.color = 'green' : item.style.color = 'red';
        });
    };
    function animateToLevelZero() {
        document.querySelector(DOMStrings.mainButton).classList.remove('transition-to-home-page')
        document.body.classList.remove("bg-lightgreen");
        document.querySelector(DOMStrings.mainButton).textContent = "HOME";
        document.querySelector(DOMStrings.defaultLives).textContent = `x ${game.getGameLife()}`;
        document.querySelector(DOMStrings.defaultLives).classList.add('font-size-45');
        document
            .querySelector(DOMStrings.mainButton)
            .classList.add(
                'transition-to-level-zero',
                "font-size-45",
                "bg-red",
                "color-white",
                "border-home",
            );
        setTimeout(() => {
            document.querySelector(DOMStrings.gameHomeView).classList.add('display-none');
            document.querySelector(DOMStrings.mainButton).classList.add('display-none');
            document.querySelector(DOMStrings.gamePlayView).classList.remove("display-none");
            document.body.classList.add("bg-whitesmoke");
            document.querySelector(DOMStrings.mainHeading).textContent = "KEY FOCUS : TUTORIAL";
            startTimer();
        }, 300);
        document
            .querySelector(DOMStrings.mainHeading)
            .classList.add("color-darkslategray");
    }
    function animateToRetry() {
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
        document.querySelector(DOMStrings.retryButton).textContent = 'RETRY';
        document.querySelector(DOMStrings.retryButton).classList.add('transition-to-home-page');
        document.querySelector(DOMStrings.gameOverPage).classList.remove('display-none');
    }
    function animateToHomePage() {
        stopTimer();
        document.querySelector(DOMStrings.gameHomeView).classList.remove('display-none');

        setTimeout(() => {
            document.querySelector(DOMStrings.mainButton)
                .classList.remove(
                    "font-size-45",
                    "bg-red",
                    "color-white",
                    "border-home",
                    "transition-to-level-zero"
                );
        }, 300)

        document.querySelector(DOMStrings.mainButton).classList.remove('display-none');
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
        document.querySelector(DOMStrings.mainHeading).innerText = `KEY FOCUS`;
        document.querySelector(DOMStrings.mainHeading).classList.add("color-black");
        document.querySelector(DOMStrings.mainButton).textContent = `START`;
        document.body.classList.add("bg-lightgreen");
        document
            .querySelector(DOMStrings.mainButton)
            .classList.add(
                "font-size-100",
                "transition-to-home-page",
                "color-black",
                "bg-lightgreen",
                "border-start",
                'font-mono'
            );
        document.querySelector(DOMStrings.gameOverPage).classList.add('display-none');
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
    }
    function animateToSameLevel(level) {
        document.querySelector(DOMStrings.gamePlayView).classList.remove('display-none');
        document.querySelector(DOMStrings.gameOverPage).classList.add("display-none");
        document.querySelector(DOMStrings.retryButton).textContent = 'HOME';
        document.querySelector(DOMStrings.retryButton).classList.add(
            "transition-to-level-zero",
            "font-size-45",
            "bg-red",
            "color-white",
            "border-home",
            "display-none"
        )
        animateToNextLevel(level);
        setTimeout(() => {
            stopTimer();
            startTimer();
        })
    }

    function animateToNextLevel(level) {
        function animateToLevelOne() {
            document.querySelector(DOMStrings.mainHeading).textContent = 'KEY FOCUS :LEVEL-1(Squirrel-Seeking Rookie)';
        }
        function animateToLevelTwo() {
            document.querySelector(DOMStrings.mainHeading).textContent = "KEY FOCUS : LEVEL-2(Daydreaming Dynamo)";
            let levelTwo = setInterval(() => {
                if (Math.random() <= .5) {
                    document.body.style.backgroundColor = 'crimson';
                } else {
                    document.body.style.backgroundColor = 'lawngreen';
                }
                if (!game.getSetValue() || !game.decrementSeconds()) {
                    clearInterval(levelTwo);
                }
            }, 2500)
        }
        function animateToLevelThree() {
            document.querySelector(DOMStrings.mainHeading).textContent = "KEY FOCUS : LEVEL-3(Mindful Multitasker)";
            let levelThree = setInterval(() => {
                let randomNumber = Math.random();
                switch (randomNumber) {
                    case (randomNumber <= 0.25):
                        document.body.style.backgroundColor = "green"; break;
                    case (randomNumber > 0.25 && randomNumber <= 0.5):
                        document.body.style.backgroundColor = "red"; break;
                    case (randomNumber > 0.50 && randomNumber <= 0.75):
                        document.body.style.backgroundColor = "black";
                        document.querySelector(DOMStrings.defaultLives).classList.add('color-white');
                        document.querySelector(DOMStrings.mainHeading).classList.add('color-white');
                        break;
                    case (randomNumber > 0.75 && randomNumber <= 1):
                        document.body.style.backgroundColor = "white";
                        document.querySelector(DOMStrings.mainHeading).classList.remove('color-white');
                        document.querySelector(DOMStrings.defaultLives).classList.remove('color-white');
                        break;
                }
                if (!game.getSetValue() || !game.decrementSeconds()) {
                    clearInterval(levelThree);
                }
            }, 2000)
        }
        function animateToLevelFour() {
            document.querySelector(DOMStrings.mainHeading).textContent = "KEY FOCUS : LEVEL-4(Concentration Ninja)";

        }
        function animateToLevelFive() {
            document.querySelector(DOMStrings.mainHeading).textContent = "KEY FOCUS : LEVEL-5";
        }
        switch (level) {
            case 1: animateToLevelOne(); break;
            case 2: animateToLevelTwo(); break;
            case 3: animateToLevelThree(); break;
            case 4: animateToLevelFour(); break;
            case 5: animateToLevelFive(); break;
        }
    }
    function animateOnKeyDown(input) {
        switch (input) {
            case "ArrowUp": document.querySelector(DOMStrings.elementIDs.upButton).classList.add('up-keydown'); break;
            case "ArrowDown": document.querySelector(DOMStrings.elementIDs.downButton).classList.add('down-keydown'); break;
            case "ArrowLeft": document.querySelector(DOMStrings.elementIDs.leftButton).classList.add('left-keydown'); break;
            case "ArrowRight": document.querySelector(DOMStrings.elementIDs.rightButton).classList.add('right-keydown'); break;
        }
    }
    function animateOnKeyUp(input) {
        switch (input) {
            case "ArrowUp": document.querySelector(DOMStrings.elementIDs.upButton).classList.remove('up-keydown'); break;
            case "ArrowDown": document.querySelector(DOMStrings.elementIDs.downButton).classList.remove('down-keydown'); break;
            case "ArrowLeft": document.querySelector(DOMStrings.elementIDs.leftButton).classList.remove('left-keydown'); break;
            case "ArrowRight": document.querySelector(DOMStrings.elementIDs.rightButton).classList.remove('right-keydown'); break;
        }
    }
    return {
        startTimer,
        stopTimer,
        DOMStrings,
        animateOnKeyDown,
        animateOnKeyUp,
        animateToHomePage,
        animateToRetry,
        animateToSameLevel,
        animateToLevelZero,
        animateToNextLevel,
        newSequence
    };
})(gameModule);

const controller = ((game, view) => {

    function initGame() {
        // Retry Button Listener
        document
            .querySelector(view.DOMStrings.retryButton)
            .addEventListener('click', () => {
                view.stopTimer();
                game.playStartSound();
                view.animateToSameLevel(game.getGameLevel());
            })
        // Home Button Listener
        document
            .querySelector(view.DOMStrings.homeButton)
            .addEventListener('click', () => {
                view.stopTimer();
                game.playHomeSound();
                view.animateToHomePage();
                game.resetGameState();
            })
        // Start Button Listener
        document
            .querySelector(view.DOMStrings.mainButton)
            .addEventListener("click", () => {
                view.animateToLevelZero();
                game.startGame();
                view.newSequence();
                gameStart();
            });
        // Keyboard Animations
        document
            .addEventListener("keyup", (e) => {
                let input = e.key;
                view.animateOnKeyUp(input);
            })
    }
    function gameStart() {
        const arrowCount = document.querySelectorAll(
            '.arrow-element'
        ).length;
        const arrowList = document.querySelector(view.DOMStrings.randomKeyArrows);
        const directionContainer = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        let index = 0;
        // Key Interactions Logic :
        document.addEventListener("keydown", (e) => {
            const keyPress = e.key;
            view.animateOnKeyDown(keyPress);
            if (!directionContainer.includes(keyPress)) {
                return
            }
            console.log(keyPress);
            const currentSpan = document.querySelectorAll(
                '.arrow-element'
            )[index];
            console.log(currentSpan);
            const currentSpanStyles = () => {
                currentSpan.classList.add(
                    "arrow-transition-to-small",
                );
                currentSpan.style.color = 'gray'
            };
            const greenCurrentSpanColor = () => {
                return currentSpan.style.color === "green";
            };
            const redCurrentSpanColor = () => {
                return currentSpan.style.color === "red";
            };
            const arrowKeysToCharacterMap = { Up: `↑`, Down: `↓`, Left: `←`, Right: `→` };
            const arrowCharactersToCharacterMappedOpposite = { Up: 'Down', Down: 'Up', Left: "Right", Right: "Left" };
            const arrowKeys = Object.keys(arrowKeysToCharacterMap);
            const allDirections = arrowKeys.reduce((directions, key) => {
                directions[`direction${key}`] = currentSpan.innerHTML === arrowKeysToCharacterMap[key];
                return directions;
            }, {});
            // Successful Sounds :
            const successfulGreenSounds = arrowKeys.reduce((greenSounds, currentValue) => {
                return {
                    ...greenSounds, [`Arrow${currentValue}`]: allDirections[`direction${currentValue}`] && greenCurrentSpanColor()
                };
            }, {});
            const successfulRedSounds = arrowKeys.reduce((redSounds, currentValue) => {
                const isOppositeDirection = allDirections[`direction${arrowCharactersToCharacterMappedOpposite[currentValue]}`];
                const isCurrentSpanRed = redCurrentSpanColor();
                return {
                    ...redSounds,
                    [`Arrow${currentValue}`]: isOppositeDirection && isCurrentSpanRed
                };
            }, {});

            // UnSuccessful Sounds :
            // console.log(successfulGreenSounds[keyPress])
            // console.log(successfulRedSounds[keyPress])
            let unSuccessfulGreenSound = !successfulGreenSounds[keyPress];
            let unSuccessfulRedSounds = !successfulRedSounds[keyPress];
            // Gray Out Logic

            if (successfulGreenSounds[keyPress]) {
                currentSpanStyles();
                arrowList.forEach(item => console.log(item.innerHTML))
                game.playSuccessfulGreenArrowSound();
                index++;
            } else if (successfulRedSounds[keyPress]) {
                currentSpanStyles();
                arrowList.forEach(item => console.log(item.innerHTML))
                game.playSuccessfulRedArrowSound();
                index++;
            } else if (unSuccessfulGreenSound || unSuccessfulRedSounds) {
                game.playInvalidInputSound();
                game.decrementGameLife();
                // arrowList.forEach(item => console.log(item.innerHTML))
                if (!game.getGameLife()) {
                    index = 0;
                    if (!game.getGameLevel()) {
                        game.playHomeSound();
                        game.resetGameState();
                        view.animateToHomePage();
                    }
                    else {
                        game.playRetrySound();
                        view.animateToRetry();
                        game.gameRetry();
                    }
                }
                document.querySelector(
                    view.DOMStrings.defaultLives
                ).textContent = `x ${game.getGameLife()}`;
            }
            if (index === arrowCount && game.getGameLife() > 0) {
                arrowList.forEach(item => console.log(item.innerHTML))
                game.decrementSetValue();
                view.newSequence();
                index = 0;
                if (game.getSetValue() > 0) {
                    view.newSequence();
                    game.singleSetCompleteSound();
                }
                else if (!game.getSetValue) {
                    game.getLevelClearedSound();
                    game.levelUp();
                    view.animateToNextLevel()
                }
            }
        });
    };
    return {
        initGame,
    };
})(gameModule, viewModule);

controller.initGame();
