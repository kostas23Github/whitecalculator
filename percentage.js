// tests
// 5%   5 @ 5%  5% @ 5

// const evaly = equation => {
//     let result = Function(`return ` + equation)();
//     return result;
// }

// 3RD TRY
const percentage = string => {
    let array = string.split('');
    console.log(array);
    let percArray = [];
    let from = 0;
    array.forEach(element => {
        console.log(element);
        if (element === '%') {
            let index = array.indexOf(element, from);
            percArray.push(index);
            // has all indexes of '%'
            from = index + 1;
        }
    });
    // 1, 4, 7
    console.log(percArray);
    let oldpercIndex = 0;
    for (let percIndex of percArray) {
        percIndex = percIndex - oldpercIndex; //1
        console.log(percIndex);
        let subArray = array.slice(0, percIndex);
        let result = percMath(subArray);
        if (!result) {
            // display.value = 'Perhaps type less complicated.';
            console.log('error')
            return 1;
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
                console.log(`+ before`);
                prior = evaly(subArray.slice(0, i).join(''));
                console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                console.log(`just: ${just}`)
                percentage = prior + prior * just / 100;
                console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '-':
                console.log(`- before`);
                prior = evaly(subArray.slice(0, i).join(''));
                console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                console.log(`just: ${just}`)
                percentage = prior - prior * just / 100;
                console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '*':
                console.log(`* before`);
                prior = evaly(subArray.slice(0, i).join(''));
                console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                console.log(`just: ${just}`)
                percentage = prior * just / 100;
                console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '/':
                console.log(`/ before`);
                prior = evaly(subArray.slice(0, i).join(''));
                console.log(`prior: ${prior}`)
                just = evaly(subArray.slice(i + 1).join(''));
                console.log(`just: ${just}`)
                percentage = prior / (just / 100);
                console.log(`percentage: ${percentage}`)
                flag = i;
                break;
            case '(':
                console.log(`( before`);
                // display.value = 'If % inside (), calculate the value of () separetly.';
                return undefined;
            case ')':
                console.log(`() before`);
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

// 2ND TRY
const percentageHandler = string => {
    let array = string.split(''); // convert string to array
    // let index = array.indexOf('%'); // the first instance of %
    let percArray = [];
    for (let indexx in array) {
        if (array[indexx] === '%') {
            percArray.push(indexx);
        }
    }
    console.log(`% indexes: ${percArray}`);
    // Now percArray has all indexes of %
    // let indexesToCut = 0;
    percArray.forEach(index => {
        // typeof index === string
        // let cutAdjuster = indexesToCut; // with each iteration the array changes, this adjust the 
        console.log(`index: ${index}`)
        let subArray = array.slice(0, index);
        console.log(`subArray: ${subArray}`);
        let indexesToCutSubArray = subArray.length + 1;
        let indexesToCutArray = Number(index) + 1;
        console.log(`IndexesToCutArray: ${indexesToCutArray}`);
        console.log(`IndexesToCutSubArray: ${indexesToCutSubArray}`);
        if (subArray[index - 1] === ')') { // check for parenth
            console.log(`( exists`)
            let i = index - 1; // i is index of )
            while (i >= 0 && subArray[i] !== '(') {
                i--; // when while ends i is index of (
            }
            if (i === 0) {
                console.log(`No calculations before (`)
                let numberOfPerc = evaly(subArray.slice(i, index).join(''));
                console.log(`numberOfPerc: ${numberOfPerc}`);
                let perc = evaly(numberOfPerc / 100);
                array.splice(0, indexesToCutArray, perc);
                array.join('');
                console.log(`array: ${array}`);
            } else {
                console.log(`calculations before (`)
                let j = i - 1; // j is the index of operator before (
                let calculations = evaly(subArray.slice(0, j).join('')); // calculates up untill the number before (
                console.log(`calculations: ${calculations}`);
                let numberOfPerc = evaly(subArray.slice(i, index).join('')); // calculates the inside of parenthesis, which is the number before %
                console.log(`numberOfPerc: ${numberOfPerc}`);
                let perc;
                switch (subArray[j]) {
                    // In first 4 cases calculations exist prior to ( format=(5 @ ()% or 5 @ ()% @ 5)
                    case '+':
                        perc = evaly(calculations + calculations * numberOfPerc / 100);
                        console.log(`perc: ${perc}`);
                        break;
                    case '-':
                        perc = evaly(calculations - calculations * numberOfPerc / 100);
                        console.log(`perc: ${perc}`);
                        break;
                    case '*':
                        perc = evaly(calculations * numberOfPerc / 100);
                        console.log(`perc: ${perc}`);
                        break;
                    case '/':
                        perc = evaly(calculations / numberOfPerc / 100);
                        console.log(`perc: ${perc}`);
                        break;
                    default: // nothing to return if reaches this casse probably an error or typo
                        return 'error';
                }
                array.splice(0, indexesToCutArray, perc);
                array.join('');
                console.log(`array: ${array}`);
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
                array.splice(0, indexesToCutArray, perc);
                console.log(`array: ${array}`);
            } else {
                console.log('calculations before %')
                console.log(subArray);
                let calculations = evaly(subArray.slice(0, i).join(''));
                console.log(`calculations: ${calculations}`)
                let numberOfPerc = evaly(subArray.slice(i + 1, indexesToCutSubArray).join(''));
                console.log(`numberOfPerc: ${numberOfPerc}`)
                switch (subArray[i]) {
                    case '+':
                        perc = evaly(calculations + calculations * numberOfPerc / 100).toFixed(3);
                        console.log(`perc: ${perc}`)
                        break;
                    case '-':
                        perc = evaly(calculations - calculations * numberOfPerc / 100).toFixed(3);
                        console.log(`perc: ${perc}`);
                        break;
                    case '*':
                        perc = evaly(calculations * numberOfPerc / 100).toFixed(3);
                        console.log(`perc: ${perc}`);
                        break;
                    case '/':
                        perc = evaly(calculations / (numberOfPerc / 100)).toFixed(3);
                        console.log(`perc: ${perc}`);
                        break;
                    default:
                        return 'error';

                }
                // if (array[indexesToCut] === '%') {
                    array.splice(0, indexesToCutArray, perc);
                // } else {
                    // array.splice(0, indexesToCut, perc);
                // }
            }
            console.log(`perc: ${perc}`)
            // array.splice(0, indexesToCut, perc); // cuts from the original array the subarray
            console.log(`array: ${array}`)
        }
    })
    return array.join('');
}