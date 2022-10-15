const screen = document.querySelector('.screen');
const display = document.querySelector('.display');
const wrapperStandard = document.querySelector('.wrapper-standard');
const wrapperScientific = document.querySelector('.wrapper-scientific');

// display.addEventListener('click', () => {
//     alert(display.selectionEnd)
//     console.log(display.value.length)
// })

//      **** HANDLER FOR WHEN CLICKING A BTN ****
const addBtn = btn => {
    const cursorPosition = display.selectionStart; // to the left increaces
    const displayLength = display.value.length;
    if (cursorPosition < displayLength) {
        display.value = display.value.toString().substring(0, display.selectionStart) + btn.value + display.value.toString().substring(display.selectionStart);
    } else {
        let nameOfClass = btn.className;
        if (nameOfClass.includes("number")) {
            display.value += btn.value;
        } else if (nameOfClass.includes("primary")) {
            if (nameOfClass.includes('x')) {
                display.value += "*";
            } else {
                display.value += btn.value;
            }
        } else if (nameOfClass.includes("result")) {
            display.value = evaly(forEvaly(display.value)).toFixed(2);
            display.value = factorialHandler(display.value);
            display.value = evaly(display.value);
        } else if (nameOfClass.includes("delete")) {
            display.value = '';
        } else if (nameOfClass.includes("bsp")) {
            display.value = display.value.toString().substring(0, display.value.toString().length - 1)
        } else if (nameOfClass.includes('pi')) {
            display.value += Math.PI.toFixed(2);
        } else if (nameOfClass.includes('x2')) {
            display.value += '**2';
        } else if (nameOfClass.includes('xy')) {
            display.value += '**';
        } else if (nameOfClass.includes('sqrt')) {
            // unicode for the sqrt symbol
            display.value += '\u221A(';
        } else if (nameOfClass.includes('log')) {
            display.value += 'log(';
        } else if (nameOfClass.includes('sin')) {
            display.value += 'sin(';
        } else if (nameOfClass.includes('cos')) {
            display.value += 'cos(';
        } else if (nameOfClass.includes('tan')) {
            display.value += 'tan(';
        } else if (nameOfClass.includes('x!')) {
            display.value += '\u0021';
        } else if (nameOfClass.includes("1/x")) {
            display.value += '1/';
        } else if (nameOfClass.includes("10x")) {
            display.value += '10**';
        } else if (nameOfClass.includes("ln")) {
            display.value += 'ln(';
        } else if (nameOfClass.includes("e")) {
            display.value += 'e';
        } else if (nameOfClass.includes('%')) {
            display.value = display.value / 100 + '%';
        }
    }
}

//      **** GEM ****
const evaly = equation => {
    let result = Function(`return ` + equation)();
    return result;
}

//      **** EVALY HELPERS ****
const sin = x => Math.sin(x);
const cos = x => Math.cos(x);
const tan = x => Math.tan(x);
const log = x => Math.log10(x);
const ln = x => Math.log(x);
const e = Math.E;
const sqrt = x => Math.sqrt(x);
const forEvaly = rawDisplayValue => {
    // Changes unicode chars to strings for evaly in this case the sqrt unicode to the string 'sqrt'
    let middleDisplayValue;
    middleDisplayValue = rawDisplayValue.replaceAll('\u221A', 'sqrt');
    let finalDisplayValue = middleDisplayValue;
    return finalDisplayValue;
}



// tests for factorial
// let strf = '*!'; // check
// let strf = '2*(2*4)!'; // check
let strf = '3! + 3!'; // check
// let strf = '(4.5*2)! +3+ (4.5*2)!'; // check 


//      **** FACTORIAL CALCULATOR ****
function factorial(n) {
    // only round numbers 
    if (n < 0 || Math.round(n) != n)
        return 'error';
    // the returned value needs to be display.value = 'error'
    if (n < 2)
        return 1;
    return n * factorial(n - 1);
}

function factorialHandler(string) {
    let arrStr = string.split(''); // Convert to array
    let openParenthesisIndex;
    let closingParenthesisIndex;
    let subArray;
    let newString;
    let index;
    for (index in arrStr) { // Iterate the array to find every !
        if (arrStr[index] === '!') { // Check for !
            // This if is an edge case e.g. string = ! || string = 3*!, throws error
            if ((index > 0) && (arrStr[index - 1] !== '+' && arrStr[index - 1] !== '-' && arrStr[index - 1] !== '*' && arrStr[index - 1] !== '/')) {
                if (arrStr[index - 1] === ')') { // If char prior to ! is ), then the values btw () have to be calculated prior to the !.
                    closingParenthesisIndex = index - 1; // index = !
                    let i = index - 2;
                    // This while loop will find the index of (
                    while (i >= 0 && !openParenthesisIndex) {
                        if (arrStr[i] === '(') {
                            openParenthesisIndex = i;
                        }
                        i--;
                    }
                    subArray = arrStr.slice(openParenthesisIndex + 1, closingParenthesisIndex); // The elements btw parenthesis. array.slice doesn't slices the closingParenthesisIndex bc it goes up to the previous index
                    let valueForFactorial = evaly(subArray.join('')); // The calculated value btw () to be calculated its factorial
                    arrStr.splice(openParenthesisIndex + 1, closingParenthesisIndex + 1 - openParenthesisIndex); // Remove the calculated values from the original array plus the !(closingParenthesisIndex + 1) except for one place(openParenthesisIndex + 1) for the factorial value to be. array.splice cuts the values from the first parameter(openParenthesisIndex), and as many as the second parameter
                    arrStr[openParenthesisIndex] = factorial(valueForFactorial); // The calculated factorial value is inserted at the place of the openParenthesisIndex
                } else {
                    let i = index - 1;
                    // The while loop finds how many digits does the number prior ot the ! has.
                    while (i >= 0 && (arrStr[i] !== '+' && arrStr[i] !== '-' && arrStr[i] !== '*' && arrStr[i] !== '/')) {
                        i--;
                    }
                    subArray = arrStr.slice(i + 1, index); // the subarray is the digits of the number
                    let valueForFactorial = subArray.join(''); // converted to a string for evaly calculation
                    arrStr.splice(i + 2, index - i - 1); // The places of the digits of the number are cut and in its first digit place the calculated factorial value is placed.
                    arrStr[i + 1] = factorial(valueForFactorial);
                }
            } else {
                return 'error';
            }
        }
    }
    newString = arrStr.join('').toString(); // Convert array to string
    return newString;
}


//tests
// let strp = '10%';
// let strp = '1+10%';
// let strp = '1 + (10 - 5)%';


//      **** % CALCULATOR ****
// ['5', '+', '1', '0', '+', '1', '0', '0', '+', '1', '0', '%']
// const percentageHandler = string => {
//     let arrStr = string.split('');
//     let closingParenthesisIndex;
//     let openParenthesisIndex;
//     let subArray;
//     let priorValue;
//     let percentOfPrior;
//     let finalValue;
//     for (index in arrStr) {
//         if (arrStr[index] === '%') {
//             let i = index - 1;
//             if (arrStr[i] === ')') {
//                 // handles the 5 +- (5+6)% format
//                 closingParenthesisIndex = i;
//                 let newIndex = index - 2;
//                 while (newIndex >= 0) {
//                     if (newIndex === '(') {
//                         openParenthesisIndex = newIndex;
//                         break;
//                     }
//                     newIndex--;
//                 }
//                 subArray = arrStr.slice(openParenthesisIndex + 1, closingParenthesisIndex);
//                 percentOfPrior = evaly(subArray.join(''));
//                 // percentOfPrior in this case is the calculated value inside the parenthesis prior to the % symbol
//                 arrStr.splice(openParenthesisIndex + 1, closingParenthesisIndex + 1);
//                 arrStr[openParenthesisIndex] = percentOfPrior;
//                 i = openParenthesisIndex - 1;
//                 // now i have the value of the parenthesis and the index of the char before the openParenthesisIndex
//                 switch (arrStr[i]) {
//                     case '+':
//                         priorValue = evaly(arrStr.slice(0, i).join(''));
//                         finalValue = priorValue + percentOfPrior * priorValue / 100;
//                     case '-':
//                         priorValue = evaly(arrStr.slice(0, i).join(''));
//                         finalValue = priorValue - percentOfPrior * priorValue / 100;
//                 }
//             } else {
//                 // handles the 5 +- 5% format
//                 while ((arrStr[i] !== '+' || arrStr[i] !== '-') && i >= 0) {
//                     i--;
//                 }
//                 switch (arrStr[i]) {
//                     case '+':
//                         priorValue = evaly(arrStr.slice(0, i).join(''));
//                         percentOfPrior = evaly(arrStr.slice(i + 1, index - 1).join(''));
//                         finalValue = priorValue + percentOfPrior * priorValue / 100;
//                     case '-':
//                         priorValue = evaly(arrStr.slice(0, i).join(''));
//                         percentOfPrior = evaly(arrStr.slice(i + 1, index - 1).join(''));
//                         finalValue = priorValue - percentOfPrior * priorValue / 100;
//                     default:
//                         finalValue = string/100;
//                 }
//             }
//         }
//     }
// }

// console.log(percentageHandler(str));

// Loop for btns of both calculators
for (const btn of wrapperStandard.children && wrapperScientific.children) {
    btn.value = btn.innerHTML;
    btn.addEventListener('click', () => addBtn(btn));
}


//          ****NOTES****
//
//          *UNICODE CHARS/LOGIC*
// For js compatible unicode characters the format is:
// '\uxxxx' where x are chars from the UTC-16
// The format that they are found on the interent is:
// U+xxxx
// so i have to modify them in the above format.
// Unicodes used in this project:
// sqrt -> '\u221A'
// exclamation mark -> '\u0021'


//        *selectionStart/selectionEnd logic*
// In this project they indicate in the input element where the cursor(focus) is. The value returned starts from 0 at the most left of the display.value and its greatest value is the rightest char or the last char typed. In short they count as we write. In this project is to show if the user has clicked somewhere in the display screen. It concludes that because the selectionStart/selectionEnd is always at the greatest possible value since the user can type by default only at the rightest position. So if the selectionStart/selectionEnd has a value lower than the length of chars of the display.value, the user has moved the place he/she types.
// selectionStart/selectionEnd have always the same value since the user hasn't select anything, only the position of the cursor has changed.


//          *evaly() logic*
// This function is a safer version of the eval() see -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval. I gave the name evaly. Both functions can compute the value given even if it is a string.
// e.g. evaly/eval(2+2); Logs 4
//      evaly/eval('2+2'); Logs 4 also
// They can also compute math functions
//      evaly/eval('2*Math.sin(0)'); Logs 0


//         *renaming trigonometry functions*
//  I renamed them so that upon clicking the sin button "sin(" is added to the evaly func and to the display screen of the calculator. Then when = is clicked the evaly 'unstrings' the string display.value and sin calls Math.sin(). Evaly cannot compute straight away sin and the user cannot see Math.sin in their screen.
//
//