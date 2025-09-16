// timer.js
import { flexContainer, inputElement } from './domElements.js';

export const timer = () => {
    const now = new Date().getTime();
    let curTime = 0;
    const timerId = setInterval(() => {
        curTime = new Date().getTime();
        const letters = flexContainer.querySelectorAll('.letter');
        if(letters.length !== 0){
            if (letters[letters.length - 1].classList.contains('letter_correct')) {
                console.log(curTime-now);
                clearInterval(timerId);
            }
        }
    }, 1000)
}

export const setTimer = () => {
    inputElement.addEventListener('input', function e(){
        if(document.activeElement === inputElement){
            timer();
            inputElement.removeEventListener('input', e);
        }
    })
}