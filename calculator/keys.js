document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!isNaN(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleNumber(key);
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "%"
  ) {
    const op = key === "*" ? "x" : key;
    handleOperator(op);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearAll();
  }
});
