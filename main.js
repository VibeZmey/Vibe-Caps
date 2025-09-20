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
import {testViewElement} from "./domElements.js";


domElements.testViewElement.addEventListener('click', ()=> {
    domElements.inputElement.focus();
    domElements.inputElement.readOnly = false;
    domElements.blurTextElement.style.visibility = 'hidden';
    domElements.carretElement.classList.add('carret-active');
    domElements.carretElement.classList.remove('carret');
    domElements.testViewElement.style.filter = 'blur(0px)';
    keyboardActive();
    timer.startTimer();
});

domElements.testViewElement.style.filter = 'blur(5px)';
domElements.blurTextElement.style.visibility = 'visible';
domElements.testStatsElement.close();
domElements.testViewElement.appendChild(domElements.carretElement);
domElements.carretElement.classList.add('carret');
updateSentence();
setupInputHandlers();
setupCarretHandlers();
setupKeyboardHandlers();

domElements.updateButtonElement.addEventListener('click', ()=>{
    updateSentence();
    updateKeyboard();
    domElements.testViewElement.style.filter = 'blur(5px)';
    domElements.blurTextElement.style.visibility = 'visible';
    domElements.testStatsElement.close();
})

domElements.restartButtonElement.addEventListener('click', ()=>{
    restartSentence();
    updateKeyboard();
    domElements.testViewElement.style.filter = 'blur(5px)';
    domElements.blurTextElement.style.visibility = 'visible';
    domElements.testStatsElement.close();
})

domElements.inputElement.addEventListener('input',()=>{
    if(domElements.inputElement.readOnly){

        domElements.testStatsElement.showModal();

        const accuracy = Math.round(((data[currentSentence].length-mistakes)/data[currentSentence].length)*100);
        animateAccuracyProgress(domElements.accuracyCircleElement, domElements.accuracyText, accuracy);

        const words = document.querySelectorAll('.word');
        const speed = Math.round(words.length/((timer.stopTimer()/1000)/60));
        console.log(speed);
        animateSpeedProgress(domElements.speedCircleElement, domElements.speedText, speed);
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
function animateAccuracyProgress(svgCircle, text, value, duration = 800) {
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
function animateSpeedProgress(svgCircle, text, value, duration = 800) {
    const start = parseFloat(svgCircle.getAttribute('stroke-dashoffset'));
    const end = circumference * (1 - value / 200); // ← Максимум 200

    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const current = start + (end - start) * progress;
        svgCircle.style.strokeDashoffset = current;

        console.log('Текущий value для текста:', value); // 👈 И ЭТО!
        text.textContent = `${Math.round(value)}`;

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Использование:
 // Плавно заполнит до 88%
// timer.js

