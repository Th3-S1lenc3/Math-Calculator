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

  //Calculate

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

  // Begin gaussian elimination on augmentedMatrix
  // Thanks to reshish.com for helping prove this is correct

  for (var column = 0; column < cols; column++){
    var entry = 1 / augmentedMatrix[column][column];
    console.log("1 / " + augmentedMatrix[column][column] + " = " + entry);
    for (var col = column; col < newCols; col++ ) {
      console.log("Before: " + augmentedMatrix[column][col]);
      augmentedMatrix[column][col] = entry * augmentedMatrix[column][col];
      console.log("After: " + augmentedMatrix[column][col]);
    }
    for (var row = 0; row < rows; row++) {
      if (row != column) {
        var entry = flipSign(augmentedMatrix[row][column]);
        console.log(entry);
        for (var col = column; col < newCols; col++ ) {
          console.log("Before: " + augmentedMatrix[row][col]);
          augmentedMatrix[row][col] = (entry * augmentedMatrix[column][col]) + augmentedMatrix[row][col];
          console.log("After: " + augmentedMatrix[row][col]);
        }
      }
    }
  }

  console.info(augmentedMatrix);

}
