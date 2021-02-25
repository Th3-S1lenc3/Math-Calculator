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
      x = "\\frac{" + newX.n + "}{" + newX.d + "}";
  }
  return x;
}
