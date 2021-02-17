function displayOperation_divideMatrices() {
  const executeOperationContainer = document.getElementById("execute-operation-container");
  const containerInner = document.createElement('div');
  containerInner.id = "execute-operation-container-inner";
  containerInner.classList.add("execute-operation-container-inner");

  const containerInner_Input = document.createElement('div');
  containerInner_Input.id = "execute-operation-container-inner-input";
  containerInner_Input.classList.add("operationInput", "border", "border-secondary", "rounded", "float-left");

  const containerInner_Output = document.createElement('div');
  containerInner_Output.id = "execute-operation-container-inner-output";
  containerInner_Output.classList.add("operationOutput", "border", "border-secondary", "rounded", "float-right");

  const matrix1 = newDisplayMatrix(1);

  const matrix2 = newDisplayMatrix(2);

  const operator = document.createElement('p');
  operator.className = "specialOperator"
  operator.innerHTML = '$$\\div$$';

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  containerInner_Input.append(matrix1);
  containerInner_Input.append(operator);
  containerInner_Input.append(matrix2);
  containerInner_Input.append(btnExecute);

  containerInner.append(containerInner_Input);
  containerInner.append(containerInner_Output);

  executeOperationContainer.append(containerInner)
  MathJax.typeset();
}

function displayOperation_scalarDivision() {
  const executeOperationContainer = document.getElementById("execute-operation-container");
  const containerInner = document.createElement('div');
  containerInner.id = "execute-operation-container-inner";
  containerInner.classList.add("execute-operation-container-inner");

  const containerInner_Input = document.createElement('div');
  containerInner_Input.id = "execute-operation-container-inner-input";
  containerInner_Input.classList.add("operationInput", "border", "border-secondary", "rounded", "float-left");

  const containerInner_Output = document.createElement('div');
  containerInner_Output.id = "execute-operation-container-inner-output";
  containerInner_Output.classList.add("operationOutput", "border", "border-secondary", "rounded", "float-right");

  const matrix1 = newDisplayMatrix(1);

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

  containerInner_Input.append(scalarInput);
  containerInner_Input.append(operator);
  containerInner_Input.append(matrix1);
  containerInner_Input.append(btnExecute);

  containerInner.append(containerInner_Input);
  containerInner.append(containerInner_Output);

  executeOperationContainer.append(containerInner)
  MathJax.typeset();
}

function executeOperation_divideMatrices(showSteps) {
  const destination = document.getElementById("execute-operation-container-inner-output");
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

  var newMatrix = newExecuteMatrix(rows, cols);

  // Calculate

  var inverse_Stage1 = newExecuteMatrix(2, 2);
  inverse_Stage1[0][0] = matrix2[1][1];
  inverse_Stage1[0][1] = matrix2[0][1];
  inverse_Stage1[1][0] = matrix2[1][0];
  inverse_Stage1[1][1] = matrix2[0][0];

  // Invert matrix2

  const determinant = matrix2[0][0] * matrix2[1][1] - matrix2[0][1] * matrix2[1][0];

  var inverse_matrix2 = newExecuteMatrix(2, 2);

  inverse_matrix2[0][0] = matrix2[1][1];
  inverse_matrix2[0][1] = flipSign(matrix2[0][1]);
  inverse_matrix2[1][0] = flipSign(matrix2[1][0]);
  inverse_matrix2[1][1] = matrix2[0][0];

  // Calcutae 1/D * matrix2
  var newMatrix2 = newExecuteMatrix(2, 2);

  newMatrix2[0][0] = (1 / determinant) * inverse_matrix2[0][0];
  newMatrix2[0][1] = (1 / determinant) * inverse_matrix2[0][1];
  newMatrix2[1][0] = (1 / determinant) * inverse_matrix2[1][0];
  newMatrix2[1][1] = (1 / determinant) * inverse_matrix2[1][1];

  // Calculate new matrix
  var newMatrix = newExecuteMatrix(rows, cols);
  newMatrix[0][0] = matrix1[0][0] * newMatrix2[0][0] + matrix1[0][1] * newMatrix2[1][0];
  newMatrix[0][1] = matrix1[0][0] * newMatrix2[0][1] + matrix1[0][1] * newMatrix2[1][1];
  newMatrix[1][0] = matrix1[1][0] * newMatrix2[0][0] + matrix1[1][1] * newMatrix2[1][0];
  newMatrix[1][1] = matrix1[1][0] * newMatrix2[0][1] + matrix1[1][1] * newMatrix2[1][1];

  // Check if original matrix * inverse matrix = identity matrix

  var verificationMatrix = newExecuteMatrix(2, 2);
  verificationMatrix[0][0] = newMatrix[0][0] * matrix2[0][0] + newMatrix[0][1] * matrix2[1][0];
  verificationMatrix[0][1] = newMatrix[0][0] * matrix2[0][1] + newMatrix[0][1] * matrix2[1][1];
  verificationMatrix[1][0] = newMatrix[1][0] * matrix2[0][0] + newMatrix[1][1] * matrix2[1][0];
  verificationMatrix[1][1] = newMatrix[1][0] * matrix2[0][1] + newMatrix[1][1] * matrix2[1][1];

  if (verificationMatrix[0][0] != matrix1[0][0] || verificationMatrix[0][1] != matrix1[0][1] || verificationMatrix[1][0] != matrix1[1][0] || verificationMatrix[1][1] != matrix1[1][1]) {
      console.info(verificationMatrix);
      throw "Inverse matrix did not return identity matrix";
  }

  // Show Output

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
      destination.innerHTML += "$$\r Find\\ determinant\\ of\\ the\\ second\\ matrix: $$";
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
      destination.innerHTML += "$$\r Switch\\ the\\ positions\\ of\\ the\\ elements\\ in\\ the\\ top\\ left\\ and\\ bottom\\ right: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\to";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(inverse_Stage1[0][0]) + "&" + ifDecimalC2Fraction(inverse_Stage1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(inverse_Stage1[1][0]) + "&" + ifDecimalC2Fraction(inverse_Stage1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Invert\\ the\\ elements\\ in\\ the\\ top\\ right\\ and\\ bottom\\ left: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(inverse_Stage1[0][0]) + "&" + ifDecimalC2Fraction(inverse_Stage1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(inverse_Stage1[1][0]) + "&" + ifDecimalC2Fraction(inverse_Stage1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\to";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(inverse_matrix2[0][0]) + "&" + ifDecimalC2Fraction(inverse_matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(inverse_matrix2[1][0]) + "&" + ifDecimalC2Fraction(inverse_matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Multiply\\ resultant\\ matrix\\ by\\ reciprocal\\ of\\ determinant: $$";
      destination.innerHTML += "$$\\frac{1}{" + ifDecimalC2Fraction(determinant) + "} \\cdot \\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(inverse_matrix2[0][0]) + "&" + ifDecimalC2Fraction(inverse_matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(inverse_matrix2[1][0]) + "&" + ifDecimalC2Fraction(inverse_matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix2[0][0]) + "&" + ifDecimalC2Fraction(newMatrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix2[1][0]) + "&" + ifDecimalC2Fraction(newMatrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Multiply\\ the\\ rows\\ of\\ the\\ first\\ matrix\\ by\\ the\\ columns\\ of\\ the\\ new\\ matrix: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\cdot ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix2[0][0]) + "&" + ifDecimalC2Fraction(newMatrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix2[1][0]) + "&" + ifDecimalC2Fraction(newMatrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Simplify\\ each\\ element: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][0]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[0][1]) + "+";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][1]) + "\\cdot" + ifDecimalC2Fraction(newMatrix2[1][1]);
      destination.innerHTML += "\\end{pmatrix} = ";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
      destination.innerHTML += "$$\r Confirm\\ the\\ inverse\\ is\\ correct: $$";
      destination.innerHTML += "$$\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "&" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "&" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} \\cdot";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[0][0]) + "&" + ifDecimalC2Fraction(matrix2[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix2[1][0]) + "&" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}"
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+" + ifDecimalC2Fraction(newMatrix[0][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][0]) + "+" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][0]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "\\cdot" + ifDecimalC2Fraction(matrix2[0][1]) + "+" + ifDecimalC2Fraction(newMatrix[1][1]) + "\\cdot" + ifDecimalC2Fraction(matrix2[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(verificationMatrix[0][0]) + "&" + ifDecimalC2Fraction(verificationMatrix[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(verificationMatrix[1][0]) + "&" + ifDecimalC2Fraction(verificationMatrix[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix}$$";
  }

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
  const destination = document.getElementById("execute-operation-container-inner-output");
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
      destination.innerHTML += "$$ " + scalarNormal + "\\div";
      destination.innerHTML += "\\begin{pmatrix}";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[0][0]) + "&" + ifDecimalC2Fraction(matrix1[0][1]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(matrix1[1][0]) + "&" + ifDecimalC2Fraction(matrix1[1][1]) + "\\\\";
      destination.innerHTML += "\\end{pmatrix} =";
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
  destination.innerHTML += "$$ " + ifDecimalC2Fraction(scalarNormal) + "\\div";
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
