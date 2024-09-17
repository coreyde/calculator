const display = document.querySelector(".display");

function performOperation(operand1, operator, operand2) {
  switch (operator) {
    case "+":
      result = add(operand1, operand2);
      return result;
    case "-":
      result = subtract(operand1, operand2);
      return result;
    case "*":
      result = multiply(operand1, operand2);
      return result;
    case "/":
      result = divide(operand1, operand2);
      return result;
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

function clear(...args) {
  for (let i = 0; i < args.length; i++) {
    args[i] = "";
  }
}

function intNegPos(number) {
  return -number;
}

function buttonPressed() {
  let buttons = document.querySelectorAll(".btn");
  let number = "";
  let operator = "";
  let operand1 = "";
  let operand2 = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let keyPress = button.dataset.value;

      if (isNaN(keyPress)) {
        updateDisplay(number);
        if (operand1 === "") {
          operator = "";
          operator += keyPress;
          console.log(operator);
          operand1 = parseInt(number);
          console.log(operand1);
        } else if (keyPress === "=") {
          operand2 = parseInt(number);
          console.log(operand2);
          updateDisplay(performOperation(operand1, operator, operand2));
        }
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

// Add function for "%"
// Handle cases for continuing calculations after "=" has already been pressed
// Allow for the above to continue eg. 10 + 10 = 20 + 10 = 30
