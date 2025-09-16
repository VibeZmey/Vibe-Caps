const data ='Солнце, встает, над'.replaceAll(' ', '\u00A0/').split('/');
function countChar(str, char) {
    return str.split(char).length - 1;
}

const flexContainer = document.querySelector('.testView');
const inputElement = document.querySelector('.wordsInput');
inputElement.focus();

const addSentence = () =>{

    let html = '';
    for(let word = 0; word < data.length; word++){
        let divHtml = '';
        let divElement = document.createElement('div');
        divElement.classList.add('word');
        for(let letter = 0; letter < data[word].length; letter++){
            divElement.innerHTML += `<span class="letter">${data[word][letter]}</span>`;
        }
        flexContainer.appendChild(divElement);
    }
}

flexContainer.addEventListener('click', ()=> inputElement.focus())

inputElement.addEventListener('input', () => {
    const letters = flexContainer.querySelectorAll('.letter');
    setTimeout(()=>{
        if(letters[letters.length - 1].classList.contains('letter_correct')){
            inputElement.readOnly = true;
        }
    }, 0)

});

inputElement.addEventListener('input', (input)=> {

    let inputValue = inputElement.value;
    const letters = flexContainer.querySelectorAll('.letter');
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
                console.log(inputElement.value, 2);
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
        }
    }

});

const carretElement = document.createElement('span');
flexContainer.appendChild(carretElement);

inputElement.addEventListener('click', ()=> {
    carretElement.classList.add('carret');
    carretElement.classList.remove('carret-active');
})

inputElement.addEventListener('blur', ()=> {
    carretElement.classList.remove('carret');
    carretElement.classList.add('carret-active');
})
addSentence();

const updateCarret = () =>{
    const letters = flexContainer.querySelectorAll('.letter');

    if(inputElement.value.length === 0){
        const firstLetterRect = letters[0].getBoundingClientRect();
        carretElement.style.left = `${firstLetterRect.left - firstLetterRect.left}px`;
        carretElement.style.top = `${firstLetterRect.top - firstLetterRect.top}px`;
        return;
    }

    const lastLetter = letters[inputElement.value.length-1];
    const lastLetterRect = lastLetter.getBoundingClientRect();
    const flexConteinerRect = flexContainer.getBoundingClientRect();

    carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + lastLetterRect.width}px`;
    carretElement.style.top = `${lastLetterRect.top - flexConteinerRect.top}px`;
}
const wrapperElement = document.querySelector('.inputWrapper');
inputElement.addEventListener('input', ()=> {
    updateCarret();
})

const timer = () => {
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

const setTimer = () =>{
    inputElement.addEventListener('input', function e(){
        if(document.activeElement === inputElement){
            timer();
            inputElement.removeEventListener('input', e);
        }
    })
}

const mistakeElement = document.getElementById('mistake');
let mistakes = 0;

inputElement.addEventListener('input', ()=> {
    const letters = flexContainer.querySelectorAll('.letter');
    for(const letter of letters){
        if(letter.classList.contains('letter_incorrect')){
            mistakes++;
            mistakeElement.textContent = mistakes;
        }
    }
})

const correctCheck = (divElement) =>{
    return divElement.querySelectorAll(".letter_correct").length === divElement.querySelectorAll(".letter").length;
}

const hiddenElements = [];

inputElement.addEventListener('input', ()=> {
    const divElements = flexContainer.querySelectorAll('.word');
    const letters = flexContainer.querySelectorAll('.letter');
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
})

inputElement.addEventListener('input', ()=> {
    const input = inputElement.value;
})

inputElement.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' ||
        e.key === 'Delete' ||
        (e.key.toLowerCase() === 'x' && (e.ctrlKey || e.metaKey)) ||
        (e.ctrlKey && (e.key.toLowerCase() === 'v' || e.key.toLowerCase() === 'м')))
    {
        e.preventDefault();
    }
});





