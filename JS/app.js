// The main functions of the calculator 
function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mult(x, y) {
    return x * y;
}

function divid(x, y) {
    if (y === 0) {
        return `${x} can not divided by 0`;
    }
    return x / y;
}

let number = document.querySelectorAll(".container .keys .numb");

let equation = ['', '', ''];

for (const button of number) {
    button.addEventListener('click', () => {

        if (equation[1] === '') {
            if (equation[0] === '0') {
                equation[0] = '';
            }
            equation[0] += button.textContent;
            updateInputUi(equation[0]);
        } else {
            if (equation[2] === '0') {
                equation[2] = '';
            }
            equation[2] += button.textContent;
            updateInputUi(equation[2]);
        }

    });
}

let dicimal = document.querySelector("#dicimal");

dicimal.addEventListener("click", function () {
    if (equation[1] === '') {
        if (!equation[0].includes(".")) {
            if (equation[0] === '') {
                equation[0] = '0';
            }
            equation[0] += ".";
            updateInputUi(equation[0]);
        }
    } else {
        if (!equation[2].includes(".")) {
            if (equation[2] === '') {
                equation[2] = '0';
            }
            equation[2] += ".";
            updateInputUi(equation[2]);
        }
    }

});

let input = document.querySelector(".container .screen .input");

function updateInputUi(str) {
    input.textContent = str;
}

let del = document.querySelector("#del-op");

del.addEventListener("click", function () {
    if (equation[1] === '') {
        if (equation[0] !== '') {
            equation[0] = equation[0].slice(0, -1);
            updateInputUi(equation[0]);
        }
    } else {
        if (equation[2] !== '') {
            if (equation[2].length === 1) {
                updateInputUi(equation[1]);
                equation[2] = equation[2].slice(0, -1);
            } else {
                equation[2] = equation[2].slice(0, -1);
                updateInputUi(equation[2]);
            }
        } else {
            equation[1] = '';
            updateInputUi(equation[0]);
        }
    }

});

let clear = document.querySelector("#clear-op");

clear.addEventListener("click", function () {
    equation[0] = '0';
    equation[0] = '0';
    updateInputUi('0');
    updateOutputUi('');
});

let operators = document.querySelectorAll(".container .keys .operator");


for (const operator of operators) {
    operator.addEventListener("click", () => {
        let x = parseFloat(equation[0]);
        let y = parseFloat(equation[2]);
        if (operator.textContent === '+') {
            chainCalc(x, y); // for checking if the user keep making operations without clicking '=' button
            equation[1] = '+';
            updateInputUi("+");
        } else if (operator.textContent === '-') {
            chainCalc(x, y);
            equation[1] = '-';
            updateInputUi('-');
        } else if (operator.textContent === '/') {
            chainCalc(x, y);
            equation[1] = '/';
            updateInputUi('/');
        } else {
            chainCalc(x, y);
            equation[1] = 'x';
            updateInputUi('x');
        }
    });
}

let equal = document.querySelector("#eq-op");

equal.addEventListener("click", () => {
    if (equation[1] !== '') {
        let x = parseFloat(equation[0]);
        let y = parseFloat(equation[2]);
        let result = 0;
        if (equation[1] === '+') {
            equation[0] = add(x, y).toString();
            equation[2] = '0';
        } else if (equation[1] === '-') {
            equation[0] = sub(x, y).toString();
            equation[2] = '0';
        } else if (equation[1] === '/') {
            equation[0] = divid(x, y).toString();
            equation[2] = '0';
        } else {
            equation[0] = mult(x, y).toString();
            equation[2] = '0';
        }
        updateOutputUi(equation[0]);
        equation[1] = '';
    } else {
        updateOutputUi(equation[0]);
    }

});

function calc(first, operation, second) {
    switch (operation) {
        case '+':
            return add(first, second);
        case '-':
            return sub(first, second);
        case '/':
            return divid(first, second);
        default:
            return mult(first, second);
    }
}

function chainCalc(x, y) {
    if (equation[1] !== '') {
        equation[0] = calc(x, equation[1], y).toString();
        updateOutputUi(equation[0]);
        equation[1] = '';
        equation[2] = '0';
    }
}

let output = document.querySelector(".output");

function updateOutputUi(str) {
    output.textContent = str;
}