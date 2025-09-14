const data ='Город просыпался как всегда с гудком машин Город просыпался как всегда с гудком машин Город просыпался как всегда с гудком машин'.replaceAll(' ', ' /').split('/');
function countChar(str, char) {
    return str.split(char).length - 1;
}

const flexContainer = document.querySelector('.testView');
const inputElement = document.querySelector('.wordsInput');

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

inputElement.addEventListener('input', ()=> {

    let inputValue = inputElement.value;
    const letters = flexContainer.querySelectorAll('.letter');

    for(let letter = 0; letter < inputValue.length; letter++){

        if(letter !== 0){
            if(letters[letter-1].classList.contains('letter_incorrect')){
                inputElement.value = inputElement.value.slice(0, -1)
                break;
            }
        }

        if(letters[letter].textContent !== inputValue[letter]){
            letters[letter].classList.add('letter_incorrect');

        }else{
            letters[letter].classList.add('letter_correct');

        }
    }
    for(let letter = inputValue.length; letter < letters.length; letter++){
        letters[letter].classList.remove('letter_correct');
        letters[letter].classList.remove('letter_incorrect');
    }
});

const carretElement = document.createElement('span');
carretElement.classList.add('carret');
flexContainer.appendChild(carretElement);
addSentence();

inputElement.addEventListener('input', ()=> {
    const letters = flexContainer.querySelectorAll('.letter');
    const lastLetter = letters[inputElement.value.length-1];
    const lastLetterRect = lastLetter.getBoundingClientRect();
    const flexConteinerRect = flexContainer.getBoundingClientRect();

    if(lastLetter.textContent === ' '){
        const preLetter = letters[inputElement.value.length-2];
        const preLetterRect = preLetter.getBoundingClientRect();
        carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + preLetterRect.width+5}px`;
        carretElement.style.top = `${preLetterRect.top - flexConteinerRect.top}px`;
    }else{
        carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + lastLetterRect.width}px`;
        carretElement.style.top = `${lastLetterRect.top - flexConteinerRect.top}px`;
    }
})
