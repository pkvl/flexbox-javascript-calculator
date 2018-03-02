function addTransition(e) {
    changeValue(e);
    const item = document.querySelector(`.item[data-key="${e.keyCode}"]`);
    if (!item) return;
    item.classList.add('pressed');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

function changeValue(e) {
    if(e.keyCode === clearKeyCode) {
        operatorOne = symbol = operatorTwo = null;
        textField.innerHTML = "";
    }

    if(e.keyCode === resultKeyCode) {
        if(operatorOne !== null) getResult();
        return;
    }

    if(actionsCodes.includes(e.keyCode)) {
        selectAction(e.key);
        return;
    }
    
    if(e.keyCode === removeKeyCode) {
        textField.innerHTML = textField.innerHTML.slice(0, -1);
        return;
    }
    
    if(digitsCodes.includes(e.keyCode)) {
        textField.innerHTML += e.key;
        return;
    }
}

function selectAction(key) {
    symbol = key;
    operatorOne = textField.innerHTML;
    textField.innerHTML = "";
}

function getResult() {
    operatorTwo = textField.innerHTML;
    textField.innerHTML = eval(`${operatorOne}${symbol}${operatorTwo}`);
}

let operatorOne;
let operatorTwo;
let textField;
let symbol;

// key codes of action buttons 
const digitsCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const actionsCodes = [111, 106, 109, 107];
const resultKeyCode = 13;
const clearKeyCode = 46;
const removeKeyCode = 8;

window.onload = function(e) {

    textField = document.getElementById('text-field');
    textField.innerHTML = "";

    const items = document.querySelectorAll('.item');
    items.forEach(item => item.addEventListener('transitionend', removeTransition));
};

window.addEventListener('keydown', addTransition);
window.addEventListener('mousedown', function(e) {
    console.log(e.target);
});