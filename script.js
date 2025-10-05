"use strict";

// Remember that add event listener takes in human action and code action
let textArray = [];
let value;
let textString = "";

const displayEl = document.querySelector(".display-text");

// All Buttons
const button = document.querySelectorAll(".button");
const percentButton = document.querySelector(".percent-btn");
const clearPrevButton = document.querySelector(".clear-previous-btn");
const clearButton = document.querySelector(".clear-btn");
const backButton = document.querySelector(".back-btn");
const overXButton = document.querySelector(".overX-btn");
const sqrButton = document.querySelector(".squared-btn");
const sqrRootButton = document.querySelector(".root-btn");
const divisionButton = document.querySelector(".division-btn");
const sevenButton = document.querySelector(".seven-btn");
const eightButton = document.querySelector(".eight-btn");
const nineButton = document.querySelector(".nine-btn");
const multiButton = document.querySelector(".multi-btn");
const fourButton = document.querySelector(".four-btn");
const fiveButton = document.querySelector(".five-btn");
const sixButton = document.querySelector(".six-btn");
const subtractionButton = document.querySelector(".sub-btn");
const oneButton = document.querySelector(".one-btn");
const twoButton = document.querySelector(".two-btn");
const threeButton = document.querySelector(".three-btn");
const addButton = document.querySelector(".add-btn");
const plusMinusButton = document.querySelector(".plus-minus-btn");
const zeroButton = document.querySelector(".zero-btn");
const dotButton = document.querySelector(".decimal-btn");
const equalButton = document.querySelector(".equal-btn");

//  Display the value
const displayValue = (v) => {
  displayEl.textContent = v;

  // displayEl.textContent = textArray.join(" ");
};

// Add value to the Array
const addValue = (value) => {
  textArray.push(value);
};

// Remove previous value
const removeValue = () => {
  textArray.pop();
};

// Clear Calculator
const clearValue = () => {
  // clear the array
  textArray.length = 0;
};

// Check if string is a number
const isDigit = (s) => /^[0-9]$/.test(s);

const commit = () => {
  if (textString !== "") {
    textArray.push(textString);
    textString = "";
  }
};

// Listening for button press
button.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // The button click is set to the buttonPressed variable
    const buttonPressed = e.currentTarget.textContent.trim();
    console.log(buttonPressed);

    // Numbers
    if (!isNaN(buttonPressed)) {
      textString += buttonPressed;
      displayValue(textString);
      return;
    }

    // Decimal
    if (buttonPressed == ".") {
      textString += buttonPressed;
      displayValue(textString);
      return;
    }

    // Basic Operators

    if (
      buttonPressed == "+" ||
      buttonPressed == "-" ||
      buttonPressed == "x" ||
      buttonPressed == "÷"
    ) {
      commit();
      textArray.push(buttonPressed);
      // textString = "";
      return;
    }

    // Advance Operators

    if (buttonPressed == "1/x") {
      commit();
      let lastEntry = textArray.pop();
      textArray.push(1 / lastEntry);
      displayValue(1 / lastEntry);
      return;
    }

    if (buttonPressed == "x^2") {
      commit();
      let lastEntry = textArray.pop();
      textArray.push(lastEntry * lastEntry);
      displayValue(lastEntry * lastEntry);
      return;
    }

    if (buttonPressed == "√x") {
      commit();
      let lastEntry = textArray.pop();
      textArray.push(Math.sqrt(lastEntry));
      displayValue(Math.sqrt(lastEntry));

      return;
    }

    if (buttonPressed == "%") {
      commit();
      let lastEntry = textArray.pop();
      textArray.push(lastEntry / 100);
      displayValue(lastEntry / 100);
      return;
    }

    // Clear Buttons

    if (buttonPressed == "C") {
      textString = "";
      textArray = [];
      displayValue("Reset");
      return;
    }

    if (buttonPressed == "CE") {
      textString = "";
      displayValue(textString);
      return;
    }

    if (buttonPressed == "⌫") {
      textString = textString.slice(0, -1);
      displayValue(textString);
    }

    if (buttonPressed == "±") {
      if (!textString.includes("-")) {
        textString = "-" + textString;
      } else {
        textString = textString.slice(1);
      }
      displayValue(textString);
    }

    if (buttonPressed == "=") {
      // textArray.push(textString);
      commit();
      console.log(textArray);
      displayValue(solveLogic(textArray));
      textArray = [];
      // textString = "";
      return;
    }
  });
});

const solveLogic = (array) => {
  // pass1
  let p1 = [];

  for (let i = 0; i < array.length; i++) {
    let cur = array[i];

    // if a number
    if (!isNaN(cur)) {
      p1.push(parseFloat(cur));
    }

    // if + or -
    if (cur == "+" || cur == "-" || cur == "x" || cur == "÷") {
      //  take left number
      let left = parseFloat(p1.pop());

      // Take right number
      let right = parseFloat(array[++i]);

      if (cur == "+") p1.push(left + right);
      if (cur == "-") p1.push(left - right);
      if (cur == "x") p1.push(left * right);
      if (cur == "÷") p1.push(left / right);
    }
  }
  console.log(p1);
  console.log(p1[0]);
  return p1[0];

  // Algebraic Order Doesn't Feel Right
  // // Iterate through array
  // for (let i = 0; i < array.length; i++) {
  //   let cur = array[i];

  //   // if a number
  //   if (!isNaN(cur)) {
  //     p1.push(parseFloat(cur));
  //   }

  //   // if + or -
  //   if (cur == "+" || cur == "-") {
  //     p1.push(cur);
  //   }

  //   // if multiplication or division
  //   if (cur == "x" || cur == "÷") {
  //     // Take left number. Remove value from pass 1 array
  //     let left = parseFloat(p1.pop());

  //     // Take right number
  //     let right = parseFloat(array[++i]);

  //     // Multiples or Divides
  //     p1.push(cur === "x" ? left * right : left / right);
  //   }
  // }

  // console.log(p1);
  // // pass 2

  // let p2 = [];

  // for (let i = 0; i < p1.length; i++) {
  //   let cur = p1[i];

  //   if (!isNaN(cur)) {
  //     p2.push(cur);
  //   }
  //   if (cur == "+" || cur == "-") {
  //     let left = parseFloat(p2.pop());
  //     // console.log(left);
  //     let right = parseFloat(p1[++i]);
  //     p2.push(cur === "+" ? left + right : left - right);
  //   }
  // }
  // console.log(p2);

  // return p2[0];
};

const testArray = [".5", "x", ".5"];
// console.log(testArray);
// console.log(solveLogic(testArray));
