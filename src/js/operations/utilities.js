function newDisplayMatrix(id_num, rows, cols) {
  const matrix = document.createElement('table');
  matrix.className = 'matrix';
  const matrixBody = document.createElement('tbody');
  matrixBody.id = 'matrix-' + id_num;

  for (i = 1; i <= rows; i++) {
      const matrixRow = document.createElement('tr');
      matrixRow.id = 'row-' + i;
      matrixRow.className = 'matrix-row';

      if (i == 1) {
          const matrixCol = document.createElement('td');
          matrixCol.style = 'transform: scale(1.2, '+ rows * 2 +') translateY(-0.8px);';
          matrixCol.rowSpan = rows;
          matrixCol.innerHTML = '(';
          matrixRow.appendChild(matrixCol);
      }

      for (j = 1; j <= cols; j++) {
          const matrixCol = document.createElement('td');
          matrixCol.id = 'column-' + j;
          matrixCol.className = 'matrix-column';

          const matrixInput = document.createElement('input');
          matrixInput.classList.add('matrixInput');
          matrixInput.type = 'number';

          matrixCol.appendChild(matrixInput);
          matrixRow.appendChild(matrixCol);
      }

      if (i == 1) {
          const matrixCol = document.createElement('td');
          matrixCol.style = 'transform: scale(1.2, '+ rows * 2 +') translateY(-0.8px);';
          matrixCol.rowSpan = rows;
          matrixCol.innerHTML = ')';

          matrixRow.appendChild(matrixCol);
      }

      matrixBody.append(matrixRow)
  }

  matrix.append(matrixBody);
  return matrix;
}

function newExecuteMatrix(rows, cols) {
  // Source: Sergio Abreu; stackoverflow.com;

  // Begin Modification
  console.log("Creating new matrix of size: " + rows + "; " + cols + ";");
  const defaultValue = 0;
  // End Modification

  var arr = [];

  // Creates all lines:
  for (var i = 0; i < rows; i++) {
    // Creates an empty line
    arr.push([]);

    // Adds cols to the empty line:
    arr[i].push(new Array(cols));

    for (var j = 0; j < cols; j++) {
        // Initializes:
        arr[i][j] = defaultValue;
    }
  }
  return arr;
}

function newLinearEquations(id_num, numEquations, numVariables) {
	const validVariables="abcdefghijklmnopqrstuvwxyz".split("");
  const table = document.createElement('table');
  table.className = 'equationTable';
  const tableBody = document.createElement('tbody');
  tableBody.id = 'equationBody-' + id_num;
  numEquations = parseInt(numEquations);

  for (var i = 1; i <= numEquations; i++) {
    let tableRow = document.createElement('tr');
    tableRow.id = 'equation-' + i;
    tableRow.className = 'equation-row';

    for (var j = 1; j <= numVariables; j++) {
      let tableInput = document.createElement('td');
      tableInput.id = 'variable-' + j;
      tableInput.className = 'equation-variable';

      let equationInput = document.createElement('input');
      equationInput.classList.add('equationInput');
      equationInput.type = 'number';

     	let tableChar = document.createElement('td');
      tableChar.id = 'char-' + j;
      tableChar.className = 'equation-char';
      let equationChar = validVariables[j-1];

      tableInput.appendChild(equationInput);
      tableChar.innerHTML = equationChar;
      tableRow.appendChild(tableInput);
      tableRow.appendChild(tableChar);

      if (j != numVariables) {
      	let tableSelect = document.createElement('td');
        tableSelect.id = 'operator-' + j;
        tableSelect.classList.add('equation-operator');

        let operatorSelect = document.createElement('select');
        operatorSelect.classList.add('operatorInput');
        let options = [
          {value: 'add', name: '+'},
          {value: 'subtract', name: '-'},
          {value: 'multiply', name: 'x'},
          {value: 'divide', name: '÷'}
        ];

        for (var k = 0; k < options.length; k++) {
          let option = new Option(options[k].name,options[k].value);
          operatorSelect.add(option, undefined);
        }

        tableSelect.appendChild(operatorSelect);
        tableRow.appendChild(tableSelect);
      }
      else {
      	let tableInput = document.createElement('td');
        tableInput.id = 'constant-' + i;
        tableInput.classList.add('equation-constant');

      	let equationInput = document.createElement('input');
        equationInput.classList.add('equationInput');
        equationInput.type = 'number';

        let tableChar = document.createElement('td');
        let equationChar = '=';

        tableInput.appendChild(equationInput);
        tableChar.innerHTML = equationChar;
        tableRow.appendChild(tableChar);
        tableRow.appendChild(tableInput);
      }
    }
    tableBody.append(tableRow);
  }

  table.append(tableBody);
  return table;
}

function getMatrices() {
  const matrices = document.querySelectorAll('.matrix');
  const rows = document.querySelector('.matrix').querySelectorAll('.matrix-row');
  const cols = document.querySelector('.matrix-row').querySelectorAll('.matrix-column');
  var dictMatrices = [];

  for (var m = 1; m <= matrices.length; m++) {
    console.log("matrix-" + m);
    const matrix = document.querySelector('#matrix-' + m);
    var newMatrix = newExecuteMatrix(rows.length, cols.length);
    for (var r = 1; r <= rows.length; r++) {
      console.log("row-" + r);
      var row = matrix.querySelector('#row-' + r);
      for (c = 1; c <= cols.length; c++) {
        console.log("column-" + c);
        var column = row.querySelector('#column-' + c);
        newMatrix[r - 1][c - 1] = Number(column.children[0].value);
      }
    }
    dictMatrices[m-1] = newMatrix;
  }
  return dictMatrices;
}

function getLinearEquationsAsAugmentedMatrix() {
  const equationTable = document.querySelector('.equationTable');
  const equations = equationTable.querySelectorAll('.equation-row');
  const variableCount = equations[0].querySelectorAll('.equation-variable');

  var augmentedMatrix = newExecuteMatrix(equations.length, variableCount.length);

  for (var e = 1; e <= equations.length; e++) {
    console.log("equation-" + e);
    var equation = equations[e - 1];
    var variables = equations[e - 1].querySelectorAll('.equation-variable');
    var operators = equations[e - 1].querySelectorAll('.equation-operator');
    for (v = 1; v <= variables.length; v++) {
        console.log("variable-" + v);
        var variable = variables[v - 1];
        if (v != 1) {
          var variableID = variable.id.split('-')[1];
          var operatorIndex = variableID - 1;
          var operatorsArray = Array.from(operators);
          var operator = operatorsArray.find(element => element.id.toString().includes(operatorIndex));
          if (operator.children[0].selectedOptions[0].innerText == "-") {
            augmentedMatrix[e - 1][v - 1] = -Number(variable.children[0].value);
          }
          else {
            augmentedMatrix[e - 1][v - 1] = Number(variable.children[0].value);
          }
        }
        else {
          augmentedMatrix[e - 1][v - 1] = Number(variable.children[0].value);
        }
    }
    var constant = equations[e - 1].querySelector('.equation-constant');
    augmentedMatrix[e - 1].push(Number(constant.children[0].value));
  }
  return augmentedMatrix;
}

function parseLinearEquationToDisplayString() {
  const equationTable = document.querySelector('.equationTable');
  const equations = equationTable.querySelectorAll('.equation-row');
  const variableCount = equations[0].querySelectorAll('.equation-variable');

  var displayString = "$$\\begin{array}{r}";

  for (var e = 1; e <= equations.length; e++) {
    console.log("equation-" + e);
    var equation = equations[e - 1];
    var variables = equations[e - 1].querySelectorAll('.equation-variable');
    var operators = equations[e - 1].querySelectorAll('.equation-operator');
    var char = equations[e - 1].querySelectorAll('.equation-char');
    for (v = 1; v <= variables.length; v++) {
      console.log("variable-" + v);
      console.log("char-" + v);
      displayString += ifDecimalC2Fraction(Number(variables[v - 1].children[0].value));
      displayString += char[v - 1].innerText;
      if (v != variables.length) {
        var operator = operators[v - 1].children[0].selectedOptions[0].innerText;
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
    var constant = equations[e - 1].querySelector('.equation-constant').children[0].value;
    displayString += " = " + ifDecimalC2Fraction(constant) + "\\\\";
  }
  displayString += "\\end{array}";
  return displayString;
}

function flipSign(x) {
  if (Math.sign(x) == -1) {
      x = Math.abs(x);
  } else {
      x = -Math.abs(x);
  }
  return x;
}

function ifDecimalC2Fraction(x) {
  var x = Number(x);
  if (!Number.isInteger(x)) {
      var newX = new Fraction(x);
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
          x = "-\\frac{" + newX.n + "}{" + newX.d + "}";
        }
        else {
          x = "\\frac{" + newX.n + "}{" + newX.d + "}";
        }
      }
  }
  return x;
}
