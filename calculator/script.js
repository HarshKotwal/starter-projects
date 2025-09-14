const buttons = document.querySelectorAll("button");
const screen = document.querySelector("#screen");

let currentInput = "0";
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.textContent;
    if (!isNaN(value) || value === "0" || value === "00" || value === ".") {
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
      screen.textContent = currentInput;
    }
  });
});
