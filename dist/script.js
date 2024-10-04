var calculatorState = {
    curNum: "",
    operator: "",
    operand1: "",
    operand2: "",
    updatedNum: "",
};
// Access calculator display
var display = document.querySelector(".display");
// Perform arithmetic operation based on operator
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
            return null;
        case "+/-":
            return handleNegPos(operand1, operand2);
        default:
            console.error("Invalid operator");
            return null;
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
    }
    else {
        return operand1 / operand2;
    }
}
function handlePercentage(operand1, operand2) {
    if (operand2 === "" || isNaN(operand2)) {
        return operand1 / 100;
    }
    else {
        return operand2 / 100;
    }
}
// Reset all keys in calculatorState object to ""
function clearCalculator() {
    Object.keys(calculatorState).forEach(function (key) { return (calculatorState[key] = ""); });
    updateDisplay(0);
}
// Handle "+/-" operator
function handleNegPos(operand1, operand2) {
    if (operand2 === "" || isNaN(operand2)) {
        return intNegPos(operand1);
    }
    else {
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
    var _a;
    // If first digit is empty, save curNum to operand1 else save to operand2
    if (calculatorState.operand1 === "") {
        calculatorState.operator = keyPress;
        calculatorState.operand1 = parseFloat(calculatorState.curNum);
        calculatorState.curNum = "";
    }
    else {
        calculatorState.operand2 = parseFloat(calculatorState.curNum);
        calculatorState.operator = keyPress;
        var op1 = typeof calculatorState.operand1 === "number"
            ? calculatorState.operand1
            : 0;
        var op2 = typeof calculatorState.operand2 === "number"
            ? calculatorState.operand2
            : 0;
        updateDisplay((_a = performOperation(op1, calculatorState.operator, op2)) !== null && _a !== void 0 ? _a : 0);
        calculatorState.operand1 = calculatorState.updatedNum;
        calculatorState.curNum = "";
    }
}
// Event listener for button presses to determine next step
function buttonPressed() {
    var buttons = document.querySelectorAll(".btn");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var _a;
            var keyPress = button.getAttribute("data-value");
            if (isNaN(Number(keyPress))) {
                if (keyPress === "=") {
                    calculatorState.operand2 = parseFloat(calculatorState.curNum);
                    var op1 = typeof calculatorState.operand1 === "number"
                        ? calculatorState.operand1
                        : 0;
                    var op2 = typeof calculatorState.operand2 === "number"
                        ? calculatorState.operand2
                        : 0;
                    updateDisplay((_a = performOperation(op1, calculatorState.operator, op2)) !== null && _a !== void 0 ? _a : 0);
                    calculatorState.operand1 = calculatorState.updatedNum;
                    calculatorState.operator = "";
                    calculatorState.curNum = "";
                }
                else if (keyPress === "clear") {
                    clearCalculator();
                }
                else {
                    handleOperatorInput(keyPress !== null && keyPress !== void 0 ? keyPress : "");
                }
            }
            else {
                handleNumberInput(keyPress !== null && keyPress !== void 0 ? keyPress : "");
            }
        });
    });
}
// Display the current number being pressed/result
function updateDisplay(number) {
    var parsedNumber = parseFloat(String(number));
    if (!isNaN(parsedNumber)) {
        if (display) {
            display.textContent = parsedNumber.toString();
            calculatorState.updatedNum = parsedNumber;
        }
        else {
            console.error("Display element not found.");
        }
    }
    else {
        console.log("Invalid number: ".concat(number));
    }
}
// Initialize button listener ONLY after the html elements have fully loaded
document.addEventListener("DOMContentLoaded", function () {
    buttonPressed();
});
