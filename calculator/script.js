const buttons = document.querySelectorAll("button");
const expression = document.querySelector("#expression");
const currentDisplay = document.querySelector("#current");

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
  currentInput = "0";
  firstOperand = null;
  operator = null;
  shouldReset = false;
  expression.textContent = "";
  currentDisplay.textContent = "0";
  currentDisplay.style.fontSize = "4rem";
}

function handleNumber(value) {
  if (shouldReset) {
    currentInput = value;
    shouldReset = false;
  } else {
    if (value === "00" && currentInput === "0") {
      currentInput = "0";
    } else if (value === "." && currentInput === "0") {
      currentInput = "0.";
    } else if (value === "." && currentInput.includes(".")) {
      return;
    } else if (currentInput === "0" && value !== ".") {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }

  updateScreen();
}

function updateScreen() {
  if (currentInput.length > 16) {
    currentInput = currentInput.slice(0, 16);
  }
  currentDisplay.textContent = currentInput;

  if (currentInput.length > 12) {
    currentDisplay.style.fontSize = "2rem";
  } else if (currentInput.length > 8) {
    currentDisplay.style.fontSize = "2.5rem";
  } else {
    currentDisplay.style.fontSize = "4rem";
  }
}

function handleOperator(op) {
  if (firstOperand === null) {
    firstOperand = currentInput;
  } else if (!shouldReset) {
    firstOperand = operate(firstOperand, operator, currentInput);
    currentDisplay.textContent = firstOperand;
  }
  operator = op;
  expression.textContent = firstOperand + " " + operator;
  shouldReset = true;
}

function calculate() {
  if (firstOperand === null || operator === null) return;
  let result = operate(firstOperand, operator, currentInput);
  expression.textContent =
    firstOperand + " " + operator + " " + currentInput + "=";
  currentDisplay.textContent = result;
  currentInput = result.toString();
  firstOperand = null;
  operator = null;
  shouldReset = true;
  updateScreen();
}

function deleteLast() {
  if (shouldReset) return;
  currentInput = currentInput.slice(0, -1) || "0";
  updateScreen();
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
