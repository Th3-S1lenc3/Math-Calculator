function displayOperation_multiplyMatrices() {
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
  operator.innerHTML = '$$\\cdot$$';

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

function displayoperation_scalarMultiplication() {
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
  operator.innerHTML = '$$\\cdot$$';

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

function executeOperation_multiplyMatrices(showSteps) {
  const destination = document.getElementById("execute-operation-container-inner-output");
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

  if (matrix1_rows != matrix2_cols || matrix1_cols != matrix2_rows) {
    destination.innerHTML = "Invalid Operation. To multiply matrices they must have the same number of rows as columns.";
    return;
  }

  var newMatrix = newExecuteMatrix(rows, cols);
  newMatrix[0][0] = matrix1[0][0] * matrix2[0][0] + matrix1[0][1] * matrix2[1][0];
  newMatrix[0][1] = matrix1[0][0] * matrix2[0][1] + matrix1[0][1] * matrix2[1][1];
  newMatrix[1][0] = matrix1[1][0] * matrix2[0][0] + matrix1[1][1] * matrix2[1][0];
  newMatrix[1][1] = matrix1[1][0] * matrix2[0][1] + matrix1[1][1] * matrix2[1][1];

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
  const destination = document.getElementById("execute-operation-container-inner-output");
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
