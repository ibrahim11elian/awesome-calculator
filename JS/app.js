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

number.forEach((ele) => {
    ele.addEventListener('click', () => {

        if (equation[1] === '') {
            if (equation[0] === '0') {
                equation[0] = '';
            }
            equation[0] += ele.textContent;
            updateInputUi(equation[0]);
        } else {
            if (equation[2] === '0') {
                equation[2] = '';
            }
            equation[2] += ele.textContent;
            updateInputUi(equation[2]);
        }

    });
});

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
// del is for delete numbers one by one
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
// event listen on operator buttons 
operators.forEach((ele) => {
    ele.addEventListener("click", () => {
        let x = parseFloat(equation[0]);
        let y = parseFloat(equation[2]);
        if (ele.textContent === '+') {
            chainCalc(x, y);
            equation[1] = '+';
            updateInputUi("+");
        } else if (ele.textContent === '-') {
            chainCalc(x, y);
            equation[1] = '-';
            updateInputUi('-');
        } else if (ele.textContent === '/') {
            chainCalc(x, y);
            equation[1] = '/';
            updateInputUi('/');
        } else {
            chainCalc(x, y);
            equation[1] = 'x';
            updateInputUi('x');
        }
    });
});

let equal = document.querySelector("#eq-op");
// event listen on equal button
equal.addEventListener("click", () => {
    if (equation[1] !== '') {
        let x = parseFloat(equation[0]);
        let y = parseFloat(equation[2]);
        let result = 0;
        equation[0] = calc(x, equation[1], y).toString();
        updateOutputUi(equation[0]);
        equation[1] = '';
        equation[2] = '0';
    } else {
        updateOutputUi(equation[0]);
    }

});

// calc function return the equation result 
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

// for checking if the user keep making operations without clicking '=' button
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