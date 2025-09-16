// main.js
import { data } from './data.js';
import { flexContainer, carretElement, inputElement, updateButtonElement} from './domElements.js';
import { updateSentence } from './render.js';
import { setupInputHandlers } from './inputHandlers.js';
import { setupCarretHandlers, updateCarret } from './carret.js';
import { setTimer } from './timer.js';
import { setupKeyboardHandlers, keyboardActive, updateKeyboard } from "./keyboard.js";

inputElement.focus()
flexContainer.addEventListener('click', ()=> inputElement.focus());
flexContainer.appendChild(carretElement);

updateSentence();
keyboardActive();

setupInputHandlers();
setupCarretHandlers();
setupKeyboardHandlers();
setTimer();

updateButtonElement.addEventListener('click', ()=>{
    updateSentence();
    updateKeyboard();
    inputElement.readOnly = false;
    inputElement.focus()
    carretElement.classList.add('carret-active');
    carretElement.classList.remove('carret');
})
const update = () =>{

}