// Set default calculator state as object
interface CalculatorState {
  curNum: string;
  operator: string;
  operand1: number | "";
  operand2: number | "";
  updatedNum: number | "";
}

const calculatorState: CalculatorState = {
  curNum: "",
  operator: "",
  operand1: "",
  operand2: "",
  updatedNum: "",
};

// Access calculator display
const display = document.querySelector(".display");

// Perform arithmetic operation based on operator
function performOperation(
  operand1: number,
  operator: string,
  operand2: number
): number | null {
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
      return null;
    case "+/-":
      return handleNegPos(operand1, operand2);
    default:
      console.error("Invalid operator");
      return null;
  }
}

function add(operand1: number, operand2: number): number {
  return operand1 + operand2;
}

function subtract(operand1: number, operand2: number): number {
  return operand1 - operand2;
}

function multiply(operand1: number, operand2: number): number {
  return operand1 * operand2;
}

function divide(operand1: number, operand2: number): number | null {
  if (operand2 === 0) {
    alert("Cannot divide a number by 0!");
    return null; // Prevents further calculations with a null result
  } else {
    return operand1 / operand2;
  }
}

function handlePercentage(operand1: number, operand2: number | ""): number {
  if (operand2 === "" || isNaN(operand2)) {
    return operand1 / 100;
  } else {
    return operand2 / 100;
  }
}

// Reset all keys in calculatorState object to ""
function clearCalculator(): void {
  Object.keys(calculatorState).forEach(
    (key) => (calculatorState[key as keyof CalculatorState] = "")
  );
  updateDisplay(0);
}

// Handle "+/-" operator
function handleNegPos(operand1: number, operand2: number | ""): number {
  if (operand2 === "" || isNaN(operand2)) {
    return intNegPos(operand1);
  } else {
    return intNegPos(operand2);
  }
}

function intNegPos(number: number): number {
  return -number;
}

function handleNumberInput(keyPress: string): void {
  calculatorState.curNum += keyPress;
  updateDisplay(calculatorState.curNum);
}

function handleOperatorInput(keyPress: string): void {
  // If first digit is empty, save curNum to operand1 else save to operand2
  if (calculatorState.operand1 === "") {
    calculatorState.operator = keyPress;
    calculatorState.operand1 = parseFloat(calculatorState.curNum);
    calculatorState.curNum = "";
  } else {
    calculatorState.operand2 = parseFloat(calculatorState.curNum);
    calculatorState.operator = keyPress;

    const op1 =
      typeof calculatorState.operand1 === "number"
        ? calculatorState.operand1
        : 0;
    const op2 =
      typeof calculatorState.operand2 === "number"
        ? calculatorState.operand2
        : 0;

    updateDisplay(performOperation(op1, calculatorState.operator, op2) ?? 0);
    calculatorState.operand1 = calculatorState.updatedNum;
    calculatorState.curNum = "";
  }
}

// Event listener for button presses to determine next step
function buttonPressed(): void {
  let buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      let keyPress = button.getAttribute("data-value");

      if (isNaN(Number(keyPress))) {
        if (keyPress === "=") {
          calculatorState.operand2 = parseFloat(calculatorState.curNum);
          const op1 =
            typeof calculatorState.operand1 === "number"
              ? calculatorState.operand1
              : 0;
          const op2 =
            typeof calculatorState.operand2 === "number"
              ? calculatorState.operand2
              : 0;

          updateDisplay(
            performOperation(op1, calculatorState.operator, op2) ?? 0
          );
          calculatorState.operand1 = calculatorState.updatedNum;
          calculatorState.operator = "";
          calculatorState.curNum = "";
        } else if (keyPress === "clear") {
          clearCalculator();
        } else {
          handleOperatorInput(keyPress ?? "");
        }
      } else {
        handleNumberInput(keyPress ?? "");
      }
    });
  });
}

// Display the current number being pressed/result
function updateDisplay(number: string | number): void {
  let parsedNumber = parseFloat(String(number));
  if (!isNaN(parsedNumber)) {
    if (display) {
      display.textContent = parsedNumber.toString();
      calculatorState.updatedNum = parsedNumber;
    } else {
      console.error("Display element not found.");
    }
  } else {
    console.log(`Invalid number: ${number}`);
  }
}

// Initialize button listener ONLY after the html elements have fully loaded
document.addEventListener("DOMContentLoaded", function () {
  buttonPressed();
});
