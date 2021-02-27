function displayOperation_invertMatrix() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix = newDisplayMatrix(1, 2, 2);

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(matrix);
  operationInput.append(btnExecute);
}

function executeOperation_invertMatrix(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  // Get data

  const matrices = getMatrices();

  const matrix = matrices[0];

  const rows = matrix.length;
  const cols = matrix[0].length;

  var newMatrix = newExecuteMatrix(rows, cols);

  if (rows != cols) {
    destination.innerHTML += "Invalid Operation. To invert a matrix it must be square (IE. Rows = Cols).";
    return;
  }

  // Calculate

  // Check determinant != 0

  const determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  if (showSteps) {
    destination.innerHTML += "$$\r Check\\ if\\ determinant\\ of\\ the\\ matrix\\ is\\ not\\ 0: $$";
    destination.innerHTML += "$$A=";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} $$";
    destination.innerHTML += "$$det(A)=";
    destination.innerHTML += "\\begin{bmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{bmatrix} $$";
    destination.innerHTML += "$$det(A) = " + ifDecimalC2Fraction(matrix[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix[1][1]);
    destination.innerHTML += "-" + ifDecimalC2Fraction(matrix[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix[1][0]) + "$$";
    destination.innerHTML += "$$det(A)=" + ifDecimalC2Fraction(determinant) + "$$";
  }

  if (determinant == 0) {
    destination.innerHTML += "$$\r The\\ determinant\\ of\\ the\\ given\\ matrix\\ is\\ 0\\ therefore\\ the\\ inverse\\ cannot\\ be\\ determined.$$";
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
      augmentedMatrix[i][j] = matrix[i][j];
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
    destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
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

  newMatrix[0][0] = augmentedMatrix[0][2];
  newMatrix[0][1] = augmentedMatrix[0][3];
  newMatrix[1][0] = augmentedMatrix[1][2];
  newMatrix[1][1] = augmentedMatrix[1][3];

  // Verify A * A^-1 = I
  var identityMatrix = newExecuteMatrix(rows, cols);
  identityMatrix[0][0] = matrix[0][0] * newMatrix[0][0] + matrix[0][1] * newMatrix[1][0];
  identityMatrix[0][1] = matrix[0][0] * newMatrix[0][1] + matrix[0][1] * newMatrix[1][1];
  identityMatrix[1][0] = matrix[1][0] * newMatrix[0][0] + matrix[1][1] * newMatrix[1][0];
  identityMatrix[1][1] = matrix[1][0] * newMatrix[0][1] + matrix[1][1] * newMatrix[1][1];

  if (identityMatrix[0][0] != 1 && identityMatrix[0][1] != 0 && identityMatrix[1][0] != 0 && identityMatrix[1][1] != 1) {
    destination.innerHTML += "$$\r Original\\ Matrix \\cdot Inverted\\ Matrix\\ did\\ not\\ return\\ identity\\ matrix.$$"
  }
  else if (showSteps) {
    destination.innerHTML += "$$\r Verify\\ the\\ inverted\\ matrix\\ is\\ correct: $$";
    destination.innerHTML += "$$\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\cdot ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} =";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(identityMatrix[0][0]) + "&" + ifDecimalC2Fraction(identityMatrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(identityMatrix[1][0]) + "&" + ifDecimalC2Fraction(identityMatrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix}$$";
  }

  destination.innerHTML += "$$\r Result: $$"
  destination.innerHTML += "$$\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} \\xrightarrow{\\text{Invert}}";
  destination.innerHTML += "\\left(\\begin{array}{rr|rr}";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{array}\\right)$$";
  console.info(augmentedMatrix);
  MathJax.typeset();
}
