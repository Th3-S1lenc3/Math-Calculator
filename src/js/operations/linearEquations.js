function displayOperation_linearEquations() {
  const operationInput = document.getElementsByClassName('operationInput')[0];
  const equationCount = 2;

  const equationTable = document.createElement('table');
  equationTable.classList.add('equation-table', 'ml-1');

  const tableBody = document.createElement('tbody');

  for (i = 1; i <= equationCount; i++) {
    const tableRow = document.createElement('tr');
    const tableData = document.createElement('td')

    const equation = document.createElement('input');
    equation.id = 'equation-' + i;
    equation.classList.add('equation');

    tableData.append(equation);
    tableRow.append(tableData);
    equationTable.append(tableRow);
  }

  const btnExecute = document.createElement('button')
  btnExecute.classList.add('btn', 'btn-success', 'ml-auto', 'mr-1');
  btnExecute.addEventListener('click', executeOperation);
  btnExecute.textContent = 'Execute';

  operationInput.append(equationTable);
  operationInput.append(btnExecute);
}

function executeOperation_linearEquations(showSteps) {

}
