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
        isGameOver: false,
        sound: true,
        gameAudio: {
            gameBackgroundMusic: new Audio("GameAudio/gameBackgroundMusic.mp3"),
            clickAudio: new Audio("GameAudio/buttonPress.wav"),
            startSound: new Audio("GameAudio/start_sound.wav"),
            setCompleteSound: new Audio("GameAudio/setComplete.wav"),
            levelClearedSound: new Audio("GameAudio/levelCompleteSound.mp3"),
            keyboardSounds: {
                invalidAudio: new Audio("GameAudio/invalidSoundFinal.wav"),
                greenAudio: new Audio(`GameAudio/greenSound2.mp3`),
                redAudio: new Audio("GameAudio/MPOP.wav"),
            },
        },
    });
    var gameState = getInitialGameState();
    function gameStart() {
        gameState.gameAudio.clickAudio.play();
        gameState.isStart = true;
        gameState.currentLevel = 0;
        gameState.gameAudio.clickAudio.addEventListener("ended", () => {
            gameState.gameAudio.startSound.play();
        });
    }
    function gameOver() {
        resetGameState();
    }
    function levelUp() {
        // Level 0 -> 5:
        if (gameState.lives > 0 && gameState.seconds > 0) {
            gameState.levelClearedSound.play();
            resetGameLives();
            resetGameTimer();
            gameState.levelsInfo.currentLevel++;
            increaseSetValue();
        }
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
        return gameState.gameAudio.levelClearedSound().play();
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
        decrementSetValue,
        getGameLevel,
        decrementSeconds,
        gameRetry,
        gameStart,
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
        getLevelClearedSound,
        singleSetCompleteSound,
        getSetValue,
        getGameState,
        playInvalidInputSound,
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

const viewModule = ((game) => {
    let secondsInterval;
    function startTimer() {
        secondsInterval = setInterval(() => {
            let seconds = game.decrementSeconds();
            document.querySelector(DOMStrings.timerDisplay).textContent = seconds;
            if (seconds <= 0) {
                clearInterval(secondsInterval);
                game.resetGameTimer();
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
    function defaultVisibility() {
        document
            .querySelector(DOMStrings.displayLife)
            .classList.add("display-hidden");
        document
            .querySelector(DOMStrings.timerDisplay)
            .classList.add("display-hidden");
        document
            .querySelector(DOMStrings.keyboardContents)
            .classList.add("display-hidden");
    }
    const resetArrowStyles = () => {
        [
            document.querySelector(DOMStrings.elementIDs.upButton),
            document.querySelector(DOMStrings.elementIDs.downButton),
            document.querySelector(DOMStrings.elementIDs.leftButton),
            document.querySelector(DOMStrings.elementIDs.rightButton),
        ].forEach((element) => {
            element.style.transform = "";
            element.style.boxShadow = "";
        });
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
        const arrowElements = getRandomArrowElements(10);
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
            item.innerHTML = arrowElements[i];
            item.classList.add('font-size-80');
            item.style.color = Math.random() <= Math.random() ? "green" : "red";
        });
    };
    function animateToLevelZero() {
        document.querySelector(DOMStrings.gameHomeView).classList.add('display-none');
        document.querySelector(DOMStrings.gamePlayView).classList.remove("display-none");
        document.querySelector(DOMStrings.mainButton).textContent = "HOME";
        document
            .querySelector(DOMStrings.mainButton)
            .classList.add(
                "transition-to-level-zero",
                "font-size-45",
                "bg-red",
                "color-white",
                "border-home",
                "display-none"
            );
        document.body.classList.add("bg-whitesmoke");
        document.querySelector(DOMStrings.mainHeading).textContent = "LEVEL 0: Joe Biden's Focus Certificate";
        document
            .querySelector(DOMStrings.mainHeading)
            .classList.add("color-darkslategray");
        startTimer();
    }
    function animateToRetry() {
        stopTimer();
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
        document.querySelector(DOMStrings.retryButton).textContent = 'RETRY';
        document.querySelector(DOMStrings.retryButton).classList.add('transition-to-home');
        document.querySelector(DOMStrings.gameOverPage).classList.remove('display-none');
    }
    function animateToHomePage() {
        stopTimer();
        document.querySelector(DOMStrings.retryButton).classList.add('display-none');
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
                "border-start"
            );
        document.querySelector(DOMStrings.gameOverPage).classList.add('display-none');
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
    }
    function animateToSameLevel() {
        document.querySelector(DOMStrings.retryButton).class
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
    }

    function animateToNextLevel() {
        const levelValue = game.getGameLevel();
        function animateToLevelOne(levelValue) {
            animateToLevelZero();

        }
        function animateToLevelTwo(levelValue) {

        }
        function animateToLevelThree(levelValue) {

        }
        function animateToLevelFour(levelValue) {

        }
        function animateToLevelFive(levelValue) {

        }
    }
    const animateOnKeypress = (keypressDirection) => {
        function addBoxShadowAndTransition(element) {
            element.classList.add("animate-keypress");
        }
        switch (keypressDirection) {
            case "ArrowUp":
                document.querySelector(
                    DOMStrings.elementIDs.upButton
                ).style.transform = `scale(.95) translateY(-3px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.upButton);
                break;
            case "ArrowDown":
                document.querySelector(
                    DOMStrings.elementIDs.downButton
                ).style.transform = `scale(.95) `;
                addBoxShadowAndTransition(DOMStrings.elementIDs.downButton);
                break;
            case "ArrowLeft":
                document.querySelector(
                    DOMStrings.elementIDs.leftButton
                ).style.transform = `scale(.95) translateX(20px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.leftButton);
                break;
            case "ArrowRight":
                document.querySelector(
                    DOMStrings.elementIDs.rightButton
                ).style.transform = `scale(.95) translateX(-20px)`;
                addBoxShadowAndTransition(DOMStrings.elementIDs.rightButton);
                break;
        }
    };
    return {
        startTimer,
        stopTimer,
        DOMStrings,
        resetArrowStyles,
        animateOnKeypress,
        animateToHomePage,
        animateToRetry,
        animateToLevelZero,
        animateToLevelOne,
        animateToLevelTwo,
        animateToLevelThree,
        animateToLevelFour,
        animateToLevelFive,
        newSequence,
        defaultVisibility,
    };
})(gameModule);

const controller = ((game, view) => {
    function initGame() {
        view.defaultVisibility();
        document
            .querySelector(view.DOMStrings.mainButton)
            .addEventListener("click", () => {
                view.animateToLevelZero();
                game.gameStart();
                gameStart();
            });
    }
    const gameStart = () => {
        const arrowCount = document.querySelector(
            view.DOMStrings.randomKeyArrows
        ).length;
        let index = 0;
        // Key Interactions Logic :
        document.querySelector(view.DOMStrings.keyboardContents).addEventListener("keydown", (e) => {
            const keyPress = e.key;
            view.animateOnKeypress(keyPress);
            view.resetArrowStyles();
            const currentSpan = document.querySelector(
                view.DOMStrings.randomKeyArrows
            )[index];
            const currentSpanStyles = () => {
                currentSpan.classList.add(
                    "color-gray",
                    "arrow-transition-to-gray",
                    "font-size-70"
                );
            };
            const greenCurrentSpanColor = () => {
                currentSpan.style.color == "green";
            };
            const redCurrentSpanColor = () => {
                currentSpan.style.color == "red";
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
                return {
                    ...redSounds, [`Arrow${currentValue}`]: allDirections[`direction${arrowCharactersToCharacterMappedOpposite[currentValue]}`] && redCurrentSpanColor()
                }
            })
            // UnSuccessful Sounds :

            const unSuccessfulGreenSound = !successfulGreenSounds[keyPress];
            const unSuccessfulRedSounds = !successfulRedSounds[keyPress];

            // Gray Out Logic

            if (successfulGreenSounds[keyPress]) {
                currentSpanStyles();
                game.playSuccessfulGreenArrowSound();
                index++;
            } else if (successfulRedSounds[keyPress]) {
                currentSpanStyles();
                game.playSuccessfulRedArrowSound();
                index++;
            } else if (unSuccessfulGreenSound || unSuccessfulRedSounds) {
                game.playInvalidInputSound();
                game.decrementGameLife();
                document.querySelector(
                    view.DOMStrings.defaultLives
                ).textContent = `x ${view.DOMStrings.defaultLives}`;
            }
            if (index > arrowCount && game.lives > 0 && game.decrementSeconds() > 0) {
                if (game.getSetValue() > 0) {
                    view.newSequence();
                    game.singleSetCompleteSound();
                    game.decrementSetValue();
                    index = 0;
                }
                else if (game.getSetValue === 0) {
                    game.levelClearedSound();
                }
            }
            else {
                if (!game.getGameLevel()) {
                    game.gameOver();
                    view.animateToHomePage();
                }
                else {
                    game.gameRetry();
                    view.animateToRetry();
                }
            }
        });
    };
    return {
        initGame,
    };
})(gameModule, viewModule);

controller.initGame();
