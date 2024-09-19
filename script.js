calculatorState = {
  curNum: "",
  operator: "",
  operand1: "",
  operand2: "",
};

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
    case "+/-":
      console.log("here");
      if (operand2 === "" || operand2 === NaN) {
        result = intNegPos(operand1);
      } else {
        result = intNegPos(operand2);
      }
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

function handleNumber(curNum, operand1, operand2) {}
function handleOperator(operator) {}

function buttonPressed() {
  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let keyPress = button.dataset.value;

      if (isNaN(keyPress)) {
        updateDisplay(calculatorState.curNum);
        if (calculatorState.operand1 === "") {
          calculatorState.operator = "";
          calculatorState.operator += keyPress;
          console.log(operator);
          operand1 = parseInt(curNum);
          console.log(calculatorState.operand1);
          if (calculatorState.operator) {
            updateDisplay(
              performOperation(
                calculatorState.operand1,
                calculatorState.operator,
                calculatorState.operand2
              )
            );
          }
          calculatorState.operator = "";
        } else if (keyPress === "=" || keyPress === "+/-") {
          calculatorState.operand2 = parseInt(calculatorState.curNum);
          console.log(calculatorState.operand2);
          updateDisplay(
            performOperation(
              calculatorState.operand1,
              calculatorState.operator,
              calculatorState.operand2
            )
          );
        }
        calculatorState.curNum = "";
      } else {
        calculatorState.curNum += keyPress;
        console.log(calculatorState.curNum);
        updateDisplay(calculatorState.curNum);
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

// Finish functionality for intNegPos function
// Add function for "%"
// Handle cases for continuing calculations after "=" has already been pressed
// Allow for the above to continue eg. 10 + 10 = 20 + 10 = 30
