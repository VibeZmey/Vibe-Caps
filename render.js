// render.js
import {updateCarret} from "./carret.js";
import {data} from "./data.js";
import { flexContainer, inputElement, carretElement} from './domElements.js';

export const updateSentence = () => {
    const sentence = data[Math.floor(Math.random() * data.length)].replaceAll(' ', '\u00A0/').split('/');
    flexContainer.innerHTML = '';
    flexContainer.appendChild(carretElement);
    inputElement.value = '';
    for(let word = 0; word < sentence.length; word++){
        let divElement = document.createElement('div');
        divElement.classList.add('word');
        for(let letter = 0; letter < sentence[word].length; letter++){
            divElement.innerHTML += `<span class="letter">${sentence[word][letter]}</span>`;
        }
        flexContainer.appendChild(divElement);
    }
    updateCarret();

}