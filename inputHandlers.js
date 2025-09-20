// inputHandlers.js
import {testViewElement, inputElement, mistakeElement,} from './domElements.js';
import {updateCarret} from './carret.js';

export let mistakes = 0;

const correctCheck = (divElement) =>{
    return divElement.querySelectorAll(".letter_correct").length === divElement.querySelectorAll(".letter").length;
}

export const setupInputHandlers = () => {

    inputElement.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' ||
            e.key === 'Delete' ||
            (e.key.toLowerCase() === 'x' && (e.ctrlKey || e.metaKey)) ||
            (e.ctrlKey && (e.key.toLowerCase() === 'v' || e.key.toLowerCase() === 'м')))
        {
            e.preventDefault();
        }
    });

    inputElement.addEventListener('input', (input) => {
        let inputValue = inputElement.value;
        const letters = testViewElement.querySelectorAll('.letter');
        const letter = inputValue.length-1;

        if(letter !== 0){
            if(letters[letter-1].classList.contains('letter_incorrect')){
                if(letters[letter-1].textContent === input.data ||
                    (letters[letter-1].textContent === '\u00A0' && input.data === ' ')){
                    letters[letter-1].classList.remove('letter_incorrect');
                    letters[letter-1].classList.add('letter_correct');
                    inputElement.value = inputElement.value.slice(0, -2) + input.data ;
                    updateCarret();
                }else{
                    inputElement.value = inputElement.value.slice(0, -1);

                }
                return;
            }
        }
        if(letter < letters.length){
            if(letters[letter].textContent === input.data ||
                (letters[letter].textContent === '\u00A0' && input.data === ' ')){
                letters[letter].classList.add('letter_correct');
            }else{
                letters[letter].classList.add('letter_incorrect');
                mistakes++;
                console.log(mistakes);
            }
        }
    });

    inputElement.addEventListener('input', () => {
        const letters = testViewElement.querySelectorAll('.letter');
        if(letters[letters.length - 1].classList.contains('letter_correct')){
            inputElement.readOnly = true;
        }
    });

    inputElement.addEventListener('input', () => {
        const divElements = testViewElement.querySelectorAll('.word');
        const letters = testViewElement.querySelectorAll('.letter');
        if(inputElement.value.length > 1 && inputElement.value.length !== letters.length){
            if(letters[inputElement.value.length-1].getBoundingClientRect().top !== letters[inputElement.value.length-2].getBoundingClientRect().top){
                divElements.forEach((element) => {
                    if(correctCheck(element) === true){
                        element.classList.add('hiddenWord');
                        updateCarret();
                    }
                })
            }
        }
    });
/*
    inputElement.addEventListener('input', () => {
        const letters = flexContainer.querySelectorAll('.letter');
        for(const letter of letters){
            if(letter.classList.contains('letter_incorrect')){
                mistakes++;
            }
        }
    });*/

}