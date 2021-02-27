function displayOperation_transposeMatrix() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix = newDisplayMatrix(1, 2, 2);

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(matrix);
  operationInput.append(btnExecute);
}

function executeOperation_transposeMatrix(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  // Get Data

  const matrices = getMatrices();

  const matrix = matrices[0];

  const rows = matrix.length;
  const cols = matrix[0].length;

  // Calculate

  var transposedMatrix = newExecuteMatrix(rows, cols);

  if (showSteps) {
    destination.innerHTML += "$$ A = ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} $$";
  }

  for (var row = 0; row < rows; row++) {
    for (var column = 0; column < cols; column++) {
      transposedMatrix[column][row] = matrix[row][column];
      if (showSteps) {
        destination.innerHTML += "$$\r A_{"+ (row + 1) + (column + 1) +"}\\ becomes\\ A^{T}_{"+ (column + 1) + (row + 1) +"}$$";
        destination.innerHTML += "$$\\begin{pmatrix}";
        destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
        destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
        destination.innerHTML += "\\end{pmatrix} \\to";
        destination.innerHTML += "\\begin{pmatrix}";
        destination.innerHTML += ifDecimalC2Fraction(transposedMatrix[0][0]) + "&" + ifDecimalC2Fraction(transposedMatrix[0][1]) + "\\\\";
        destination.innerHTML += ifDecimalC2Fraction(transposedMatrix[1][0]) + "&" + ifDecimalC2Fraction(transposedMatrix[1][1]) + "\\\\";
        destination.innerHTML += "\\end{pmatrix} $$";
      }
    }
  }

  destination.innerHTML += "$$\r Result: $$"
  destination.innerHTML += "$$\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix[0][0]) + "&" + ifDecimalC2Fraction(matrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix[1][0]) + "&" + ifDecimalC2Fraction(matrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} \\xrightarrow{\\text{Transpose}}";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(transposedMatrix[0][0]) + "&" + ifDecimalC2Fraction(transposedMatrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(transposedMatrix[1][0]) + "&" + ifDecimalC2Fraction(transposedMatrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} $$";
  MathJax.typeset();
}
