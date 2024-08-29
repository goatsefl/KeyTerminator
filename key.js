// Button Animation Logic :

const buttons = document.querySelectorAll('.btns');
const dUp = document.querySelector('#up')
const dLeft = document.querySelector('#left')
const dRight = document.querySelector("#right")
const dDown = document.querySelector("#down")

// KeyPress Event :

addEventListener('keydown', (e) => {
    const direction = e.key;
    if (direction[5] == 'U') {
        dUp.style.transform = `scale(.95) translateY(-3px)`;
        dUp.style.boxShadow = `0px 0px 10px 5px black inset`;
    }
    if (direction[5] == 'D') {
        dDown.style.transform = `scale(.95) `;
        dDown.style.boxShadow = `0px 0px 10px 5px black inset`;
    }
    if (direction[5] == 'L') {
        dLeft.style.transform = `scale(.95) translateX(20px)`;
        dLeft.style.boxShadow = `0px 0px 10px 5px black inset`;
    }
    if (direction[5] == 'R') {
        dRight.style.transform = `scale(.95) translateX(-20px)`;
        dRight.style.boxShadow = `0px 0px 10px 5px black inset`;
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
        item.style.textShadow = `1px 1px 1px brown,-1px 1px 1px brown,1px -1px 1px brown,-1px -1px 1px brown`
        if (Math.random() <= Math.random()) {
            item.style.color = 'green';
        } else {
            item.style.color = 'red';
        } i++;
    })
}
newSequence();
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
    console.log(currentSpan.innerHTML);
    if (keyPress === `ArrowUp` && currentSpan.innerHTML === `↑` && currentSpan.style.color === `green`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowDown` && currentSpan.innerHTML === `↑` && currentSpan.style.color === `red`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowUp` && currentSpan.innerHTML === `↓` && currentSpan.style.color === `red`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowDown` && currentSpan.innerHTML === `↓` && currentSpan.style.color === `green`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowLeft` && currentSpan.innerHTML === `→` && currentSpan.style.color === `red`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowLeft` && currentSpan.innerHTML === `←` && currentSpan.style.color === `green`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowRight` && currentSpan.innerHTML === `→` && currentSpan.style.color === `green`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    else if (keyPress === `ArrowRight` && currentSpan.innerHTML === `←` && currentSpan.style.color === `red`) {
        currentSpan.style.color = `gray`;
        currentSpan.style.fontSize = `70px`;
        currentSpan.style.transition = `0.3s ease all`;
        index++;
    }
    if (index >= spanCount) {
        index = 0;
        span.forEach(element => {
            element.style.fontSize = `80px`;
        })
        newSequence();
    }
})
