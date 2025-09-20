// carret.js
import {inputElement, carretElement, testViewElement} from './domElements.js';

export const updateCarret = () => {
    const letters = testViewElement.querySelectorAll('.letter');
    if(inputElement.value.length === 0){
        const firstLetterRect = letters[0].getBoundingClientRect();
        carretElement.style.left = `${firstLetterRect.left - firstLetterRect.left}px`;
        carretElement.style.top = `${firstLetterRect.top - firstLetterRect.top}px`;
        return;
    }

    const lastLetter = letters[inputElement.value.length-1];
    const lastLetterRect = lastLetter.getBoundingClientRect();
    const flexConteinerRect = testViewElement.getBoundingClientRect();

    carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + lastLetterRect.width}px`;
    carretElement.style.top = `${lastLetterRect.top - flexConteinerRect.top}px`;
}

export const setupCarretHandlers = () => {
    carretElement.classList.add('carret');

    testViewElement.addEventListener('click', ()=> {
        carretElement.classList.add('carret-active');
        carretElement.classList.remove('carret');

    });

    inputElement.addEventListener('blur', ()=> {
        carretElement.classList.add('carret');
        carretElement.classList.remove('carret-active');
    });

    inputElement.addEventListener('input', () => {
        updateCarret();
    });
}