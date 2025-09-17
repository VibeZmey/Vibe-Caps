// main.js
import { data } from './data.js';
import * as domElements from './domElements.js';
import { updateSentence, restartSentence, currentSentence} from './render.js';
import { setupInputHandlers, mistakes } from './inputHandlers.js';
import { setupCarretHandlers, updateCarret } from './carret.js';
import { setupKeyboardHandlers, keyboardActive, updateKeyboard } from "./keyboard.js";
import { sun, moon } from './data.js';
import * as timer from './timer.js';
import {stopTimer} from "./timer.js";


domElements.inputElement.focus()
domElements.flexContainer.addEventListener('click', ()=> domElements.inputElement.focus());
domElements.flexContainer.appendChild(domElements.carretElement);
domElements.carretElement.classList.add('carret-active');
updateSentence();
keyboardActive();
setupInputHandlers();
setupCarretHandlers();
setupKeyboardHandlers();

domElements.updateButtonElement.addEventListener('click', ()=>{
    updateSentence();
    updateKeyboard();
    domElements.inputElement.readOnly = false;
    domElements.carretElement.classList.add('carret-active');
    domElements.carretElement.classList.remove('carret');
    domElements.testStatsElement.close();
    domElements.inputElement.focus();
})

domElements.restartButtonElement.addEventListener('click', ()=>{
    restartSentence();
    updateKeyboard();
    domElements.inputElement.readOnly = false;
    domElements.carretElement.classList.add('carret-active');
    domElements.carretElement.classList.remove('carret');
    domElements.testStatsElement.close();
    domElements.inputElement.focus();
})


domElements.inputElement.addEventListener('input',()=>{
    if(domElements.inputElement.readOnly){

        domElements.testStatsElement.showModal();

        const accuracy = Math.round(((data[currentSentence].length-mistakes)/data[currentSentence].length)*100);
        animateProgress(domElements.accuracyCircleElement, domElements.accuracyText, accuracy);

        const words = document.querySelectorAll('.word');
        const speed = (words.length/((timer.stopTimer()/1000)/60));
        animateProgress(domElements.speedCircleElement, domElements.speedText, speed);
    }
    if(domElements.inputElement.value.length > 0){
        timer.startTimer();
    }
})

const themeIconElement = document.querySelector('.theme-icon');
let theme = 'dark';
themeIconElement.addEventListener('click', ()=>{
    if(theme === 'dark'){
        domElements.mainDocumentElement.classList.add('my-theme-light');
        domElements.mainDocumentElement.classList.remove('my-theme-dark');
        themeIconElement.innerHTML = sun;
        theme = 'light';
    }
    else{
        domElements.mainDocumentElement.classList.add('my-theme-dark');
        domElements.mainDocumentElement.classList.remove('my-theme-light');
        themeIconElement.innerHTML = moon;
        theme = 'dark';
    }
})

const radius = 44;
const circumference = 2 * Math.PI * radius;
// Вместо прямого установления — плавно анимируем
function animateProgress(svgCircle, text, value, duration = 800) {
    const start = parseFloat(svgCircle.getAttribute('stroke-dashoffset'));
    const end = circumference * (1 - value / 100);

    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * progress;
        svgCircle.style.strokeDashoffset = current;

        text.textContent = `${Math.round((1 - current / circumference) * 100)}%`;

        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

// Использование:
 // Плавно заполнит до 88%
// timer.js

