/* Constants */
const CODE_SIZE = 6;
const RESET_LIMIT = 10;
const KEY_NAME = 'code';
const GET_CODE_INTERACTION = 'Please enter the student code.';

/* Variables */
let localStorage = window.localStorage || null;
let needStoredCode = false;
let resetCount = 0;
let interaction;
let display;
let storedCode;
let enteredCode;
let primaryButtons = [];
let enterButton;
let clearButton;
let resetTarget;

/* Temp Variables */
let previousInteraction = [];

/* Functions */
const updateDisplay = () => {
  let newDisplay = enteredCode;
  if (enteredCode.length < CODE_SIZE)
    newDisplay += '_';
  display.innerText = newDisplay;
};

const clearReset = () => {
  resetCount = 0;
  resetTarget.parentElement.style.color = '';
}

const addEnteredDigit = (digit) => {
  if (enteredCode.length === CODE_SIZE)
    return;
  enteredCode += digit;
};

const primaryButtonHandler = event => {
  clearReset();
  let digit = Number.parseInt(event.srcElement.innerText);
  addEnteredDigit(digit);
  updateDisplay();
};

const enterButtonHandler = event => {
  clearReset();
  if (enteredCode.length < CODE_SIZE)
    return;
  if (needStoredCode) {
    setStoredCode(enteredCode);
    storedCode = getStoredCode();
    needStoredCode = false;
    revertInteraction();
    clearButtonHandler();
    return;
  }
  if (enteredCode === storedCode) {
    alert('Wooo!');
  }
  else {
    alert('Try again!');
  }
  clearButtonHandler();
};

const resetTargetHandler = event => {
  if (needStoredCode)
    return;
  resetCount++;
  if (resetCount >= RESET_LIMIT - 3) {
    resetTarget.parentElement.style.color = 'gold';
  }
  if (resetCount >= RESET_LIMIT - 2) {
    resetTarget.parentElement.style.color = 'darkorange';
  }
  if (resetCount >= RESET_LIMIT - 1) {
    resetTarget.parentElement.style.color = 'red';
  }
  if (resetCount >= RESET_LIMIT) {
    resetTarget.parentElement.style.color = '';
    clearStoredCode();
    storedCode = undefined;
    needStoredCode = true;
    changeInteraction(GET_CODE_INTERACTION);
    changeInteraction(`Code Reset! - ${GET_CODE_INTERACTION}`);
    setTimeout(revertInteraction, 3000);
  }
}

const initializeResetTarget = event => {
  resetTarget = document.querySelector('header em');
  resetTarget.onclick = resetTargetHandler;
}

const clearButtonHandler = event => {
  clearReset();
  enteredCode = '';
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

const getStoredCode = () => {
  if (typeof(Storage) === "undefined") {
    return null;
  }
  return window.localStorage.getItem(KEY_NAME);
}

const setStoredCode = (newCode) => {
  if (typeof(Storage) === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(KEY_NAME, newCode);
  }
  catch {
    return;
  }
}

const clearStoredCode = () => {
  if (typeof(Storage) === "undefined") {
    return null;
  }
  return window.localStorage.removeItem(KEY_NAME);
}

const changeInteraction = (newInteraction) => {
  previousInteraction.push(interaction.innerText);
  interaction.innerText = newInteraction;
}

const revertInteraction = () => {
  interaction.innerText = previousInteraction.pop();
}

const initialize = () => {
  interaction = document.querySelector('section.interaction p');
  display = document.querySelector('section.display p');
  enteredCode = "";
  initializePrimaryButtons();
  initializeEnterButton();
  initializeClearButton();
  initializeResetTarget();
  storedCode = getStoredCode();
  if (storedCode === null)
    needStoredCode = true;
};

/* Main */
window.onload = (event) => {
  console.log('Initializing LunchCode...');
  initialize();
  console.log('LunchCode initialized!');
  if (needStoredCode)
  {
    changeInteraction(GET_CODE_INTERACTION);
  }
};
