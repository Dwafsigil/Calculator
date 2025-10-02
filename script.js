"use strict";

// Remember that add event listener takes in human action and code action

const displayEl = document.querySelector(".display-text");
const oneButton = document.querySelector(".one-button");

const displayValue = (value) => {
  displayEl.textContent = value;
};

displayValue("Sup");

oneButton.addEventListener("click", () => {
  displayValue("1");
});
