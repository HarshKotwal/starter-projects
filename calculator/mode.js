let main = document.querySelector(".main");
let screen = document.querySelector("#screen");
let nums = document.querySelector(".nums");
let history = document.querySelector(".history");
let mode = document.querySelector("#mode");

mode.addEventListener("click", () => {
  if (mode.textContent === "Light") {
    main.style.backgroundColor = "#e2e2e2";
    screen.style.background = "#313131";
    history.style.background = "#e2e2e2";
    history.style.color = "#000";
    mode.style.background = "#000";
    mode.style.color = "#fff";
    mode.textContent = "Dark";
  } else {
    main.style.backgroundColor = "#1e1e1e";
    screen.style.background = "#000";
    history.style.background = "#111";
    history.style.color = "#fff";
    mode.style.background = "#fff";
    mode.style.color = "#000";
    mode.textContent = "Light";
  }
});
