let buffer = '0';
let runningTotal = 0;
let previousOperator;
const screen = document.querySelector('.screen');
//this function will either handle the math or number depending on its use
function buttonClick(value) {
    //if value isNotANumber then return symbol else return number in console
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        HandleNumbers(value);
    }
    //rerender() is called here because buttonCLick serves as a way to interact with the calculator
    rerender();
}

function HandleMath(value) {
    if (buffer === '0') {
        //do nothing this is to prevent dividing and multiplying and subtracting with 0
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    // basically what this does is that when you click a number/numbers when you hit a symbol, it will save the previous number and refresh the number to 0 for the next number to add/subtract...etc
    previousOperator = value;
    buffer = '0';
    console.log(runningTotal);
}

function flushOperation(intBuffer) {
    if (previousOperator === "+") {
        runningTotal += intBuffer;
    } else if (previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if (previousOperator === "x") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;
    }
}

function HandleNumbers(number) {
    console.log('number');
    // if buffer is still 0 when selected, assign it to number
    if (buffer === '0') {
        buffer = number;
        //if buffer is anything but 0 add the selected number to the current number
    } else {
        buffer += number;
    }
    //test code to see if it works in the console on chrome
    console.log(buffer);
}

function handleSymbol(symbol) {
    console.log('symbol');
    switch (symbol) {
        //context: switch statements work like if statements, their syntaxes are slightly different and is a bit more advanced but logically speaking, its the same concept
        case 'C':
            buffer = '0';
            runningTotal - 0;
            break;
        case "=":
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = +runningTotal;
            runningTotal = 0;
            break;
            //the point of back arrow is to remove the most recent number within the calculator so if its 98 back arrow will change it to 9
        case '←':
            console.log('back arrow');
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                //basically we are going to take off this string and we are going to cut off the last number
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "x":
        case "÷":
            HandleMath(symbol);
            break;
    }
}

function init() {
    document
    //querySelector is going to find calc buttons
    //and for every button clicked it will run a function called button click
        .querySelector('.calc-buttons')
        .addEventListener("click", function(event) {
            buttonClick(event.target.innerText);
        })
}
//anytime a button is pressed the screen object on the top of the calculator will update to the new data
function rerender() {
    screen.innerText = buffer;
}
init();