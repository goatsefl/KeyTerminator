// Button Animation Logic :

const buttons = document.querySelectorAll('.btns');
const dUp = document.querySelector('#up')
const dLeft = document.querySelector('#left')
const dRight = document.querySelector("#right")
const dDown = document.querySelector("#down")
const headings = document.querySelector('h1');
const timerElement = document.querySelector(`h6`);
const keyBoard = document.querySelector(`.contents`);
const startButton = document.querySelector('.main');
let seconds = 0;
const levelArray = [`LEVEL 1 >>`, `LEVEL 2 >> `, `LEVEL 3 >> `, `LEVEL 4 >> `, `LEVEL 5 >>`];
let lives = 3; // 3 LIVES by Default

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
    if (direction[5] == 'U') {
        dUp.style.transform = `scale(.95) translateY(-3px)`;
        dUp.style.boxShadow = `0px 0px 10px 5px black inset`;
        dUp.style.transition = `.3s ease all`;
    }
    if (direction[5] == 'D') {
        dDown.style.transform = `scale(.95) `;
        dDown.style.boxShadow = `0px 0px 10px 5px black inset`;
        dDown.style.transition = `.3s ease all`;
    }
    if (direction[5] == 'L') {
        dLeft.style.transform = `scale(.95) translateX(20px)`;
        dLeft.style.boxShadow = `0px 0px 10px 5px black inset`;
        dLeft.style.transition = `.3s ease all`;
    }
    if (direction[5] == 'R') {
        dRight.style.transform = `scale(.95) translateX(-20px)`;
        dRight.style.boxShadow = `0px 0px 10px 5px black inset`;
        dRight.style.transition = `.3s ease all`;
    }
});

const h3 = document.querySelector('h3');

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
    let errorCounter = 0;
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
            invalidInput();
            if (!lives) {
                keyBoard.style.display = `none`;
                h3.style.display = `none`;
                span.forEach(element => {
                    element.textContent = ``;
                })
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
const levels = () => {
    entireLogic();
}
// Timer Style :
timerElement.style.fontSize = `45px`
timerElement.style.display = `none`;
h3.style.display = `none`
let bool = false;

keyBoard.style.display = `none`;
startButton.style.transform = `translateY(300px)`;
const levelOne = () => {
    lives++;
    h3.display = `none`;
    keyBoard.style.display = `none`;
    startButton.style.transform = `translateY(200px)`;
    startButton.style.fontSize = `100px`;
}

const homeAnimation = () => {
    clearInterval(timer);
    timerElement.style.display = `none`;
    headings.innerText = `KEY FOCUS`
    headings.style.color = ``;
    startButton.style.fontSize = `100px`
    startButton.textContent = `START`;
    document.body.style.backgroundColor = ``;
    h3.style.display = `none`;
    startButton.style.transform = `translateY(300px)`
    keyBoard.style.display = `none`;
    startButton.style.color = ``;
    startButton.style.backgroundColor = ``;
    startButton.style.border = ``;
    span.forEach(element => {
        element.innerText = ``;
    })
}

const startAnimation = () => {
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
    startButton.style.transform = `translateX(600px)`
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
    if (bool) {
        startAnimation();
    } else {
        homeAnimation();
    }
})
