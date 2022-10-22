// See NOTES.md for more info!


//      **** DOM ELEMENTS ****
const calculator = document.querySelector('.calculator-container');
const screen = document.querySelector('.screen');
const display = document.querySelector('.display');
const wrapperStandard = document.querySelector('.wrapper-standard');
const wrapperScientific = document.querySelector('.wrapper-scientific');
const scientificBtn = document.querySelector('.mode');
const standardBtn = document.querySelector('.mode:nth-child(2)');
const lightBtn = document.querySelector('.mode:nth-child(5)');
const darkBtn = document.querySelector('.mode:nth-child(6)');
const back = document.querySelector('.mode:nth-child(3)');
const forward = document.querySelector('.mode:nth-child(4');
const historyText = document.querySelector('.history');
const resultBtn = document.querySelectorAll('.result')[1];
let beforeCalc = '';



//      **** HANDLER FOR WHEN CLICKING A BUTTON ****
const addBtn = btn => {
    const cursorPosition = display.selectionStart; // to the left increaces
    const displayLength = display.value.length;
    if (cursorPosition < displayLength && !btn.className.includes("bsp") && !btn.className.includes('delete') && !btn.className.includes('result')) { // Adds a value at the place of the cursor (only if the cursor is moved)
        display.value = display.value.substring(0, display.selectionStart) + btn.value + display.value.substring(display.selectionStart);
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
            try {
                beforeCalc = display.value;
                display.value = forEvaly(display.value);
            } catch (error) {
                display.value = 'Error';
                // console.log(error);
            }
        } else if (nameOfClass.includes("delete")) {
            display.value = '';
        } else if (nameOfClass.includes("bsp")) {
            if (cursorPosition < displayLength) {
                // If the cursor is moved delete the char prior to cursor
                display.value = display.value.substring(0, cursorPosition - 1) + display.value.substring(cursorPosition);
            } else { // delete the last char
                display.value = display.value.substring(0, displayLength - 1)
            }
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
            display.value += '%';
        }
    }
}

// Loops for btns of both calculators
for (const btn of wrapperStandard.children) {
    btn.value = btn.innerHTML;
    btn.addEventListener('click', () => addBtn(btn));
}
for (const btn of wrapperScientific.children) {
    btn.value = btn.innerHTML;
    btn.addEventListener('click', () => addBtn(btn));
}

//      **** HISTORY DISPLAY ****
let historyArray = []; // Stores result inputs
historyText.textContent = historyArray[0]; // Initiallizer
let index = historyArray.indexOf(historyText.textContent); // Initiallizer. It is the index of where in the history array the history display value is.

//      **** UPDATES-HISTORY LISTENER/FUNCTION ****
resultBtn.addEventListener('click', () => {
    // Whenever the result btn is clicked a new history text is pushed to the array
    historyArray.push(`${beforeCalc} = ${display.value}`);
    historyText.textContent = historyArray[historyArray.length - 1]; // If arrow btns aren't clicked or a new input is given the history text has the previous value of the current result
    index = historyArray.indexOf(historyText.textContent); // Updates on new input
    if (historyArray.length > 10) { // Stores max 10 inputs
        historyArray.shift();
    }
    // When history text reaches ends of historyArray the history btns are hidden.
    if (index === 0) {
        back.style.visibility = 'hidden';
    } else if (index === historyArray.length) {
        forward.style.visibility = 'hidden';
    } else {
        back.style.visibility = 'visible';
        forward.style.visibility = 'visible';
    }

});

//      **** BACK HISTORY LISTENER/FUNCTION ****
// Upon clicking it the previous history text is shown
back.addEventListener('click', () => {
    // console.log('back is clicked');
    index = historyArray.indexOf(historyText.textContent);
    console.log(index);
    if (index > 0 && index <= historyArray.length - 1) {
        historyText.textContent = historyArray[index - 1];
    }
    if (index === 0) {
        back.style.visibility = 'hidden';
    } else if (index === historyArray.length) {
        forward.style.visibility = 'hidden';
    } else {
        back.style.visibility = 'visible';
        forward.style.visibility = 'visible';
    }
});

//      **** FORWARD HISTORY LISTENER/FUNCTION ****
// Upon clicking it the next history text is shown
forward.addEventListener('click', () => {
    console.log('forward is clicked');
    index = historyArray.indexOf(historyText.textContent);
    console.log(index);
    if (index < historyArray.length - 1 && index >= 0) {
        historyText.textContent = historyArray[index + 1];
    }
    if (index === 0) {
        back.style.visibility = 'hidden';
    } else if (index === historyArray.length) {
        forward.style.visibility = 'hidden';
    } else {
        back.style.visibility = 'visible';
        forward.style.visibility = 'visible';
    }
})


//      **** TOGGLE CALCULATOR ****
const toggle = () => {
    const scientificBtnStyles = window.getComputedStyle(scientificBtn); // gets all the css styles for the specific element
    if (scientificBtnStyles.display === 'none') {
        // standard calculator is visible
        scientificBtn.style.display = 'flex';
        standardBtn.style.display = 'none';
        wrapperStandard.style.display = 'grid';
        wrapperScientific.style.display = 'none';
        screen.style.height = '70px';
        screen.style.display = 'flex';
        screen.style.flexDirection = 'row';
        calculator.style.width = '300px';
        display.maxLength = '10';
        calculator.style.animation = '100ms startle 1 linear';
        historyText.style.display = 'none';
        back.style.display = 'none';
        forward.style.display = 'none';
    } else if (scientificBtnStyles.display === 'flex') {
        standardBtn.style.display = 'flex';
        scientificBtn.style.display = 'none';
        wrapperScientific.style.display = 'grid';
        wrapperStandard.style.display = 'none';
        screen.style.height = '100px';
        calculator.style.width = 'min-content';
        display.maxLength = '25';
        calculator.style.animation = '300ms rotate 1 reverse';
        historyText.style.display = 'flex';
        display.style.height = '50%';
        screen.style.flexDirection = 'column-reverse';
        back.style.display = 'flex';
        forward.style.display = 'flex';
    }
}

//      **** TOGGLE CALCULATOR LISTENERS ****
scientificBtn.addEventListener('click', toggle);
standardBtn.addEventListener('click', toggle);

//      **** TOGGLE DARK-LIGHT MODE ****
const toggleDarkMode = state => {
    const allElements = document.querySelector('body').querySelectorAll('*'); // select all body elements
    switch (state) {
        case 'dark':
            allElements.forEach(element => element.classList.add('dark')); // append dark class to every body > element
            // allElements.forEach(element=>console.log(element.classList)); // check line
            lightBtn.style.display = 'flex';
            darkBtn.style.display = 'none';
            document.querySelector('body').style.backgroundColor = '#130604';
            state = 'light';
            break;
        case 'light':
            allElements.forEach(element => element.classList.remove('dark'));
            // allElements.forEach(element=>console.log(element.classList)); // check line
            lightBtn.style.display = 'none';
            darkBtn.style.display = 'flex';
            document.querySelector('body').style.backgroundColor = 'white';
            state = 'dark';
            break;
        default:
            return;
    }
}

//      **** TOGGLE DARK-LIGHT MODE LISTENERS ****
lightBtn.addEventListener('click', () => { toggleDarkMode('light') });
darkBtn.addEventListener('click', () => { toggleDarkMode('dark') });


//      **** EVALY FUNCTIONS ****

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
    // - Changes unicode chars to strings for evaly in this case the sqrt unicode to the string 'sqrt' 
    // - passes raw value to functions
    // - handles decimals
    let middleValue;
    middleValue = rawDisplayValue.replaceAll('\u221A', 'sqrt');
    middleValue = factorialHandler(middleValue);
    middleValue = percentage(middleValue);
    middleValue = evaly(middleValue).toString();
    if (middleValue.includes('.')) {
        if (middleValue.split('.')[1].length > 5) {
            middleValue = evaly(middleValue).toFixed(5);
            // if decimals are more than 5 limits to 5
        } else {
            middleValue = middleValue;
        }
    } else if (evaly(middleValue).length > 5) {
        middleValue = evaly(middleValue).toFixed(5);
        // if calculated value greater than 5 chars, limits to 5
    }
    let finalDisplayValue = middleValue;
    return finalDisplayValue;
}


//      **** FACTORIAL CALCULATOR ****
function factorial(n) {
    // only round numbers 
    if (n < 0 || Math.round(n) != n) {
        return 'error';
        // the returned value needs to be display.value = 'error'
    } else if (n < 2) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
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
            // console.log(1);
            if ((index > 0) && (arrStr[index - 1] !== '+' && arrStr[index - 1] !== '-' && arrStr[index - 1] !== '*' && arrStr[index - 1] !== '/')) {
                // console.log(2);
                if (arrStr[index - 1] === ')') { // If char prior to ! is ), then the values btw () have to be calculated prior to the !.
                    // console.log(3);
                    closingParenthesisIndex = index - 1; // index = !
                    let i = index - 2;
                    // This while loop will find the index of (
                    while (i >= 0 && !openParenthesisIndex) {
                        if (arrStr[i] === '(') {
                            openParenthesisIndex = i;
                            break;
                        }
                        i--;
                    }
                    // console.log(i);
                    subArray = arrStr.slice(openParenthesisIndex + 1, closingParenthesisIndex); // The elements btw parenthesis. array.slice doesn't slice the closingParenthesisIndex bc it goes up to the previous index
                    // console.log(4);
                    let valueForFactorial = evaly(subArray.join('')); // The calculated value btw () to be calculated its factorial
                    // console.log(valueForFactorial);
                    // console.log(arrStr); // check
                    arrStr.splice(openParenthesisIndex + 1, index - openParenthesisIndex);
                    // Remove the calculated values from the original array plus the !(closingParenthesisIndex + 1) except for one place(openParenthesisIndex + 1) for the factorial value to be. array.splice cuts the values from the first parameter(openParenthesisIndex), and as many as the second parameter
                    arrStr[openParenthesisIndex] = factorial(valueForFactorial); // The calculated factorial value is inserted at the place of the openParenthesisIndex
                    // console.log(arrStr[openParenthesisIndex]);
                } else {
                    let i = index - 1;
                    // The while loop finds how many digits does the number prior to the ! has.
                    while (i >= 0 && (arrStr[i] !== '+' && arrStr[i] !== '-' && arrStr[i] !== '*' && arrStr[i] !== '/')) {
                        i--;
                    }
                    subArray = arrStr.slice(i + 1, index); // the subarray is the digits of the number
                    let valueForFactorial = evaly(subArray.join('')); // converted to a string for evaly calculation
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


//      **** % CALCULATOR ****
// Percent(%) is calculated as the sum of all previous numbers and then the percentage of that sum e.g. 5 + 6% = 5.3, 5 + 5 + 6% = 10.6

const percentage = string => {
    let array = string.split('');
    // console.log(array);
    let percArray = [];
    let from = 0;
    array.forEach(element => {
        // console.log(element);
        if (element === '%') {
            let index = array.indexOf(element, from);
            percArray.push(index);
            // has all indexes of '%'
            from = index + 1;
        }
    });
    // console.log(percArray);
    let oldpercIndex = 0;
    for (let percIndex of percArray) {
        percIndex = percIndex - oldpercIndex; //1
        // console.log(percIndex);
        let subArray = array.slice(0, percIndex);
        let result = percMath(subArray);
        if (!result) {
            display.value = 'If % inside (), calculate the value of () separetly.';
            // console.log('error')
            // return 1;
        } else {
            array.splice(0, percIndex + 1, result);
            oldpercIndex = percIndex;
        }
    }
    return array.join('');
}
const percMath = subArray => {
    // let array = string.split('');
    // let index = array.indexOf('%');
    let i = subArray.length - 1;
    // let number = /[0-9]/g;
    let prior, just, percentage, flag, priorPar;
    while (i >= 0 && !flag) {
        switch (subArray[i]) {
            case '+':
                // console.log(`+ before`);
                prior = evaly(subArray.slice(0, i).join(''));
                // console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                // console.log(`just: ${just}`)
                percentage = prior + prior * just / 100;
                // console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '-':
                // console.log(`- before`);
                prior = evaly(subArray.slice(0, i).join(''));
                // console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                // console.log(`just: ${just}`)
                percentage = prior - prior * just / 100;
                // console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '*':
                // console.log(`* before`);
                prior = evaly(subArray.slice(0, i).join(''));
                // console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                // console.log(`just: ${just}`)
                percentage = prior * just / 100;
                // console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '/':
                // console.log(`/ before`);
                prior = evaly(subArray.slice(0, i).join(''));
                // console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                // console.log(`just: ${just}`)
                percentage = prior / (just / 100);
                // console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '(':
                // console.log(`( before`);
                return undefined;
            case ')':
                // console.log(`() before`);
                return undefined;
        }
        i--;
    }
    if (i === -1) {
        console.log(`No calcs before`);
        console.log(evaly(subArray.join('') / 100));
        return percentage = evaly(subArray.join('') / 100);
    } else {
        console.log(subArray);
        // return array.splice(0, index + 1, percentage).join('');
        return percentage;
    }
}