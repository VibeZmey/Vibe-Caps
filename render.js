// render.js
import {updateCarret} from "./carret.js";
import {data} from "./data.js";
import { testViewElement, inputElement, carretElement} from './domElements.js';
export let currentSentence = 0;

export const updateSentence = () => {
    currentSentence = Math.floor(Math.random() * data.length);
    const sentence = data[currentSentence].replaceAll(' ', '\u00A0/').split('/');
    testViewElement.innerHTML = '';
    testViewElement.appendChild(carretElement);
    inputElement.value = '';
    for(let word = 0; word < sentence.length; word++){
        let divElement = document.createElement('div');
        divElement.classList.add('word');
        for(let letter = 0; letter < sentence[word].length; letter++){
            divElement.innerHTML += `<span class="letter">${sentence[word][letter]}</span>`;
        }
        testViewElement.appendChild(divElement);
    }
    updateCarret();
}


export const restartSentence = () => {
    const sentence = data[currentSentence].replaceAll(' ', '\u00A0/').split('/');
    testViewElement.innerHTML = '';
    testViewElement.appendChild(carretElement);
    inputElement.value = '';
    for(let word = 0; word < sentence.length; word++){
        let divElement = document.createElement('div');
        divElement.classList.add('word');
        for(let letter = 0; letter < sentence[word].length; letter++){
            divElement.innerHTML += `<span class="letter">${sentence[word][letter]}</span>`;
        }
        testViewElement.appendChild(divElement);
    }
    updateCarret();

}