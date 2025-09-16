import { flexContainer, inputElement } from './domElements.js';

// Маппинг: введённый символ → CSS-селектор клавиши
const keyMap = {
    // Русские буквы (по латинскому расположению)
    'й': 'key-letter-Q',
    'ц': 'key-letter-W',
    'у': 'key-letter-E',
    'к': 'key-letter-R',
    'е': 'key-letter-T',
    'н': 'key-letter-Y',
    'г': 'key-letter-U',
    'ш': 'key-letter-I',
    'щ': 'key-letter-O',
    'з': 'key-letter-P',
    'х': 'key-letter-BRACKET_LEFT',
    'ъ': 'key-letter-BRACKET_RIGHT',
    'ф': 'key-letter-A',
    'ы': 'key-letter-S',
    'в': 'key-letter-D',
    'а': 'key-letter-F',
    'п': 'key-letter-G',
    'р': 'key-letter-H',
    'о': 'key-letter-J',
    'л': 'key-letter-K',
    'д': 'key-letter-L',
    'ж': 'key-symbol-SEMICOLON',
    'э': 'key-symbol-APOSTROPHE',
    'я': 'key-letter-Z',
    'ч': 'key-letter-X',
    'с': 'key-letter-C',
    'м': 'key-letter-V',
    'и': 'key-letter-B',
    'т': 'key-letter-N',
    'ь': 'key-letter-M',
    'б': 'key-symbol-LESS',
    'ю': 'key-symbol-GREATER',

    // Знаки препинания и символы
    '-': 'key-symbol-MINUS',
    '=': 'key-symbol-EQUALS',
    '\\': 'key-symbol-BACKSLASH',
    '/': 'key-symbol-SLASH',
    ' ': 'key-space',
    '\u0A00': 'key-space',
    ',': 'key-symbol-SLASH',   // если вводится напрямую
    '.': 'key-symbol-SLASH',     // если вводится напрямую
    ';': 'key-symbol-SEMICOLON',
    '\'': 'key-symbol-APOSTROPHE',

    // Спецклавиши (через keydown)
    'Enter': 'key-enter',
    'Backspace': 'key-backspace',
    'Tab': 'key-tab',
    'CapsLock': 'key-caps-lock',
    'Shift': 'key-shift',
    'Control': 'key-ctrl',
    'Alt': 'key-alt',
    'Meta': 'key-win'
};



const hintKeyActive = (symbol) => {
    console.log(symbol);
    const className = keyMap[symbol];
    console.log(className);
    const keyEl = document.querySelector(`.key.${className}`);
    console.log(keyEl);
    keyEl.classList.add('key-hint');
}

export const keyboardActive = () => {
    hintKeyActive(flexContainer.querySelector('.letter').textContent.toLowerCase());
}

export const updateKeyboard = () =>{
    const keyboard = document.querySelector('.keyboard');
    const keys = keyboard.querySelectorAll('.key');
    keys.forEach(key => {
        if(key.classList.contains('key-hint')) {
            key.classList.remove('key-hint');
        }
    })
}

const hintKeyDisable = (symbol) => {
    // Находим класс клавиши
    const className = keyMap[symbol];
    if (!className) return;

    // Находим элемент
    const keyEl = document.querySelector(`.key.${className}`);
    if (!keyEl) return;

    keyEl.classList.remove('key-hint');
}

export const setupKeyboardHandlers = () => {
    inputElement.addEventListener('input', (symbol) => {
        const letters = flexContainer.querySelectorAll('.letter');
        const s = symbol.data.toLowerCase()
        const className = keyMap[s];
        if (!className) return;
        // Находим элемент
        const keyEl = document.querySelector(`.key.${className}`);
        console.log(letters[inputElement.value.length-1].classList.contains("letter_correct"))

        if(inputElement.value.length !== letters.length &&
            letters[inputElement.value.length-1].classList.contains("letter_correct")) {

            if(letters[inputElement.value.length].textContent === '\u00A0')
                hintKeyActive(' ');
            else
                hintKeyActive(letters[inputElement.value.length].textContent.toLowerCase());
        }
        if(keyEl.classList.contains('key-hint') && letters[inputElement.value.length-1].classList.contains("letter_correct")) {

            hintKeyDisable(s);
        }
    });

    // Обработка ввода текста (буквы, цифры, символы)
    inputElement.addEventListener('input', function(e) {
        const char = e.data; // введённый символ
        if (!char) return;
        activateKey(char.toLowerCase()); // игнорируем регистр
    });
}



// Функция подсветки клавиши
function activateKey(symbol) {
    // Находим класс клавиши
    const className = keyMap[symbol];
    if (!className) return;

    // Находим элемент
    const keyEl = document.querySelector(`.key.${className}`);
    if (!keyEl) return;

    // Подсвечиваем
    keyEl.classList.add('active');

    // Убираем подсветку через 200ms
    setTimeout(() => {
        keyEl.classList.remove('active');
    }, 200);
}