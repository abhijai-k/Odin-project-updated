let displayValue = '0';
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

function updateDisplay() {
  display.textContent = displayValue;
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    displayValue = displayValue === '0' ? number : displayValue + number;
  }
  updateDisplay();
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = displayValue;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondOperand = displayValue;
  let result = operate(currentOperator, firstOperand, secondOperand);
  displayValue = (typeof result === "number" && !Number.isInteger(result))
    ? result.toFixed(2)
    : result.toString();
  currentOperator = null;
  updateDisplay();
}

function clear() {
  displayValue = '0';
  firstOperand = null;
  secondOperand = null;
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function backspace() {
  if (shouldResetDisplay) return;
  displayValue = displayValue.slice(0, -1) || '0';
  updateDisplay();
}

function appendDecimal() {
  if (shouldResetDisplay) {
    displayValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-number")) {
      appendNumber(button.getAttribute("data-number"));
    } else if (button.getAttribute("data-action") === "=") {
      evaluate();
    } else if (button.getAttribute("data-action") === "clear") {
      clear();
    } else if (button.getAttribute("data-action") === "backspace") {
      backspace();
    } else if (button.getAttribute("data-action") === ".") {
      appendDecimal();
    } else {
      setOperator(button.getAttribute("data-action"));
    }
  });
});
