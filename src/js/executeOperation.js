function executeOperation() {
  console.log('executeOperation');

  const operation = document.getElementById("select-operation").value;

  var showSteps = false;
  const operation_detail = document.getElementById("operation-detail").value;
  if (operation_detail == "Show Steps") {
      showSteps = true;
  }

  switch (operation) {
      case "addMatrices":
          executeOperation_addMatrices(showSteps);
          break;
      case "subtractMatrices":
          executeOperation_subtractMatrices(showSteps);
          break;
      case "multiplyMatrices":
          executeOperation_multiplyMatrices(showSteps);
          break;
      case "scalarMultiplication":
          executeOperation_scalarMultiplication(showSteps);
          break;
      case "divideMatrices":
          executeOperation_divideMatrices(showSteps);
          break;
      case "scalarDivision":
          executeOperation_scalarDivision(showSteps);
          break;
  }
}
