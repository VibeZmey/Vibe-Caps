const data ='Солнце встает над горизонтом и заливает небо теплым светом птицы поют в ветвях деревьев дети бегут по росе травы шелестят на ветру река тихо течет мимо берегов люди просыпаются и начинают свой день кофе пахнет уютом хлеб свежий на столе улыбки дарят тепло взгляды говорят без слов время течет медленно но уверенно каждый момент важен каждый шаг имеет значение жизнь прекрасна даже в мелочах стоит остановиться вдохнуть и просто быть'.replaceAll(' ', '\u00A0/').split('/');
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
const letters = flexContainer.querySelectorAll('.letter');

inputElement.addEventListener('input', ()=> {

    let inputValue = inputElement.value;
    const letters = flexContainer.querySelectorAll('.letter');

    for(let letter = 0; letter < inputValue.length; letter++){

        if(letter !== 0){
            if(letters[letter-1].classList.contains('letter_incorrect')){
                inputElement.value = inputElement.value.slice(0, -1);
                break;
            }
        }

        if(letters[letter].textContent === inputValue[letter] || (letters[letter].textContent === '\u00A0' && inputValue[letter] === ' ')){
            letters[letter].classList.add('letter_correct');
        }else{
            letters[letter].classList.add('letter_incorrect');
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

const wrapperElement = document.querySelector('.inputWrapper');
inputElement.addEventListener('input', ()=> {
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
    console.log(`${lastLetterRect.left} ${flexConteinerRect.left} ${lastLetterRect.width}`);

    if(lastLetter.textContent === '\u00A0'){
        const spanSpace = document.createElement('span');
        spanSpace.textContent = ' ';
        spanSpace.classList.add('letter');

        const spaceRect = spanSpace.getBoundingClientRect();
        console.log(spanSpace.getBoundingClientRect().width);
        carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + lastLetterRect.width}px`;
        carretElement.style.top = `${lastLetterRect.top - flexConteinerRect.top}px`;
    }else if(lastLetter.textContent !== '\u00A0'){

        carretElement.style.left = `${lastLetterRect.left - flexConteinerRect.left + lastLetterRect.width}px`;
        carretElement.style.top = `${lastLetterRect.top - flexConteinerRect.top}px`;
    }
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

