const calculatorState = {
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
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      return divide(operand1, operand2);
    case "%":
      return handlePercentage(operand1, operand2);
    case "clear":
      clearCalculator();
      break;
    case "+/-":
      return handleNegPos(operand1, operand2);
    default:
      console.error("Invalid operator");
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
    return null; // Prevents further calculations with a null result
  } else {
    return operand1 / operand2;
  }
}

function handlePercentage(operand1, operand2) {
  if (operand2 === "" || isNaN(operand2)) {
    return divide(operand1, 100);
  } else {
    return divide(operand2, 100);
  }
}

function clearCalculator() {
  Object.keys(calculatorState).forEach((key) => (calculatorState[key] = ""));
  updateDisplay(0);
}

function handleNegPos(operand1, operand2) {
  if (operand2 === "" || isNaN(operand2)) {
    return intNegPos(operand1);
  } else {
    return intNegPos(operand2);
  }
}

function intNegPos(number) {
  return -number;
}

function handleNumberInput(keyPress) {
  calculatorState.curNum += keyPress;
  updateDisplay(calculatorState.curNum);
}

function handleOperatorInput(keyPress) {
  if (calculatorState.operand1 === "") {
    console.log("here");
    calculatorState.operator = keyPress;
    calculatorState.operand1 = parseFloat(calculatorState.curNum);
    calculatorState.curNum = "";
  } else {
    console.log("here also");
    calculatorState.operand2 = parseFloat(calculatorState.curNum);
    calculatorState.operator = keyPress;
    updateDisplay(
      performOperation(
        calculatorState.operand1,
        calculatorState.operator,
        calculatorState.operand2
      )
    );
    calculatorState.operand1 = calculatorState.updatedNum;
    calculatorState.curNum = "";
  }
}

function buttonPressed() {
  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let keyPress = button.dataset.value;

      if (isNaN(keyPress)) {
        if (keyPress === "=") {
          calculatorState.operand2 = parseFloat(calculatorState.curNum);
          updateDisplay(
            performOperation(
              calculatorState.operand1,
              calculatorState.operator,
              calculatorState.operand2
            )
          );
          calculatorState.operand1 = calculatorState.updatedNum;
          calculatorState.operator = "";
          calculatorState.curNum = "";
        } else if (keyPress === "clear") {
          clearCalculator();
        } else {
          handleOperatorInput(keyPress);
        }
      } else {
        handleNumberInput(keyPress);
      }
    });
  });
}

function updateDisplay(number) {
  let parsedNumber = parseFloat(number);
  if (!isNaN(parsedNumber)) {
    display.textContent = parsedNumber;
    calculatorState.updatedNum = parsedNumber;
  } else {
    console.log(`Invalid number: ${number}`);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  buttonPressed();
});
