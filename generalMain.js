import {data, moon, sun} from "./data.js";

const mainDocumentElement = document.documentElement;
const themeIconElement = document.querySelector('.theme-icon');
let theme = 'dark';

themeIconElement.addEventListener('click', ()=>{
    console.log(123)
    if(theme === 'dark'){
        mainDocumentElement.classList.add('my-theme-light');
        mainDocumentElement.classList.remove('my-theme-dark');
        themeIconElement.innerHTML = sun;
        theme = 'light';
    }
    else{
        mainDocumentElement.classList.add('my-theme-dark');
        mainDocumentElement.classList.remove('my-theme-light');
        themeIconElement.innerHTML = moon;
        theme = 'dark';
    }
})

const animatedTextElement = document.querySelectorAll('.animated-text-box');
const h1 = animatedTextElement[0];
h1.style.height = '80px';
const h2 = animatedTextElement[1];
h2.style.height = '40px';
const animation = () =>{
    const text = 'Добро пожаловать на ';
    const name = 'VibeCaps';
    const underText = 'Проверь свою скорость печти';
    for(let i = 0; i < text.length; i++){
        setTimeout(()=>{
            const spanElement = document.createElement('span');
            spanElement.classList.add('animated-text');

            spanElement.textContent = text[i] === ' ' ? '\u00A0' : text[i];
            animatedTextElement[0].appendChild(spanElement);
        }, i*50)
    }
    for(let i = 0; i < name.length; i++){
        setTimeout(()=>{
            const spanElement = document.createElement('span');
            spanElement.classList.add('animated-text');
            spanElement.style.color = '#df7bff';
            spanElement.style.textShadow = '0 0 12px #df7bff';

            spanElement.textContent = name[i] === ' ' ? '\u00A0' : name[i];
            animatedTextElement[0].appendChild(spanElement);
        }, (i+text.length)*50);
    }
    for(let i = 0; i < underText.length; i++){
        setTimeout(()=>{
            const spanElement = document.createElement('span');
            spanElement.classList.add('animated-text');
            spanElement.style.color = '#838383';
            spanElement.style.setProperty('font-size', '30px', 'important');
            spanElement.textContent = underText[i] === ' ' ? '\u00A0' : underText[i];
            animatedTextElement[1].appendChild(spanElement);
        }, (i+text.length+name.length)*50);
    }
}
const item2Element = document.querySelector('.item2');
animation();
setTimeout(()=>{
    const startButtonElement = document.createElement('button');
    startButtonElement.textContent = 'Начать тест';
    startButtonElement.addEventListener('click', ()=>{
        window.location.href = 'general.html';
    })
    startButtonElement.classList.add('start-button', 'start-button--glow');
    item2Element.appendChild(startButtonElement);
}, 2750)