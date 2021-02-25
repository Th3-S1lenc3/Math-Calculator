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

}
