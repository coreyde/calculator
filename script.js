calculatorState = {
  curNum: "",
  operator: "",
  operand1: "",
  operand2: "",
  updatedNum: "",
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
      if (operand2 === "" || isNaN(operand2)) {
        result = intNegPos(operand1);
        calculatorState.operand1 = result;
      } else {
        result = intNegPos(operand2);
        calculatorState.operand2 = result;
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
          calculatorState.operand1 = parseFloat(calculatorState.curNum);
          if (calculatorState.operator) {
            updateDisplay(
              performOperation(
                calculatorState.operand1,
                calculatorState.operator,
                calculatorState.operand2
              )
            );
          }
        } else if (keyPress === "=") {
          console.log(`curNum: ${calculatorState.curNum}`);
          calculatorState.operand2 = parseFloat(calculatorState.curNum);
          console.log(
            `current operation: ${calculatorState.operand1} ${calculatorState.operator} ${calculatorState.operand2}`
          );
          console.log(`updatedNum: ${calculatorState.updatedNum}`);
          updateDisplay(
            performOperation(
              calculatorState.operand1,
              calculatorState.operator,
              calculatorState.operand2
            )
          );
        }
        calculatorState.curNum = "";
        calculatorState.operand1 = calculatorState.updatedNum;
      } else if (keyPress === "+/-") {
        updateDisplay(
          performOperation(
            calculatorState.operand1,
            calculatorState.operator,
            calculatorState.operand2
          )
        );
        console.log(`operand 1: ${calculatorState.operand1}`);
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
  // Ensure the number is parsed before updating the display
  let parsedNumber = parseFloat(number);
  if (!isNaN(parsedNumber)) {
    console.log(`updateDisplay: ${parsedNumber}`);
    display.textContent = parsedNumber;
    calculatorState.updatedNum = parsedNumber; // Ensure updatedNum is numeric
  } else {
    console.log(`Invalid number: ${number}`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buttonPressed();
});

// Finish functionality for intNegPos function
// Add function for "%"
// Handle cases for continuing calculations after "=" has already been pressed
// Allow for the above to continue eg. 10 + 10 = 20 + 10 = 30
