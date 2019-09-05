/* Constants */
const CODE_SIZE = 6;

/* Variables */
let localStorage = window.localStorage || null;
let display;
let storedCode;
let enteredCode;
let primaryButtons = [];
let enterButton;
let clearButton;

/* Functions */
const updateDisplay = () => {
  let newDisplay = enteredCode;
  if (enteredCode.length < CODE_SIZE)
    newDisplay += '_';
  display.innerText = newDisplay;
};

const addEnteredDigit = (digit) => {
  if (enteredCode.length === CODE_SIZE)
    return;
  enteredCode += digit;
};

const primaryButtonHandler = event => {
  let digit = Number.parseInt(event.srcElement.innerText);
  addEnteredDigit(digit);
  updateDisplay();
};

const enterButtonHandler = event => {
  if (enteredCode < CODE_SIZE)
    return;
  console.log('ENTER');
};

const clearButtonHandler = event => {
  enteredCode = "";
  updateDisplay();
};

const initializePrimaryButtons = () => {
  let domButtons = document.getElementsByTagName('button');
  for (let button of domButtons) {
    if (!Number.isInteger(Number.parseInt(button.innerText)))
      continue;
    button.onclick = primaryButtonHandler;
    primaryButtons.push(button);
  }
};

const initializeEnterButton = () => {
  enterButton = document.getElementById('button-enter');
  enterButton.onclick = enterButtonHandler;
};

const initializeClearButton = () => {
  clearButton = document.getElementById('button-clear');
  clearButton.onclick = clearButtonHandler;
};

const initialize = () => {
  display = document.querySelector('section.display p');
  enteredCode = "";
  initializePrimaryButtons();
  initializeEnterButton();
  initializeClearButton();
  // Initialize storedCode;
};

/* Main */
window.onload = (event) => {
  console.log('Initializing LunchCode...');
  initialize();
};
