MathJax.startup.document.clear();
MathJax.startup.document.updateDocument();

const selectOperation = document.getElementById("select-operation");
selectOperation.onchange = displayOperation;

const { Fraction } = require('fraction.js');
