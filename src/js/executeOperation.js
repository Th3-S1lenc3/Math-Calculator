function executeOperation() {
  console.log('executeOperation');

  const operation = document.getElementsByClassName("select-operation")[0].value;

  var showSteps = false;
  const operation_detail = document.getElementsByClassName("operation-detail")[0].value;
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
      case "invertMatrix":
        executeOperation_invertMatrix(showSteps);
        break;
      case "transposeMatrix":
        executeOperation_transposeMatrix(showSteps);
        break;
      case "simultaneousEquations":
        executeOperation_linearEquations(showSteps);
        break;
  }
}
