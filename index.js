//Declaring components from index.html
const btnGrid = document.querySelector('.btnGrid');
let currentScreen = document.querySelector('.currentScreen');
let previousScreen = document.querySelector('.previousScreen');
const operatorButtons = btnGrid.querySelectorAll('#operator');
const equalButton = btnGrid.querySelector('#equal');
const clearButton = btnGrid.querySelector('#clear');
const deleteButton = btnGrid.querySelector('#delete');
const decimalButton = btnGrid.querySelector('#decimal');
const numberButtons = btnGrid.querySelectorAll('#number');
const percentageButton = btnGrid.querySelector('#percentage')
const buttonClickSound = document.querySelector('#buttonClickSound');

//Declaring variables
let operator = '';
let currentValue = '0';
let previousValue = '';

//Adding Eventlisteners to each number button
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', (e) => {
    let num = e.target.textContent;
    handleNumber(num);
  });
}

//Adding Eventlisteners to buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (operator !== '') {
      calculate();
    }
    let key = e.target.textContent;
    handleOperator(key);
  })
});

equalButton.addEventListener('click', () => {
  if (currentValue !== '' && previousValue !== '' & operator !== '' ) {
    calculate();
  }
});

clearButton.addEventListener('click', handleClear);
deleteButton.addEventListener('click', handleDelete);
decimalButton.addEventListener('click', handleDecimal);
percentageButton.addEventListener('click', handlePercentage);

//Adding Eventlisteners for keyboard inputs
window.addEventListener('keydown', handleKeyboardInput);

//Input numbers onto the screen element
function handleNumber(e) {
  if (currentValue === '0') currentValue = '';
  if (currentValue.length < 9) {
      currentValue += e;
      currentScreen.textContent = currentValue;
      buttonClickSound.play();
  }
}

//Keyboard Input
function handleKeyboardInput(e) {
  if (e.key === 'Backspace') {
    handleDelete();
  }
  if (e.key === 'Escape') {
    handleClear();
  }
  if (e.key === '.') {
    handleDecimal();
  }
  if ((e.key === '=' || e.key === 'Enter') && (currentValue !== '' && previousValue !== '' & operator !== '' )) {
    calculate();
  }
  if (e.key === '+' || e.key === '-' || e.key === 'x' || e.key === '/') {
    convertedKey = keyConverter(e.key);
    if (operator != '') {
      calculate();
    }
    handleOperator(convertedKey);
  }
  if (currentValue.length < 9) {
    if (e.key >= 0 && e.key <=9) {
      handleNumber(e.key);
    }
  }
}

//Keyboard Input converter to make sure symbols can be read by functions
function keyConverter(keyInput) {
  if (keyInput === '+') return '+';
  if (keyInput === '-') return '-';
  if (keyInput === 'x') return 'x';
  if (keyInput === '/' ) return '÷';
}

//Handles selection of operator and updates previous and current values
function handleOperator(e) {
  operator = e;
  previousValue = currentValue;
  currentValue = '';
  previousScreen.textContent = `${previousValue} ${operator}`;
  currentScreen.textContent = currentValue;
  buttonClickSound.play();
}

//Clears the currentScreen, previousScreen, and the operator
function handleClear() {
  currentValue = '0';
  previousValue = '';
  operator = '';
  previousScreen.textContent = previousValue;
  currentScreen.textContent = currentValue;
  buttonClickSound.play();
}

//Clears a single digit on the currentScreen
function handleDelete() {
  let slicedValue = currentValue.slice(0, -1);
  currentValue = slicedValue;
  currentScreen.textContent = currentValue;
  buttonClickSound.play();
}

//Divides currentValue by 100 to show 10%
function handlePercentage() {
  if (currentValue.length < 9 ) {
    let percentageValueString = (currentValue /= 100).toString();
    currentScreen.textContent = currentValue;
    currentValue = percentageValueString;
    buttonClickSound.play();
  }
}

//Calculate the expression according to the operator used
function calculate() {
  let previousValueFirst = previousValue; 
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);
  buttonClickSound.play();

  //Check current operator and apply the operation accordingly
  switch (operator) {
    case '+':
      (previousValue += currentValue);
      break;
    case '-':
      (previousValue -= currentValue);
      break;
    case 'x':
      (previousValue *= currentValue);
      break;
    case '÷':
      (previousValue /= currentValue);
      break;
    }

    let roundedValue = rounding(previousValue);
    let roundedValueString = roundedValue.toString();
    currentValue = currentValue.toString();

    //Changes the roundedValue to a scientific value if there are too many digits (E.g. From 9999999999999999 to 1.00000e+16)
    if (roundedValueString.length >= 10) {
      roundedValueString = roundedValue.toExponential(5);
    }
    
    //To display the currentValue and previousValue on the screen
    previousScreen.textContent = `${previousValueFirst} ${operator} ${currentValue} =`; 
    currentScreen.textContent = roundedValueString;
    currentValue = roundedValueString;
    operator = '';
}

//Rounds calculated value 
function rounding(num) {
  return Math.round(num * 1000) / 1000;
}

//Adds decimal to currentValue
function handleDecimal() {
  if (!currentValue.includes('.') && currentValue.length < 8) {
    currentValue += '.';
    currentScreen.textContent = currentValue;
    buttonClickSound.play();
  }
}
