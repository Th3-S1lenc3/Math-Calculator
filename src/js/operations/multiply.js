function displayOperation_multiplyMatrices() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix1 = newDisplayMatrix(1, 2, 2);

  const matrix2 = newDisplayMatrix(2, 2, 2);

  const operator = document.createElement('p');
  operator.className = "specialOperator"
  operator.innerHTML = '$$\\cdot$$';

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

function displayoperation_scalarMultiplication() {
  const operationInput = document.getElementsByClassName('operationInput')[0];

  const matrix1 = newDisplayMatrix(1, 2, 2);

  const scalarInput = document.createElement('input');
  scalarInput.id = 'scalarInput';
  scalarInput.classList.add('scalarInput', 'ml-1');
  scalarInput.type = 'number';

  const operator = document.createElement('p');
  operator.className = "specialOperator"
  operator.innerHTML = '$$\\cdot$$';

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(scalarInput);
  operationInput.append(operator);
  operationInput.append(matrix1);
  operationInput.append(btnExecute);
  MathJax.typeset();
}

function executeOperation_multiplyMatrices(showSteps) {
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

  // Check if we can multiply
  if (matrix1_cols != matrix2_rows) {
    destination.innerHTML = "Invalid Operation. To multiply matrices, the number of columns in the first matrix must equal the rows of the second matrix";
    return;
  }

  // New matrix = rows of matrix 1 x columns of matrix 2

  var newMatrix = [];
  for (let i = 0; i < matrix1_rows; i++) {
    newMatrix.push([]);
  }

  var tmpValue;
  for (let r = 0; r < matrix1_rows; r++) {
    console.log(tmpValue);
    tmpValue = 0;
    console.log(tmpValue);
    for (let col = 0; col < matrix2_cols; col++) {
      tmpValue = 0;
      for (let c = 0; c < matrix2_cols; c++) {
        tmpValue += matrix1[r][c] * matrix2[c][col];
        console.log("tmpValue: " + tmpValue);
      }
      newMatrix[r].push(tmpValue);
    }
  }
  console.info(newMatrix);

  if (showSteps) {
      destination.innerHTML += "$$\r Multiply\\ the\\ rows\\ of\\ the\\ first\\ matrix\\ by\\ the\\ columns\\ of\\ the\\ second\\ matrix: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\cdot ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Simplify\\ each\\ element: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]);
      destination.innerHTML += "\\end{pmatrix} = ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
  }

  destination.innerHTML += "$$\r Result: $$";
  destination.innerHTML += "$$\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} \\cdot ";
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

function executeOperation_scalarMultiplication(showSteps) {
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";

  const matrices = getMatrices();

  const matrix1 = matrices[0];
  const scalar = document.getElementById('scalarInput').value;

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
  destination.innerHTML += "$$ " + ifDecimalC2Fraction(scalar) + "\\cdot";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix} = ";
  destination.innerHTML += "\\begin{pmatrix}";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
  destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
  destination.innerHTML += "\\end{pmatrix}$$";

  MathJax.typeset();
}
