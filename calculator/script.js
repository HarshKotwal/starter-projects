const buttons = document.querySelectorAll("button");
const screen = document.querySelector("#screen");

let currentInput = "0";
let shouldReset = false;
let firstOperand = null;
let operator = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;
    if (!isNaN(value) || value === "0" || value === "00" || value === ".") {
      handleNumber(value);
    } else if (value === "AC") {
      clearAll();
    } else if (value === "del") {
      deleteLast();
    } else if (value === "=") {
      calculate();
    } else {
      handleOperator(value);
    }
  });
});

function clearAll() {
  screen.textContent = "0";
  currentInput = "0";
  firstOperand = null;
  operator = null;
  shouldReset = false;
}

function handleNumber(value) {
  if (shouldReset || currentInput === "0") {
    currentInput = value;
    shouldReset = false;
  } else {
    currentInput += value;
  }
  screen.textContent = currentInput;
}

function handleOperator(op) {
  if (operator !== null && !shouldReset) {
    calculate();
  }
  firstOperand = currentInput;
  operator = op;
  shouldReset = true;
}

function calculate() {
  if (firstOperand === null || operator === null) return;
  let result = operate(firstOperand, operator, currentInput);
  screen.textContent = result;
  currentInput = result;
  firstOperand = result;
  operator = null;
  shouldReset = true;
}

function deleteLast() {
  if (shouldReset) return;
  currentInput = currentInput.slice(0, -1) || "0";
  screen.textContent = currentInput;
}

function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "/":
      return b === 0 ? "Error" : a / b;
    case "%":
      return a % b;
    default:
      return b;
  }
}
