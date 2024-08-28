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
addEventListener('keyup', (e) => {
    const keyWord = e.key;
    dUp.style.transform = ``;
    dRight.style.transform = ``;
    dDown.style.transform = ``;
    dLeft.style.transform = ``;
    dUp.style.boxShadow = ``;
    dRight.style.boxShadow = ``;
    dDown.style.boxShadow = ``;
    dLeft.style.boxShadow = ``;
})
// Random KeyGenerator :
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
        console.log(i)
    }
    arr.forEach(item => {
        const span = document.createElement('span');
        h3.appendChild(span);
        span.innerHTML = item;
        if (Math.random() <= .5) {
            span.style.color = 'green';
        } else {
            span.style.color = 'red';
        }
    })
}
h3.style.textAlign = `center`
newSequence();

