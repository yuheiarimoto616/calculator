let userInput = {
    x: '0',
    operator: null,
    y: null
};

let result;


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

function operate(op, x, y) {
    if (op == '+') {
        return add(x, y);
    } else if (op == '-') {
        return subtract(x, y);
    } else if (op == '×') {
        return multiply(x, y);
    } else {
        return divide(x, y);
    }
}

function updateDisplay(e) {
    if (e.target.className == 'digits') {
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
    

    let inputDisplay = document.querySelector('.inputs');
    inputDisplay.textContent = Object.values(userInput).join(" ");
}

let btns = document.querySelectorAll('.digits, .operator');

btns.forEach(btn => {
    btn.addEventListener('click', updateDisplay);
});