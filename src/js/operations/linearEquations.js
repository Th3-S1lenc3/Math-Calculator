function displayOperation_linearEquations() {
  const operationInput = document.getElementsByClassName('operationInput')[0];
  const equationCount = 2;

  const equations = newLinearEquations(1, 2, 2);

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(equations);
  operationInput.append(btnExecute);
  MathJax.typeset();
}

function executeOperation_linearEquations(showSteps) {
  console.log("Linear Equations");
  const destination = document.getElementsByClassName("operationOutput")[0];
  destination.innerHTML = "";


  // Get Data

  var matrix = getLinearEquationsAsAugmentedMatrix();
  var augmentedMatrix = getLinearEquationsAsAugmentedMatrix();
  const rows = augmentedMatrix.length;
  const actualColumns = augmentedMatrix[0].length;
  const columns = actualColumns - 1;
  const equationRow = document.querySelector('.equation-row');
  const charCount = equationRow.querySelectorAll('.equation-char');
  const operatorCount = equationRow.querySelectorAll('.equation-operator');
  var newMatrix = newExecuteMatrix(rows, actualColumns - columns);

  if (rows != columns) {
    destination.innerHTML += "Invalid Operation. To perform this operation there should be the same number of rows as unknowns (X, Y, Z, etc.).";
    MathJax.typeset();
    return;
  }

  // Calculate
  if (showSteps) {
    destination.innerHTML += "$$\r Put\\ equations\\ into\\ augmented\\ matrix: $$";
    destination.innerHTML += parseLinearEquationToDisplayString() + " \\to";
    destination.innerHTML += "\\left[\\begin{array}{rr|r}";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
    destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "\\\\";
    destination.innerHTML += "\\end{array}\\right]$$";
  }

  // Begin gaussian elimination on augmentedMatrix
  // Thanks to reshish.com for helping prove this is correct

  for (var column = 0; column < columns; column++){
    var entry = 1 / augmentedMatrix[column][column];
    console.log("1 / " + augmentedMatrix[column][column] + " = " + entry);
    if (showSteps) {
      destination.innerHTML += "$$\r R_{"+ (column + 1) +"} \\to "+ ifDecimalC2Fraction(1 / augmentedMatrix[column][column]) +" \\cdot R_{"+ (column + 1) +"}$$";
      destination.innerHTML += "$$\\left[\\begin{array}{rr|r}";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "\\\\";
      destination.innerHTML += "\\end{array}\\right] \\to";
    }
    for (var col = column; col < actualColumns; col++ ) {
      console.log("Before: " + augmentedMatrix[column][col]);
      augmentedMatrix[column][col] = entry * augmentedMatrix[column][col];
      console.log("After: " + augmentedMatrix[column][col]);
    }

    if (showSteps) {
      destination.innerHTML += "\\left[\\begin{array}{rr|r}";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "\\\\";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
      destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "\\\\";
      destination.innerHTML += "\\end{array}\\right]$$";
    }

    for (var row = 0; row < rows; row++) {
      if (row != column) {
        var entry = flipSign(augmentedMatrix[row][column]);
        console.log(entry);
        if (showSteps) {
          destination.innerHTML += "$$\r R_{"+ (row + 1) +"} \\to " + ifDecimalC2Fraction(entry) + " \\cdot R_{"+ (column + 1) +"} + R_{"+ (row + 1) +"}$$";
          destination.innerHTML += "$$\\left[\\begin{array}{rr|r}";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "\\\\";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "\\\\";
          destination.innerHTML += "\\end{array}\\right] \\to";
        }
        for (var col = column; col < actualColumns; col++ ) {
          console.log("Before: " + augmentedMatrix[row][col]);
          augmentedMatrix[row][col] = (entry * augmentedMatrix[column][col]) + augmentedMatrix[row][col];
          console.log("After: " + augmentedMatrix[row][col]);
        }

        if (showSteps) {
          destination.innerHTML += "\\left[\\begin{array}{rr|r}";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[0][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[0][2]) + "\\\\";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][0]) + "&" + ifDecimalC2Fraction(augmentedMatrix[1][1]) + "&";
          destination.innerHTML += ifDecimalC2Fraction(augmentedMatrix[1][2]) + "\\\\";
          destination.innerHTML += "\\end{array}\\right]$$";
        }

        var tmpValue;
        var checkRow = [];
        var checkValue;
        tmpValue = 0;
        for (let c = 0; c < columns; c++) {
          tmpValue += augmentedMatrix[row][c];
          console.log("tmpValue: " + tmpValue);
        }
        if (tmpValue == 0) {
          checkValue = 0;
          for (let c = columns; c < actualColumns; c++) {
            console.log("Checking: row: " + row + "; column: " + c);
            checkValue += augmentedMatrix[row][c];
            console.log("Check Value: " + checkValue);
          }
          if (checkValue == 0) {
            // Infinite Solutions
            destination.innerHTML += "$$\r Given\\ that\\ all\\ unknowns\\ equal\\ 0,\\ with\\ a\\ all\\ constants\\ equaling\\ 0, $$";
            destination.innerHTML += "$$\r it\\ can\\ be\\ concluded\\ that\\ there\\ are\\ an\\ infinite\\ number\\ of\\ solutions\\ to\\ this\\ system\\ of\\ linear\\ equations.$$";
            MathJax.typeset();
            return;
          }
          else {
            // 0 Solutions
            destination.innerHTML += "$$\r Given\\ that\\ all\\ unknowns\\ equal\\ 0,\\ with\\ a\\ non-zero\\ constant,\\ $$";
            destination.innerHTML += "$$\r it\\ can\\ be\\ concluded\\ that\\ there\\ are\\ an\\ no\\ solutions\\ to\\ this\\ system\\ of\\ linear\\ equations.$$";
            MathJax.typeset();
            return;
          }
        }
      }
    }
  }

  newMatrix[0][0] = augmentedMatrix[0][2];
  newMatrix[1][0] = augmentedMatrix[1][2];

  var constantMatrix = newExecuteMatrix(rows, actualColumns - columns);
  for (let r = 0; r < rows; r++) {
    for (let c = columns; c <= actualColumns; c++ ) {
      constantMatrix[r][c - columns] = matrix[r][c];
    }
  }

  var coefficientMatrix = newExecuteMatrix(rows, columns);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++ ) {
      coefficientMatrix[r][c] = matrix[r][c];
    }
  }

  var verifyMatrix = newExecuteMatrix(rows, actualColumns - columns);
  verifyMatrix[0][0] = coefficientMatrix[0][0] * newMatrix[0][0] + coefficientMatrix[0][1] * newMatrix[1][0];
  verifyMatrix[1][0] = coefficientMatrix[1][0] * newMatrix[0][0] + coefficientMatrix[1][1] * newMatrix[1][0];

  if (verifyMatrix[0][0] != constantMatrix[0][0] && verifyMatrix[1][0] != constantMatrix[1][0]) {
    destination.innerHTML += "$$\r Math\\ Error.\\ The\\ coefficients\\ \\cdot x\\ and\\ y\\ did\\ not\\ equal\\ the\\ constants.$$";
    MathJax.typeset();
    return;
  }
  else if (showSteps) {
    destination.innerHTML += "$$\r Verify\\ x\\ and\\ y\\ are\\ correct: $$";
    destination.innerHTML += "$$\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(coefficientMatrix[0][0]) + "&" + ifDecimalC2Fraction(coefficientMatrix[0][1]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(coefficientMatrix[1][0]) + "&" + ifDecimalC2Fraction(coefficientMatrix[1][1]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} \\cdot ";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(newMatrix[0][0]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(newMatrix[1][0]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix} =";
    destination.innerHTML += "\\begin{pmatrix}";
    destination.innerHTML += ifDecimalC2Fraction(verifyMatrix[0][0]) + "\\\\";
    destination.innerHTML += ifDecimalC2Fraction(verifyMatrix[1][0]) + "\\\\";
    destination.innerHTML += "\\end{pmatrix}$$";
  }

  destination.innerHTML += "$$\r Result: $$"
  destination.innerHTML += "$$\\begin{array}{rrr}";
  destination.innerHTML += charCount[0].innerText + "& = &" + ifDecimalC2Fraction(newMatrix[0][0]) + "\\\\";
  destination.innerHTML += charCount[1].innerText + "& = &" + ifDecimalC2Fraction(newMatrix[1][0]) + "\\\\";
  destination.innerHTML += "\\end{array}$$";
  console.info(augmentedMatrix);
  console.info(matrix);

  MathJax.typeset();
}
