function displayOperation_divideMatrices() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix1 = newDisplayMatrix(1, 2, 2);

  const matrix2 = newDisplayMatrix(2, 2, 2);

  const operator = document.createElement('p');
  operator.className = "specialOperator"
  operator.innerHTML = '$$\\div$$';

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(matrix1);
  operationInput.append(operator);
  operationInput.append(matrix2);
  operationInput.append(btnExecute);
  MathJax.typeset();
}

function displayOperation_scalarDivision() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix1 = newDisplayMatrix(1, 2, 2);

  const scalarInput = document.createElement('input');
  scalarInput.id = 'scalarInput';
  scalarInput.classList.add('scalarInput');
  scalarInput.type = 'number';

  const operator = document.createElement('p');
  operator.className = "specialOperator"
  operator.innerHTML = '$$\\div$$';

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(matrix1);
  operationInput.append(operator);
  operationInput.append(scalarInput);
  operationInput.append(btnExecute);
  MathJax.typeset();
}

function executeOperation_divideMatrices(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  // Get Data

  const matrices = getMatrices();

  const matrix1 = matrices[0];
  const matrix2 = matrices[1];

  const rows = matrix1.length;
  const cols = matrix1[0].length;

  const matrix1_rows = matrix1.length;
  const matrix1_cols = matrix1[0].length;

  const matrix2_rows = matrix2.length;
  const matrix2_cols = matrix2[0].length;

  if (matrix1_rows != matrix2_cols || matrix1_cols != matrix2_rows) {
    destination.innerHTML = "Invalid Operation. To divide matrices they must have the same number of rows as columns.";
    return;
  }

  // Calculate

  if (showSteps) {
    destination.innerHTML += "$$\r Convert\\ to\\ multiplication:\\ $$";
    destination.innerHTML += "$$\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\div ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} = ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\cdot ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix}^{-1} $$";
  }


  // Invert Matrix
  // Check determinant != 0

  const determinant = matrix2[0][0] * matrix2[1][1] - matrix2[0][1] * matrix2[1][0];

  if (showSteps) {
    destination.innerHTML += "$$\r Check\\ if\\ determinant\\ of\\ the\\ matrix\\ is\\ not\\ 0: $$";
    destination.innerHTML += "$$B=";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} $$";
    destination.innerHTML += "$$det(B)=";
    destination.innerHTML += "\\begin{bmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{bmatrix} $$";
    destination.innerHTML += "$$det(B) = " + ifDecimalC2Fraction(matrix2[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]);
    destination.innerHTML += "-" + ifDecimalC2Fraction(matrix2[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "$$";
    destination.innerHTML += "$$det(B)=" + ifDecimalC2Fraction(determinant) + "$$";
  }

  if (determinant == 0) {
    destination.innerHTML = "$$\r The\\ determinant\\ of\\ the\\ given\\ matrix\\ is\\ 0\\ therefore\\ the\\ inverse\\ cannot\\ be\\ determined.$$";
    MathJax.typeset();
    return;
  }
  else if (showSteps) {
    destination.innerHTML += "$$\r Determinant\\ is\\ not\\ 0\\ so\\ an\\ inverse\\ exists.$$";
  }


  var augmentedMatrix = [];
  const newCols = cols * 2;

  // Fill augmentedMatrix
  for (var i = 0; i < rows; i++) {
    augmentedMatrix.push([]);
    augmentedMatrix[i].push(new Array(newCols));

    for (var j = 0; j < cols; j++) {
      augmentedMatrix[i][j] = matrix2[i][j];
    }

    for (var k = cols; k < newCols; k++) {
      var idenCols = k - cols;
      if (idenCols == i) {
        augmentedMatrix[i][k] = 1
      }
      else {
        augmentedMatrix[i][k] = 0
      }
    }
  }

  if (showSteps) {
    destination.innerHTML += "$$\r Augment\\ matrix\\ with\\ the\\ identity\\ matrix: $$";
    destination.innerHTML += "$$\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\xrightarrow{\\text{Augment}}";
    destination.innerHTML += "\\left[\\begin{array}{rr|rr}";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][3]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][3]) + "\\\\";
    destination.innerHTML += "\\end{array}\\right]$$";
  }

  // Begin gaussian elimination on augmentedMatrix
  // Thanks to reshish.com for helping prove this is correct

  for (var column = 0; column < cols; column++){
    var entry = 1 / augmentedMatrix[column][column];
    console.log("1 / " + augmentedMatrix[column][column] + " = " + entry);
    if (showSteps) {
      destination.innerHTML += "$$\r R_{"+ (column + 1) +"} \\to "+ ifDecimalC2Fraction(1 / augmentedMatrix[column][column]) +" \\cdot R_{"+ (column + 1) +"}$$";
      destination.innerHTML += "$$\\left[\\begin{array}{rr|rr}";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][3]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][3]) + "\\\\";
      destination.innerHTML += "\\end{array}\\right] \\to";
    }
    for (var col = column; col < newCols; col++ ) {
      console.log("Before: " + augmentedMatrix[column][col]);
      augmentedMatrix[column][col] = entry * augmentedMatrix[column][col];
      console.log("After: " + augmentedMatrix[column][col]);
    }

    if (showSteps) {
      destination.innerHTML += "\\left[\\begin{array}{rr|rr}";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][3]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][3]) + "\\\\";
      destination.innerHTML += "\\end{array}\\right]$$";
    }

    for (var row = 0; row < rows; row++) {
      if (row != column) {
        var entry = flipSign(augmentedMatrix[row][column]);
        console.log(entry);
        if (showSteps) {
          destination.innerHTML += "$$\r R_{"+ (row + 1) +"} \\to " + ifDecimalC2Fraction(entry) + " \\cdot R_{"+ (column + 1) +"} + R_{"+ (row + 1) +"}$$";
          destination.innerHTML += "$$\\left[\\begin{array}{rr|rr}";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][3]) + "\\\\";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][3]) + "\\\\";
          destination.innerHTML += "\\end{array}\\right] \\to";
        }
        for (var col = column; col < newCols; col++ ) {
          console.log("Before: " + augmentedMatrix[row][col]);
          augmentedMatrix[row][col] = (entry * augmentedMatrix[column][col]) + augmentedMatrix[row][col];
          console.log("After: " + augmentedMatrix[row][col]);
        }

        if (showSteps) {
          destination.innerHTML += "\\left[\\begin{array}{rr|rr}";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][3]) + "\\\\";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][3]) + "\\\\";
          destination.innerHTML += "\\end{array}\\right]$$";
        }
      }
    }
  }

  var invertedMatrix = newExecuteMatrix(rows,cols);
  invertedMatrix[0][0] = augmentedMatrix[0][2];
  invertedMatrix[0][1] = augmentedMatrix[0][3];
  invertedMatrix[1][0] = augmentedMatrix[1][2];
  invertedMatrix[1][1] = augmentedMatrix[1][3];

  // Verify A * A^-1 = I
  var identityMatrix = newExecuteMatrix(rows, cols);
  identityMatrix[0][0] = matrix2[0][0] * invertedMatrix[0][0] + matrix2[0][1] * invertedMatrix[1][0];
  identityMatrix[0][1] = matrix2[0][0] * invertedMatrix[0][1] + matrix2[0][1] * invertedMatrix[1][1];
  identityMatrix[1][0] = matrix2[1][0] * invertedMatrix[0][0] + matrix2[1][1] * invertedMatrix[1][0];
  identityMatrix[1][1] = matrix2[1][0] * invertedMatrix[0][1] + matrix2[1][1] * invertedMatrix[1][1];

  if (identityMatrix[0][0] != 1 && identityMatrix[0][1] != 0 && identityMatrix[1][0] != 0 && identityMatrix[1][1] != 1) {
    destination.innerHTML += "$$\r Math\\ Error.\\ Matrix\\ B \\cdot Inverted\\ Matrix\\ did\\ not\\ return\\ identity\\ matrix.$$";
    MathJax.typeset();
    return;
  }
  else if (showSteps) {
    destination.innerHTML += "$$\r Verify\\ the\\ inverted\\ matrix\\ is\\ correct: $$";
    destination.innerHTML += "$$\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\cdot ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(invertedMatrix[0][0]) + "&" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(invertedMatrix[1][0]) + "&" + ifDecimalC2Fraction(invertedMatrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} =";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(identityMatrix[0][0]) + "&" + ifDecimalC2Fraction(identityMatrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(identityMatrix[1][0]) + "&" + ifDecimalC2Fraction(identityMatrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix}$$";
  }

  // Multiply A * B^-1
  var newMatrix = newExecuteMatrix(rows, cols);
  newMatrix[0][0] = matrix1[0][0] * invertedMatrix[0][0] + matrix1[0][1] * invertedMatrix[1][0];
  newMatrix[0][1] = matrix1[0][0] * invertedMatrix[0][1] + matrix1[0][1] * invertedMatrix[1][1];
  newMatrix[1][0] = matrix1[1][0] * invertedMatrix[0][0] + matrix1[1][1] * invertedMatrix[1][0];
  newMatrix[1][1] = matrix1[1][0] * invertedMatrix[0][1] + matrix1[1][1] * invertedMatrix[1][1];

  if (showSteps) {
      destination.innerHTML += "$$\r Multiply\\ the\\ rows\\ of\\ the\\ first\\ matrix\\ by\\ the\\ columns\\ of\\ the\\ inverted\\ matrix: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\cdot ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(invertedMatrix[0][0]) + "&" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(invertedMatrix[1][0]) + "&" + ifDecimalC2Fraction(invertedMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Simplify\\ each\\ element: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(invertedMatrix[1][1]);
      destination.innerHTML += "\\end{pmatrix} = ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
  }

  // Show Output
  destination.innerHTML += "$$\r Result: $$";
  destination.innerHTML += "$$\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} \\div ";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} = ";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix}$$";

  MathJax.typeset();
}

function executeOperation_scalarDivision(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  const matrices = getMatrices();

  const matrix1 = matrices[0];
  const scalarNormal = document.getElementById('scalarInput').value;
  const scalar = 1 / scalarNormal;

  const rows = matrix1.length
  const cols = matrix1[0].length

  var newMatrix = newExecuteMatrix(rows, cols);

  for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
          console.log("Row: " + r + "; Column: " + c)
          newMatrix[r][c] = matrix1[r][c] * scalar;
      }
  }

  if (showSteps) {
      destination.innerHTML += "$$\r Convert\\ to\\ multiplication: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\div";
      destination.innerHTML += ifDecimalC2Fraction(scalarNormal) + " = "
      destination.innerHTML += ifDecimalC2Fraction(scalarNormal) + "^{-1} \\cdot";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Multiply\\ each\\ element\\ of\\ the\\ matrix\\ by\\ the\\ scalar: $$";
      destination.innerHTML += "$$ " + ifDecimalC2Fraction(scalar) + "\\cdot";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[0][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Simplify\\ each\\ element: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[0][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(scalar) + "\\cdot" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
  }

  destination.innerHTML += "$$\r Result: $$";
  destination.innerHTML += "$$\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} \\div ";
  destination.innerHTML += ifDecimalC2Fraction(scalarNormal) + " = ";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix}$$";

  MathJax.typeset();
}
