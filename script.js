let operand1 = 0;
let operand2 = 0;
let operator = "";

function operate(operand1, operator, operand2) {
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
  return operand1 / operand2;
}
