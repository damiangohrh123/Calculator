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

//Declaring variables
let operator = '';
let currentValue = '';
let previousValue = '';

//Adding Eventlisteners to each number button
for (let i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener('click', handleNumber);
}

//Adding Eventlisteners to buttons
operatorButtons.forEach((button) => {
  button.addEventListener('click', function(e) {
    if (operator !== '') {
      calculate();
    }
    handleOperator(e);
  })
});

equalButton.addEventListener('click', function() {
  if (currentValue !== '' && previousValue !== '' & operator !== '' ) {
    calculate();
  }
});

clearButton.addEventListener('click', handleClear);
deleteButton.addEventListener('click', handleDelete,);
decimalButton.addEventListener('click', handleDecimal);
percentageButton.addEventListener('click', handlePercentage);

//Input numbers onto the screen element
function handleNumber(e) {
    if (currentValue.length < 8) {
        let number = e.target.textContent;
        currentValue += number;
        currentScreen.textContent = currentValue;
    }
}

//Operators function
function handleOperator(e) {
  operator = e.target.textContent;
  previousValue = currentValue;
  currentValue = '';
  previousScreen.textContent = `${previousValue} ${operator}`;
  currentScreen.textContent = currentValue;
}

//Clears the currentScreen, previousScreen, and the operator
function handleClear() {
  currentValue = '';
  previousValue = '';
  operator = '';
  previousScreen.textContent = previousValue;
  currentScreen.textContent = '0';
}

//Clears a single digit on the currentScreen
function handleDelete() {
  let slicedValue = currentValue.slice(0, -1);
  currentValue = slicedValue;
  currentScreen.textContent = currentValue;
}

//Divides currentValue by 100 to show 10%
function handlePercentage() {
  currentValue /= 100;
  currentScreen.textContent = currentValue;
}

//Calculate the expression according to the operator used
function calculate() {
  let previousValueFirst = previousValue; 
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  //switch function to check current operator
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

//Add decimal to currentValue
function handleDecimal() {
  if (!currentValue.includes('.')) {
    currentValue += '.';
    currentScreen.textContent = currentValue;
  }
}
