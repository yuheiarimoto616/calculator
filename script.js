function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function modulo(x, y) {
    return x % y;
}

function operate(op, x, y) {
    if (op == '+') {
        return add(x, y);
    } else if (op == '-') {
        return subtract(x, y);
    } else if (op == '×') {
        return multiply(x, y);
    } else if (op == '%') {
        return modulo(x, y);
    } else {
        return divide(x, y);
    }
}

function updateDisplay(e) {
    if (e.target.className == 'digits') {
        if (result != null) {
            userInput.x = 0;
            userInput.operator = null;
            userInput.y = null;
        }

        if (userInput.operator != null) {
            if (userInput.y == null) {
                userInput.y = e.target.textContent;
            } else {
                if (userInput.y == '0' && e.target.id != 'zero') {
                    userInput.y = e.target.textContent;
                } else if (userInput.y != '0') {
                    userInput.y += e.target.textContent;
                }
            }
        } else {
            if (userInput.x == '0' && e.target.id != 'zero') {
                userInput.x = e.target.textContent;
            } else if (userInput.x != '0') {
                userInput.x += e.target.textContent;
            }
        }
    } else if (e.target.className == 'operator') {
        if (userInput.y != null) {
            userInput.x = operate(userInput.operator, Number.parseInt(userInput.x), Number.parseInt(userInput.y));
            userInput.y = null;
        }
        userInput.operator = e.target.textContent;
    }

    result = null;
    let resultDisplay = document.querySelector('.results');
    resultDisplay.innerHTML = '&nbsp;';

    let inputDisplay = document.querySelector('.inputs');
    inputDisplay.textContent = Object.values(userInput).join(" ");
}

function displayResult() {
    if (userInput.y != null) {
        result = operate(userInput.operator, Number.parseInt(userInput.x), Number.parseInt(userInput.y));
        let resultDisplay = document.querySelector('.results');
        resultDisplay.textContent = result;
    }
}

function clearAll() {
    userInput = {
        x: '0',
        operator: null,
        y: null
    };

    result = null;
    let resultDisplay = document.querySelector('.results');
    resultDisplay.innerHTML = '&nbsp;';

    let inputDisplay = document.querySelector('.inputs');
    inputDisplay.textContent = Object.values(userInput).join(" ");
}

function backspace() {
    result = null;
    let resultDisplay = document.querySelector('.results');
    resultDisplay.innerHTML = '&nbsp;';

    if (userInput.y != null) {
        if (userInput.y.length == 1) {
            userInput.y = null;
        } else {
            userInput.y = userInput.y.slice(0, userInput.y.length - 1);
        }
    } else if (userInput.operator != null) {
        userInput.operator = null;
    } else {
        if (userInput.x.length == 1) {
            userInput.x = '0';
        } else {
            userInput.x = userInput.x.slice(0, userInput.x.length - 1);
        }
    }

    let inputDisplay = document.querySelector('.inputs');
    inputDisplay.textContent = Object.values(userInput).join(" ");
}

let userInput = {
    x: '0',
    operator: null,
    y: null
};

let result = null;

let btns = document.querySelectorAll('.digits, .operator');
let equal = document.querySelector('.equal');
let allClear = document.getElementById('ac');
let clear = document.getElementById('c');

btns.forEach(btn => {
    btn.addEventListener('click', updateDisplay);
});

equal.addEventListener('click', displayResult);

allClear.addEventListener('click', clearAll);

clear.addEventListener('click', backspace);

