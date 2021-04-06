const Fraction = require('fraction.js');

export function getMatrices() {
  const matrices = document.querySelectorAll('.matrix');
  let dictMatrices = [];

  for (let m = 1; m <= matrices.length; m++) {
    const matrix = document.querySelector('#matrix-' + m);
    let rows = matrix.querySelectorAll('.matrix-row');
    let cols = matrix.querySelector('.matrix-row').querySelectorAll('.matrix-column');
    let newMatrix = newExecuteMatrix(rows.length, cols.length);
    for (let r = 1; r <= rows.length; r++) {
      let row = matrix.querySelector('#row-' + r);
      for (let c = 1; c <= cols.length; c++) {
        let column = row.querySelector('#column-' + c);
        newMatrix[r - 1][c - 1] = Number(column.children[0].innerText) ?? 0;
      }
    }
    dictMatrices[m-1] = newMatrix;
  }
  return dictMatrices;
}

export function getScalar() {
  return Number(document.querySelector('.scalarInput').innerText);
}

export function getLinearEquationsAsAugmentedMatrix() {
  const equationTable = document.querySelector('.equationTable');
  const equations = equationTable.querySelectorAll('.equation-row');
  const variableCount = equations[0].querySelectorAll('.equation-variable');

  let value;
  let augmentedMatrix = newExecuteMatrix(equations.length, variableCount.length);

  for (let e = 1; e <= equations.length; e++) {
    let equation = equations[e - 1];
    let variables = equations[e - 1].querySelectorAll('.equation-variable');
    let operators = equations[e - 1].querySelectorAll('.equation-operator');
    for (let v = 1; v <= variables.length; v++) {
        let variable = variables[v - 1];
        let value = Number(variable.children[0].innerText);
        if (v != 1) {
          let variableID = variable.id.split('-')[1];
          let operatorIndex = variableID - 1;
          let operatorsArray = Array.from(operators);
          let operator = operatorsArray.find(element => element.id.toString().includes(operatorIndex));
          if (operator.children[0].selectedOptions[0].innerText == "-") {
            augmentedMatrix[e - 1][v - 1] = -value ? -value : -1;
          }
          else {
            augmentedMatrix[e - 1][v - 1] = value ? value : 1;
          }
        }
        else {
          augmentedMatrix[e - 1][v - 1] = value ? value : 1;
        }
    }
    let constant = equations[e - 1].querySelector('.equation-constant');
    augmentedMatrix[e - 1].push(Number(constant.children[0].innerText));
  }
  return augmentedMatrix;
}

export function parseLinearEquationToDisplayString() {
  const equationTable = document.querySelector('.equationTable');
  const equations = equationTable.querySelectorAll('.equation-row');
  const variableCount = equations[0].querySelectorAll('.equation-variable');

  let displayString = "\\begin{array}{r}";

  for (let e = 1; e <= equations.length; e++) {
    let equation = equations[e - 1];
    let variables = equations[e - 1].querySelectorAll('.equation-variable');
    let operators = equations[e - 1].querySelectorAll('.equation-operator');
    let char = equations[e - 1].querySelectorAll('.equation-char');
    for (let v = 1; v <= variables.length; v++) {
      let value = Number(variables[v - 1].children[0].innerText)
      displayString += ifDecimalC2Fraction(value ? value : 1);
      displayString += char[v - 1].innerText;
      if (v != variables.length) {
        let operator = operators[v - 1].children[0].selectedOptions[0].innerText;
        if (operator == "x" || operator == "÷") {
          switch (operator) {
            case 'x':
              operator = '\\cdot';
              break;
            case '÷':
              operator = '\\div';
              break;
          }
        }
        displayString += operator;
      }
    }
    let constant = equations[e - 1].querySelector('.equation-constant').children[0].innerText;
    displayString += `= ${ifDecimalC2Fraction(constant)} \\\\`;
  }
  displayString += "\\end{array}";
  return displayString;
}

export function getFibonacciBounds() {
  let output = [];
  let bounds = document.querySelectorAll('.fibonacciInput');

  for (let i = 0; i < bounds.length; i++) {
    output.push(Number(bounds[i].innerText))
  }

  let sort = (array, arrayLength) => {
    if (arrayLength <= 1) {
      return;
    }

    sort(array, arrayLength - 1);

    let prevArray = copy(array);

    let last = array[arrayLength-1];
    let j = arrayLength - 2;

    while (j >= 0 && array[j] > last) {
      array[j+1] = array[j];
      j = j-1;
    }

    array[j+1] = last;

    return array;
  }

  sort(output, output.length)

  return output;
}

export function getDiceInputs() {
  let output = [];
  let bounds = document.querySelectorAll('.diceInput');

  for (let i = 0; i < bounds.length; i++) {
    output.push(Number(bounds[i].innerText))
  }

  return output;
}

export function getSequence() {
  return document.querySelector('.sequenceInput').innerText;
}

export function getNodes() {
  let output = [];

  document.querySelectorAll('.node').forEach((value) => {
    output.push(value.innerText || value.getAttribute('placeholder'));
  });
  return output;
}

export function fibonacci(n) {
  let sqrt5 = Math.sqrt(5);
  let fib_n = ( Math.pow((1 + sqrt5), n) - Math.pow((1-sqrt5), -n)) / ( Math.pow(2, n) * sqrt5 );
  return Math.round(fib_n);
}

export function ifDecimalC2Fraction(x) {
  if (Number.isNaN(Number(x))) {
    return x;
  }
  else {
    x = Number(x);
  }

  if (!Number.isInteger(x)) {
      let newX = new Fraction(x);
      if (newX.d == 1) {
        if (newX.s == -1) {
          x = -Math.abs(newX.n)
        }
        else {
          x = Math.abs(newX.n);
        }
      }
      else {
        if (newX.s == -1) {
          x = `-\\frac{${newX.n}}{${newX.d}}`;
        }
        else {
          x = `\\frac{${newX.n}}{${newX.d}}`;
        }
      }
  }
  return x;
}

export function newExecuteMatrix(rows, cols) {
  // Source: Sergio Abreu; stackoverflow.com;

  // Begin Modification
  const defaultValue = 0;
  // End Modification

  let arr = [];

  // Creates all lines:
  for (let i = 0; i < rows; i++) {
    // Creates an empty line
    arr.push([]);

    // Adds cols to the empty line:
    arr[i].push(new Array(cols));

    for (let j = 0; j < cols; j++) {
        // Initializes:
        arr[i][j] = defaultValue;
    }
  }
  return arr;
}

export function flipSign(x) {
  if (Math.sign(x) == -1) {
      x = Math.abs(x);
  } else {
      x = -Math.abs(x);
  }
  return x;
}

export function ordinal_suffix_of(i) {
  // Source: Salman A; stackoverflow.com
  // Modified to use MathJax superscripting

  let j = i % 10;
  let k = i % 100;

  if (j == 1 && k != 11) {
      return `${i}^{st}`;
  }

  if (j == 2 && k != 12) {
      return `${i}^{nd}`;
  }

  if (j == 3 && k != 13) {
      return `${i}^{rd}`;
  }

  return `${i}^{th}`;
}

export function copy(x) {
  return JSON.parse(JSON.stringify(x));
}

export function getDeterminant(matrix) {
  let rows = matrix.length;
  let columns = matrix[0].length;
  let determinant = 0;

  if (rows != columns) {
    return 0;
  }

  if (rows == 2) {
    let rowsValue = 1;
    let colsValue = 1;
    for (let r = 0; r < rows; r++) {
      rowsValue *= matrix[r][r];
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        if (r != c) {
          colsValue *= matrix[r][c];
        }
      }
    }
    determinant = rowsValue - colsValue;
  }
  else {
    for (let col = 0; col < columns; col++) {
      let tmpMatrix = [];
      for (let i = 0; i < rows - 1; i++) {
        tmpMatrix.push([]);
      }
      let entry = matrix[0][col];
      for (let r = 1; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (c != col) {
            tmpMatrix[r-1].push(matrix[r][c]);
          }
        }
      }

      if (col % 2 == 0) {
        determinant += entry * getDeterminant(tmpMatrix);
      }
      else {
        determinant += -entry * getDeterminant(tmpMatrix);
      }
    }
  }
  return determinant;
}

export function factorial(n) {
  if (n < 0) {
    return -1;
  }
  else if (n == 0) {
    return 1;
  }
  else {
    return (n * factorial(n - 1))
  }
}
