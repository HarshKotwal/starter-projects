const buttons = document.querySelectorAll("button");
const expression = document.querySelector("#expression");
const currentDisplay = document.querySelector("#current");
const historyList = document.getElementById("history-list");

let currentInput = "0";
let shouldReset = false;
let firstOperand = null;
let operator = null;

function formatResult(num) {
  if (num === "Error") return "Error";
  const n = Number(num);
  if (!isFinite(n)) return "Error";
  if (Math.abs(n) >= 1e12 || (Math.abs(n) > 0 && Math.abs(n) < 1e-10)) {
    return n.toExponential(6);
  }
  if (Number.isInteger(n)) {
    return n.toString();
  }
  return parseFloat(n.toFixed(10)).toString();
}

function addToHistory(expressionStr, resultStr) {
  if (!historyList) return;
  const item = document.createElement("div");
  item.className = "history-item";

  const expNode = document.createElement("div");
  expNode.className = "exp";
  expNode.textContent = expressionStr + " =";

  const resNode = document.createElement("div");
  resNode.className = "res";
  resNode.textContent = formatResult(resultStr);

  if (mode.textContent === "Dark") {
    expNode.style.color = "#555";
    resNode.style.color = "#000";
  } else {
    expNode.style.color = "#aaa";
    resNode.style.color = "#fff";
  }
  item.appendChild(expNode);
  item.appendChild(resNode);
  historyList.prepend(item);
}

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
    const rawResult = operate(firstOperand, operator, currentInput);
    const formattedResult = formatResult(rawResult);
    addToHistory(
      firstOperand + " " + operator + " " + currentInput,
      formattedResult
    );
    firstOperand = formattedResult;
    currentDisplay.textContent = firstOperand;
  }
  operator = op;
  expression.textContent = firstOperand + " " + operator;
  shouldReset = true;
}

function calculate() {
  if (firstOperand === null || operator === null) return;
  const rawResult = operate(firstOperand, operator, currentInput);
  const formattedResult = formatResult(rawResult);
  const exprStr = firstOperand + " " + operator + " " + currentInput;
  expression.textContent = exprStr + " =";
  currentDisplay.textContent = formattedResult;
  addToHistory(exprStr, formattedResult);

  currentInput = formattedResult.toString();
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
