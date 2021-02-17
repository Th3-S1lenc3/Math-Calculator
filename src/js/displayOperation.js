function displayOperation() {
  const selectedOperation = document.getElementById("select-operation").value
  document.getElementById("execute-operation-container").innerHTML = "";

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
  }
}
