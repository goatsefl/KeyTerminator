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
        music: false,
        mute: false,
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
        gameSpecialBg: document.querySelectorAll('video')
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
    function changeMuteState() {
        return (gameState.mute) ? gameState.mute = false : gameState.mute = true;
    }
    function getMute() {
        return gameState.mute;
    }
    function resetBGM() {
        gameState.gameAudio.gameBackgroundMusic.currentTime = 0;
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
    function getSpecialBg() {
        return gameState.gameSpecialBg;
    }
    function increaseSetValue() {
        gameState.levelsInfo.currentSetValue =
            gameState.levelsInfo.setInEachLevel[gameState.levelsInfo.currentLevel];
        console.log(gameState.levelsInfo.currentSetValue);
    }
    function getSetValue() {
        return gameState.levelsInfo.currentSetValue;
    }
    function resetGameLives() {
        gameState.lives = getInitialGameState().lives;
    }
    function resetGameTimer() {
        gameState.seconds = getInitialGameState().seconds;
    }
    function getTimerValue() {
        return gameState.seconds; // debugging purpose
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
    function stopKeyBoardSounds() {
        [
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
            gameState.gameAudio.keyboardSounds.invalidAudio
        ].forEach((audio) => audio.muted = true)
    }
    function playKeyBoardSounds() {
        [
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
            gameState.gameAudio.keyboardSounds.invalidAudio
        ].forEach((audio) => audio.muted = false)
    }
    function decrementSetValue() {
        gameState.levelsInfo.currentSetValue--;
    }
    function resetSetValue() {
        gameState.levelsInfo.currentSetValue = gameState.levelsInfo.setInEachLevel[gameState.levelsInfo.currentLevel];
        console.log(gameState.levelsInfo.currentSetValue);
    }
    function gameMusicPlay() {
        gameState.music = true;
        gameState.gameAudio.gameBackgroundMusic.play();
    }
    function gameMusicStop() {
        gameState.gameAudio.gameBackgroundMusic.pause();
    }
    function changeSoundState() {
        if (gameState.sound) { return gameState.sound = false } else {
            return gameState.sound = true;
        }
    }
    function getLevelClearedSound() {
        return gameState.gameAudio.levelClearedSound.play();
    }
    function singleSetCompleteSound() {
        gameState.gameAudio.setCompleteSound.play();
    }
    function getGameSoundValue() {
        return gameState.sound;
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
        gameState.music = false;
        gameState.sound = false;
        [
            gameState.gameAudio.homeSound,
            gameState.gameAudio.retrySound,
            gameState.gameAudio.levelClearedSound,
            gameState.gameAudio.gameBackgroundMusic,
            gameState.gameAudio.startSound,
            gameState.gameAudio.clickAudio,
            gameState.gameAudio.setCompleteSound,
            gameState.gameAudio.keyboardSounds.invalidAudio,
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
        ].forEach((audio) => {
            audio.pause();
            audio.muted = true;
        });
    }
    function getSound() {
        return gameState.sound;
    }
    function getMusic() {
        return gameState.music;
    }
    function changeMusicState() {
        if (gameState.music) {
            return gameState.music = false
        } else { return gameState.music = true; }
    }
    function unMuteAudio() {
        gameState.sound = true;
        gameState.music = true;
        [
            gameState.gameAudio.homeSound,
            gameState.gameAudio.retrySound,
            gameState.gameAudio.levelClearedSound,
            gameState.gameAudio.gameBackgroundMusic,
            gameState.gameAudio.startSound,
            gameState.gameAudio.clickAudio,
            gameState.gameAudio.setCompleteSound,
            gameState.gameAudio.keyboardSounds.invalidAudio,
            gameState.gameAudio.keyboardSounds.greenAudio,
            gameState.gameAudio.keyboardSounds.redAudio,
        ].forEach((audio) => audio.muted = false);
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
        resetSetValue,
        changeMuteState,
        changeMusicState,
        changeSoundState,
        getMusic,
        getSound,
        getMute,
        resetBGM,
        playKeyBoardSounds,
        getGameSoundValue,
        stopKeyBoardSounds,
        getSpecialBg,
        getTimerValue,
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
    // Global View Variables
    const globalView = {
        videoElement: null,
        videoHandler: null
    };
    let secondsInterval;
    function startTimer() {
        if (!secondsInterval) {
            secondsInterval = setInterval(() => {
                let seconds = game.decrementSeconds();
                document.querySelector(DOMStrings.timerDisplay).textContent = seconds;
                document.querySelector(
                    DOMStrings.defaultLives
                ).textContent = `x ${game.getGameLife()}`;
                if (seconds <= 0) {
                    stopTimer();
                    if (!game.getGameLevel()) {
                        if (!game.getMute()) {
                            game.playHomeSound();
                        }
                        game.resetGameState();
                        animateToHomePage();
                    }
                    else {
                        if (!game.getMute()) {
                            game.playRetrySound();
                        }
                        game.resetSetValue();
                        animateToRetry();
                        game.gameRetry();
                    }
                }
            }, 1000);
        }
    }

    function stopTimer() {
        clearInterval(secondsInterval);
        secondsInterval = null;
    }
    const DOMStrings = {
        elementIDs: {
            leftButton: ".left-key",
            rightButton: ".right-key",
            upButton: ".up-key",
            downButton: ".down-key",
        },
        videoElementIDs: {
            4: 'level-4-video',
            5: 'level-5-video'
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
        gameOverPage: '.game-over-heading',
        specialLevelPage: '.special-level-background',
        gameInstruction: '.game-instructions',
        gameSound: '.game-sound',
        gameMusic: '.game-music',
        gameMuteUnmute: '.mute-unmute'
    };
    function startLoop(video) {
        video.currentTime = 0;
        video.play();
    }
    function specialLevelLoop(level) {
        const video = document.getElementById(DOMStrings.videoElementIDs[level]);
        console.log(video);
        if (!video) {
            console.error("No video found by the give id", `${video}`); return;
        }
        if (globalView.videoElement) { specialLevelLoopEnd() }
        globalView.videoElement = video;
        const handler = () => startLoop(video)
        video.addEventListener('ended', handler)
        video.play();
        globalView.videoHandler = handler;
    }
    function specialLevelLoopEnd() {
        if (!globalView.videoElement) {
            console.error("No video exists!!!"); return;
        }
        const video = globalView.videoElement;
        video.removeEventListener('ended', globalView.videoHandler)
        globalView.videoElement = null;
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
        // document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
        //     item.innerHTML = "";
        // })
        const arrowElements = getRandomArrowElements(10);
        document.querySelectorAll(DOMStrings.randomKeyArrows).forEach((item, i) => {
            item.innerHTML = arrowElements[i];
            item.classList.remove('arrow-transition-to-small');
            item.classList.add('font-size-80');
            item.style.color = (Math.random() <= 0.5) ? item.style.color = 'green' : item.style.color = 'red';
        });
    };
    function animateToLevelZero() {
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
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
            document.querySelector(DOMStrings.mainHeading).textContent = "CAPTAIN BUGGY";
            document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading');
            startTimer();
        }, 300);
        document
            .querySelector(DOMStrings.mainHeading)
            .classList.add("color-darkslategray");
    }
    function animateToRetry() {
        document.querySelector(DOMStrings.retryButton).classList.add('transition-to-retry-page');
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none');
        document.querySelector(DOMStrings.retryButton).classList.remove("display-none",
            "font-size-45",
            "bg-red",
            "color-white",
            "border-home",
            "transition-to-level-zero");
        document.querySelector(DOMStrings.retryButton).textContent = 'RETRY';
        document.querySelector(DOMStrings.gameOverPage).classList.remove('display-none');
        setTimeout(() => {
            document.body.className = 'container bg-change-colors'
            if (game.getGameLevel() > 3) {
                document.getElementById(DOMStrings.videoElementIDs[game.getGameLevel()]).classList.add('display-none');
            }
            document.querySelector(DOMStrings.mainHeading).classList.add("display-none")
        }, 300)
        stopTimer();
    }
    function animateToHomePage() {
        if (game.getGameLevel() > 3) {
            specialLevelLoopEnd()
            document.querySelector(DOMStrings.specialLevelPage).classList.add('display-none');
        }
        document.querySelector(DOMStrings.displaySequence).className = 'key-sequence-container';
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
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.querySelector(DOMStrings.retryButton).classList.remove("transition-to-retry-page")
        document.querySelector(DOMStrings.retryButton).textContent = 'HOME';
        document.querySelector(DOMStrings.retryButton).classList.add(
            "transition-to-level-zero",
            "font-size-45",
            "bg-red",
            "color-white",
            "border-home",
        )
        setTimeout(() => {
            document.querySelector(DOMStrings.mainHeading).classList.remove("display-none")
            document.querySelector(DOMStrings.gameOverPage).classList.add("display-none");
            document.querySelector(DOMStrings.retryButton).classList.add("display-none");
            document.querySelector(DOMStrings.gamePlayView).classList.remove('display-none');
            document.body.classList.remove('bg-change-colors');
            if (game.getGameLevel() > 3) {
                document.getElementById(DOMStrings.videoElementIDs[game.getGameLevel()]).classList.remove('display-none');
            }
        }, 300)
        animateToGivenLevel(level);
    }
    function animateToLevelOne() {
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.querySelector(DOMStrings.mainHeading).classList.remove('animate-heading')
        document.querySelector(DOMStrings.mainHeading).textContent = 'EASY';
        document.body.className = 'container whitesmoke-bg'
        document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading')
    }
    function animateToLevelTwo() {
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.querySelector(DOMStrings.mainHeading).classList.remove('animate-heading')
        document.querySelector(DOMStrings.mainHeading).textContent = "NOT HARD";
        document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading')
        document.body.classList.add('level-two-animate')
    }
    function animateToLevelThree() {
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.body.classList.remove('level-two-animate')
        document.querySelector(DOMStrings.mainHeading).classList.remove('animate-heading')
        document.querySelector(DOMStrings.mainHeading).textContent = "NOT EASY";
        document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading')
        document.body.classList.add('level-threeBg-animate')
        document.querySelector(DOMStrings.displaySequence).classList.add("level-threeContainer-animate")
    }
    function animateToLevelFour() {
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.body.classList.remove('level-threeBg-animate')
        document.querySelector(DOMStrings.displaySequence).classList.remove("level-threeContainer-animate");
        document.querySelector(DOMStrings.displaySequence).classList.add("level-fourContainer-animate");
        document.querySelector(DOMStrings.mainHeading).classList.remove('animate-heading')
        document.querySelector(DOMStrings.mainHeading).textContent = "EASILY HARD";
        document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading')
        document.querySelector(DOMStrings.specialLevelPage).classList.remove('display-none')
        document.getElementById(DOMStrings.videoElementIDs[game.getGameLevel()]).classList.remove('display-none')
        specialLevelLoop(game.getGameLevel());
    }
    function animateToLevelFive() {
        specialLevelLoopEnd();
        document.querySelector(DOMStrings.timerDisplay).textContent = 60;
        document.getElementById(DOMStrings.videoElementIDs[game.getGameLevel() - 1]).classList.add('display-none');
        document.querySelector(DOMStrings.displaySequence).classList.remove("level-fourContainer-animate");
        document.querySelector(DOMStrings.displaySequence).classList.add("level-fiveContainer-animate");
        document.querySelector(DOMStrings.mainHeading).classList.remove('animate-heading')
        document.querySelector(DOMStrings.mainHeading).textContent = "ABSURDITY";
        document.querySelector(DOMStrings.mainHeading).classList.add('animate-heading')
        document.getElementById(DOMStrings.videoElementIDs[game.getGameLevel()]).classList.remove('display-none');
        specialLevelLoop(game.getGameLevel());
    }
    function animateToCongratulationsPage() {
        document.querySelector(DOMStrings.gamePlayView).classList.add('display-none')
        specialLevelLoopEnd();
        document.querySelector('.end-page').classList.remove('display-none');
        const credits = document.getElementById('credit-dialogue')
        credits.autoplay();
    }
    function animateToGivenLevel(level) {
        switch (level) {
            case 1: animateToLevelOne(); break;
            case 2: animateToLevelTwo(); break;
            case 3: animateToLevelThree(); break;
            case 4: animateToLevelFour(); break;
            case 5: animateToLevelFive(); break;
            case 6: animateToCongratulationsPage(); break;
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
    function invalidInputAnimation() {
        document.querySelector(DOMStrings.displaySequence).classList.add('invalid-input-animate');
        setTimeout(() => {
            document.querySelector(DOMStrings.displaySequence).classList.remove('invalid-input-animate');
        }, 200)

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
        animateToGivenLevel,
        newSequence,
        invalidInputAnimation
    };
})(gameModule);

const controller = ((game, view) => {
    let sequenceCursor = 0;
    function initGame() {
        // Retry Button Listener
        document
            .querySelector(view.DOMStrings.retryButton)
            .addEventListener('click', () => {
                document.querySelector(view.DOMStrings.timerDisplay).textContent = 60;
                sequenceCursor = 0;
                view.startTimer();
                game.playStartSound();
                view.newSequence();
                view.animateToSameLevel(game.getGameLevel());
            })
        // Home Button Listener
        document
            .querySelector(view.DOMStrings.homeButton)
            .addEventListener('click', () => {
                document.body.className = 'container';
                document.querySelector(view.DOMStrings.gameInstruction).classList.remove('display-none');
                view.stopTimer();
                game.playHomeSound();
                view.animateToHomePage();
                game.resetGameState();
            })
        // Start Button Listener
        document
            .querySelector(view.DOMStrings.mainButton)
            .addEventListener("click", () => {
                sequenceCursor = 0;
                const element = document.documentElement;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
                document.querySelector(view.DOMStrings.gameInstruction).classList.add('display-none');
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
        // Music button
        document.querySelector(view.DOMStrings.gameMusic).addEventListener('click', () => {
            if (game.changeMusicState()) {
                game.gameMusicPlay();
                document.querySelector(view.DOMStrings.gameMusic).classList.remove('text-decoration');
            }
            else {
                game.gameMusicStop();
                document.querySelector(view.DOMStrings.gameMusic).classList.add('text-decoration');
            }
        })
        // Sound Button
        document.querySelector(view.DOMStrings.gameSound).addEventListener('click', () => {
            if (game.changeSoundState()) {
                game.playKeyBoardSounds();
                document.querySelector(view.DOMStrings.gameSound).classList.remove('text-decoration')
            }
            else {
                game.stopKeyBoardSounds();
                document.querySelector(view.DOMStrings.gameSound).classList.add('text-decoration')
            }
        })
        // Mute button
        document.querySelector(view.DOMStrings.gameMuteUnmute).addEventListener('click', () => {
            boolThree = !boolThree;
            if (boolThree) {
                if (bool) {
                    game.gameMusicPlay();
                }
                game.unMuteAudio();
                document.querySelector(view.DOMStrings.gameMuteUnmute).classList.remove('text-decoration')
                document.querySelector(view.DOMStrings.gameMusic).classList.remove('display-none');
                document.querySelector(view.DOMStrings.gameSound).classList.remove('display-none');
            }
            else {
                game.gameMusicStop();
                game.muteAudio();
                document.querySelector(view.DOMStrings.gameMuteUnmute).classList.add('text-decoration');
                document.querySelector(view.DOMStrings.gameMusic).classList.add('display-none');
                document.querySelector(view.DOMStrings.gameSound).classList.add('display-none');
            }
        })
        // If Music ends, looping function 
        document.querySelector(view.DOMStrings.gameMusic).addEventListener('ended', () => {
            game.resetBGM();
            game.gameMusicPlay();
        })
    }
    function gameStart() {
        const arrowCount = document.querySelectorAll(
            '.arrow-element'
        ).length;
        const arrowList = document.querySelectorAll(view.DOMStrings.randomKeyArrows);
        const directionContainer = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

        // Key Interactions Logic :
        const onKeyDownEvent = (e) => {
            const keyPress = e.key;
            view.animateOnKeyDown(keyPress);
            if (!directionContainer.includes(keyPress)) {
                return
            }
            const currentSpan = document.querySelectorAll(
                '.arrow-element'
            )[sequenceCursor];
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
                if (!game.getMute()) {
                    if (game.getSound()) {
                        game.playSuccessfulGreenArrowSound();
                    }
                }
                sequenceCursor++;
            } else if (successfulRedSounds[keyPress]) {
                currentSpanStyles();
                if (!game.getMute()) {
                    if (game.getSound()) {
                        game.playSuccessfulRedArrowSound();
                    }
                }
                sequenceCursor++;
            } else if (unSuccessfulGreenSound || unSuccessfulRedSounds) {
                if (!game.getMute()) {
                    if (game.getSound()) {
                        game.playInvalidInputSound();
                    }
                }
                view.invalidInputAnimation();
                game.decrementGameLife();
                // arrowList.forEach(item => console.log(item.innerHTML))
                if (!game.getGameLife()) {
                    view.stopTimer();
                    sequenceCursor = 0;
                    if (!game.getGameLevel()) {
                        if (!game.getMute()) {
                            game.playHomeSound();
                        }
                        game.resetGameState();
                        view.animateToHomePage();
                        document.onkeydown = null;
                    }
                    else {
                        if (!game.getMute()) {
                            game.playRetrySound();
                        }
                        game.resetSetValue();
                        view.animateToRetry();
                        game.gameRetry();
                    }
                }
                document.querySelector(
                    view.DOMStrings.defaultLives
                ).textContent = `x ${game.getGameLife()}`;
            }
            if (sequenceCursor === arrowCount && game.getGameLife() > 0) {
                game.decrementSetValue();
                sequenceCursor = 0;
                if (game.getSetValue() > 0) {
                    view.newSequence();
                    if (!game.getMute()) {
                        game.singleSetCompleteSound();
                    }
                }
                else if (!game.getSetValue()) {
                    console.log(game.getSetValue());
                    if (!game.getMute()) {
                        game.getLevelClearedSound();
                    }
                    game.levelUp();
                    document.querySelector(view.DOMStrings.defaultLives).textContent = `x ${game.getGameLife()}`
                    view.animateToGivenLevel(game.getGameLevel())
                    view.newSequence();
                }
            }
        };
        document.onkeydown = null;
        document.onkeydown = onKeyDownEvent;

    };
    return {
        initGame,
    };
})(gameModule, viewModule);

controller.initGame();
