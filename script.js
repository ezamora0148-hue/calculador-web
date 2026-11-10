// Referencias a los elementos de la pantalla.
const display = document.querySelector("#display");
const expression = document.querySelector("#expression");
const keypad = document.querySelector("#keypad");

// Estado de la operación actual.
let currentInput = "0";
let firstNumber = null;
let selectedOperator = null;
let waitingForSecondNumber = false;
let justCalculated = false;

// Actualiza lo que se ve en la pantalla.
function updateDisplay() {
  display.textContent = currentInput;
}

// Agrega un dígito al número que se está escribiendo.
function enterDigit(digit) {
  if (currentInput === "Error" || waitingForSecondNumber || justCalculated) {
    currentInput = digit;
    waitingForSecondNumber = false;
    justCalculated = false;
  } else if (currentInput === "0") {
    currentInput = digit;
  } else if (currentInput.replace("-", "").length < 14) {
    currentInput += digit;
  }
  updateDisplay();
}

// Agrega un punto decimal, solo si el número todavía no tiene uno.
function enterDecimal() {
  if (currentInput === "Error" || waitingForSecondNumber || justCalculated) {
    currentInput = "0.";
    waitingForSecondNumber = false;
    justCalculated = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }
  updateDisplay();
}

// Ejecuta la operación elegida usando dos números.
function calculate(a, operator, b) {
  if (operator === "+") return a + b;
  if (operator === "−") return a - b;
  if (operator === "×") return a * b;
  if (operator === "÷") return b === 0 ? null : a / b;
  return b;
}

// Guarda el operador y, si ya había una operación pendiente, la resuelve primero.
function chooseOperator(operator) {
  if (currentInput === "Error") return;

  const inputNumber = Number(currentInput);
  if (selectedOperator && !waitingForSecondNumber) {
    const result = calculate(firstNumber, selectedOperator, inputNumber);
    if (result === null || !Number.isFinite(result)) {
      showError();
      return;
    }
    currentInput = formatNumber(result);
    firstNumber = result;
  } else {
    firstNumber = inputNumber;
  }

  selectedOperator = operator;
  waitingForSecondNumber = true;
  justCalculated = false;
  expression.textContent = `${formatNumber(firstNumber)} ${operator}`;
  updateDisplay();
}

// Resuelve la operación pendiente al pulsar igual.
function showResult() {
  if (!selectedOperator || waitingForSecondNumber || currentInput === "Error") return;

  const secondNumber = Number(currentInput);
  const result = calculate(firstNumber, selectedOperator, secondNumber);
  if (result === null || !Number.isFinite(result)) {
    showError();
    return;
  }

  expression.textContent = `${formatNumber(firstNumber)} ${selectedOperator} ${formatNumber(secondNumber)} =`;
  currentInput = formatNumber(result);
  selectedOperator = null;
  firstNumber = null;
  waitingForSecondNumber = false;
  justCalculated = true;
  updateDisplay();
}

// Limita los decimales y evita mostrar el resultado en notación larga.
function formatNumber(number) {
  return String(Number(number.toPrecision(10)));
}

// Muestra un mensaje cuando la operación no tiene un resultado válido.
function showError() {
  currentInput = "Error";
  expression.textContent = "No se puede dividir por cero";
  firstNumber = null;
  selectedOperator = null;
  waitingForSecondNumber = false;
  justCalculated = false;
  updateDisplay();
}

// Reinicia la calculadora.
function clearCalculator() {
  currentInput = "0";
  firstNumber = null;
  selectedOperator = null;
  waitingForSecondNumber = false;
  justCalculated = false;
  expression.textContent = "Listo para calcular";
  updateDisplay();
}

// Borra el último dígito escrito.
function deleteLastDigit() {
  if (currentInput === "Error" || waitingForSecondNumber || justCalculated) {
    clearCalculator();
    return;
  }
  currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : "0";
  if (currentInput === "-") currentInput = "0";
  updateDisplay();
}

// Un solo manejador de clics identifica la tecla presionada por sus atributos data-*.
keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.digit !== undefined) enterDigit(button.dataset.digit);
  if (button.dataset.operator) chooseOperator(button.dataset.operator);
  if (button.dataset.action === "decimal") enterDecimal();
  if (button.dataset.action === "equals") showResult();
  if (button.dataset.action === "clear") clearCalculator();
  if (button.dataset.action === "backspace") deleteLastDigit();
});

// Permite usar los números y operadores del teclado de la computadora.
document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) enterDigit(event.key);
  else if (event.key === "." || event.key === ",") enterDecimal();
  else if (event.key === "+") chooseOperator("+");
  else if (event.key === "-") chooseOperator("−");
  else if (event.key === "*") chooseOperator("×");
  else if (event.key === "/") { event.preventDefault(); chooseOperator("÷"); }
  else if (event.key === "Enter" || event.key === "=") showResult();
  else if (event.key === "Backspace") deleteLastDigit();
  else if (event.key === "Escape") clearCalculator();
});
