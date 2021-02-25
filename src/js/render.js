MathJax.startup.document.clear();
MathJax.startup.document.updateDocument();

const selectOperation = document.getElementsByClassName("select-operation")[0];
selectOperation.onchange = displayOperation;

const { Fraction } = require('fraction.js');
