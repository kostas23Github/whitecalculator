// See NOTES.md for more info!

//      **** DOM ELEMENTS ****
const calculator = document.querySelector('.calculator-container');
const screen = document.querySelector('.screen');
const display = document.querySelector('.display');
const wrapperStandard = document.querySelector('.wrapper-standard');
const wrapperScientific = document.querySelector('.wrapper-scientific');
const scientificBtn = document.querySelector('.mode');
const standardBtn = document.querySelector('.mode:nth-child(2)');
const lightBtn = document.querySelector('.mode:nth-child(3)');
const darkBtn = document.querySelector('.mode:nth-child(4)');


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
                display.value = forEvaly(display.value);
            } catch (error) {
                // display.value = 'Error';
                console.log(error);
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
        calculator.style.width = '300px';
        display.maxLength = '10';
        calculator.style.animation = '100ms startle 1 linear';
    } else if (scientificBtnStyles.display === 'flex') {
        standardBtn.style.display = 'flex';
        scientificBtn.style.display = 'none';
        wrapperScientific.style.display = 'grid';
        wrapperStandard.style.display = 'none';
        screen.style.height = '100px';
        calculator.style.width = 'min-content';
        display.maxLength = '25';
        calculator.style.animation = '300ms rotate 1 reverse';
    }
}

//      **** TOGGLE CALCULATOR LISTENERS ****
scientificBtn.addEventListener('click', toggle);
standardBtn.addEventListener('click', toggle);

//      **** TOGGLE DARK-LIGHT MODE ****
const toggleDarkMode = state => {
    const allElements = document.querySelector('body').querySelectorAll('*'); // select all body elements
    switch(state) {
        case 'dark':
            allElements.forEach(element=> element.classList.add('dark')); // append dark class to every body > element
            // allElements.forEach(element=>console.log(element.classList)); // check line
            lightBtn.style.display = 'flex';
            darkBtn.style.display = 'none';
            document.querySelector('body').style.backgroundColor = '#130604';
            state = 'light';
            break;
        case 'light':
            allElements.forEach(element=> element.classList.remove('dark'));
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
lightBtn.addEventListener('click', () => {toggleDarkMode('light')});
darkBtn.addEventListener('click', () => {toggleDarkMode('dark')});


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
    middleValue = percentageHandler(middleValue);
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


//  **** % CALCULATOR ****
// Percent(%) is calculated as the sum of all previous numbers and then the percentage of that sum e.g. 5 + 6% = 5.3, 5 + 5 + 6% = 10.6


const percentageHandler = string => {
    let array = string.split(''); // convert string to array
    // let index = array.indexOf('%'); // the first instance of %
    let percArray = [];
    for (let indexx in array) {
        if (array[indexx] === '%') {
            percArray.push(indexx);
        }
    }
    // Now percArray has all indexes of %
    let indexesToCut = 0;
    percArray.forEach(index => {
        let cutAdjuster = indexesToCut; // with each iteration the array changes and 
        let subArray = array.slice(0, index);
        indexesToCut = subArray.length + 1 - cutAdjuster;
        console.log(`IndexesToCut: ${indexesToCut}`);
        if (subArray[index - 1] === ')') { // check for parenth
            console.log(`( exists`)
            let i = index - 1; // i is index of )
            while (i >= 0 && subArray[i] !== '(') {
                i--; // when while ends i is index of (
            }
            if (i === 0) {
                console.log(`No calculations before (`)
                let numberOfPerc = evaly(subArray.slice(i, index).join(''));
                let perc = evaly(numberOfPerc / 100);
                array.splice(0, indexesToCut, perc);
                return array.join('');
            } else {
                console.log(`calculations before (`)
                let j = i - 1; // j is the index of operator before (
                let calculations = evaly(subArray.slice(0, j).join('')); // calculates up untill the number before (
                let numberOfPerc = evaly(subArray.slice(i, index).join('')); // calculates the inside of parenthesis, which is the number before %
                let perc;
                switch (subArray[j]) {
                    // In first 4 cases calculations exist prior to ( format=(5 @ ()% or 5 @ ()% @ 5)
                    case '+':
                        perc = evaly(calculations + calculations * numberOfPerc / 100);
                        break;
                    case '-':
                        perc = evaly(calculations - calculations * numberOfPerc / 100);
                        break;
                    case '*':
                        perc = evaly(calculations * numberOfPerc / 100);
                        break;
                    case '/':
                        perc = evaly(calculations / numberOfPerc / 100);
                        break;
                    default: // nothing to return if reaches this casse probably an error or typo
                        return 'error';
                }
                array.splice(0, indexesToCut, perc);
                return array.join('');
            }
        } else { // no parenth
            console.log(`no parenthesis before %`)
            let i = index - 1;
            while (i >= 0 && subArray[i] != '+' && subArray[i] != '-' && subArray[i] != '*' && subArray[i] != '/') {
                i--;
            }
            console.log(`i: ${i}`);
            let perc;
            if (i === -1) {
                console.log(`only a number`)
                // only number format=(5% or 5% @ 5)
                perc = evaly(subArray.slice(0, index).join('') / 100);
                array.splice(0, indexesToCut, perc);
            } else {
                console.log('calculations before %')
                console.log(subArray);
                let calculations = evaly(subArray.slice(0, i).join(''));
                console.log(`calculations: ${calculations}`)
                let numberOfPerc = evaly(subArray.slice(i + 1, indexesToCut).join(''));
                console.log(`numberOfPerc: ${numberOfPerc}`)
                switch (subArray[i]) {
                    case '+':
                        perc = evaly(calculations + calculations * numberOfPerc / 100).toFixed(3);
                        console.log(`perc: ${perc}`)
                        break;
                    case '-':
                        perc = evaly(calculations - calculations * numberOfPerc / 100).toFixed(3);
                        break;
                    case '*':
                        perc = evaly(calculations * numberOfPerc / 100).toFixed(3);
                        break;
                    case '/':
                        perc = evaly(calculations / (numberOfPerc / 100)).toFixed(3);
                        break;
                    default:
                        return 'error';

                }
                if (array[indexesToCut] === '%') {
                    array.splice(0, indexesToCut + 1, perc);
                } else {
                    array.splice(0, indexesToCut, perc);
                }
            }
            console.log(`perc: ${perc}`)
            // array.splice(0, indexesToCut, perc); // cuts from the original array the subarray
            console.log(`array: ${array}`)
        }
    })
    return array.join('');
}