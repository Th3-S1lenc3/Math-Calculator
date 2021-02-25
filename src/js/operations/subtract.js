function displayOperation_subtractMatrices() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix1 = newDisplayMatrix(1, 2, 2);

  const matrix2 = newDisplayMatrix(2, 2, 2);

  const operator = document.createElement('p');
  operator.className = "operator"
  operator.innerHTML = '-';

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(matrix1);
  operationInput.append(operator);
  operationInput.append(matrix2);
  operationInput.append(btnExecute);
}

function executeOperation_subtractMatrices(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  const matrices = getMatrices();

  const matrix1 = matrices[0];
  const matrix2 = matrices[1];

  const rows = matrix1.length;
  const cols = matrix1[0].length;

  const matrix1_rows = matrix1.length;
  const matrix1_cols = matrix1[0].length;

  const matrix2_rows = matrix2.length;
  const matrix2_cols = matrix2[0].length;

  if (matrix1_rows != matrix2_rows || matrix1_cols != matrix2_cols) {
    destination.innerHTML = "Invalid Operation. To subtract matrices they must be the same dimension.";
    return;
  }

  var newMatrix = newExecuteMatrix(rows, cols);

  for (r = 0; r < rows; r++) {
      for (c = 0; c < cols; c++) {
          console.log("Row: " + r + "; Column: " + c)
          newMatrix[r][c] = matrix1[r][c] - matrix2[r][c];
      }
  }

  if (showSteps) {
      destination.innerHTML += "$$\r Subtract\\ the\\ elements\\ in\\ the\\ matching\\ positions: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} - ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "-" + ifDecimalC2Fraction(matrix2[0][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "-" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "-" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "-" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Simplify\\ each\\ element: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "-" + ifDecimalC2Fraction(matrix2[0][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "-" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "-" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "-" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
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
  destination.innerHTML += "\\end{pmatrix} - ";
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
