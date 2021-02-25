function displayOperation() {
  const selectedOperation = document.getElementsByClassName("select-operation")[0].value
  document.getElementsByClassName("operationInput")[0].innerHTML = ""

  switch (selectedOperation) {
      case "addMatrices":
        displayOperation_addMatrices();
        break;
      case "subtractMatrices":
        displayOperation_subtractMatrices();
        break;
      case "multiplyMatrices":
        displayOperation_multiplyMatrices();
        break;
      case "scalarMultiplication":
        displayoperation_scalarMultiplication();
        break;
      case "divideMatrices":
        displayOperation_divideMatrices();
        break;
      case "scalarDivision":
        displayOperation_scalarDivision();
        break;
      case "invertMatrix":
        displayOperation_invertMatrix();
        break;
      case "transposeMatrix":
        displayOperation_transposeMatrix();
        break;
      case "linearEquations":
        displayOperation_linearEquations();
        break;
  }
}
