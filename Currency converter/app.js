const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

//to get access to dropdown list and add all countryList in them also to set USD and INR as selected
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  // On dropdown change, pass the changed <select> (evt.target) to update the flag
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

//Get user input value, if empty or <1 set to 1 as default
const updateExchangerate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  // Build API URL, fetch data, convert it to JS object, and extract the exchange rate
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  // Calculate final converted amount and display it as a message
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

// Updates flag img based on selected curr
// Gets selected currCode, finds countryCode, stores country img, finds img in parent and changes it
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Stops button from reloading the page on click
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangerate();
});

// Run updateExchangeRate() once the full page has loaded
window.addEventListener("load", () => {
  updateExchangerate();
});
