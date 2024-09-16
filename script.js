let operand1 = 0;
let operand2 = 0;
let curValue = 0;

const display = document.querySelector(".display");

function performOperation(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      add(operand1, operand2);
    case "-":
      subtract(operand1, operand2);
    case "*":
      multiply(operand1, operand2);
    case "/":
      divide(operand1, operand2);
  }
}

function add(operand1, operand2) {
  return operand1 + operand2;
}

function subtract(operand1, operand2) {
  return operand1 - operand2;
}

function multiply(operand1, operand2) {
  return operand1 * operand2;
}

function divide(operand1, operand2) {
  if (operand2 === 0) {
    alert("Cannot divide a number by 0!");
  } else {
    return operand1 / operand2;
  }
}

function buttonPressed() {
  let buttons = document.querySelectorAll(".btn");
  let number = "";
  let operator = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let keyPress = button.dataset.value;

      if (isNaN(keyPress)) {
        updateDisplay(number);
        operator += keyPress;
        number = "";
      } else {
        number += keyPress;
        console.log(number);
        updateDisplay(number);
      }
    });
  });
}

function updateDisplay(number) {
  if (parseInt(number)) {
    display.textContent = number;
  } else {
    console.log(number);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buttonPressed();
});

//store var1 and var2 so that you can do performOperation()
//do performOperation() function in buttonPressed()
//update display with final result
