const Fraction = require('fraction.js');

String.prototype.capitaliseFirst = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleCase = function() {
  return this.split(' ').map((str) => { return str.capitaliseFirst() }).join(' ');
}

String.prototype.detail = function(type, precision) {
  if (Number.isInteger(Number(this))) {
    return this;
  }

  switch (type) {
    case 'decimal':
      return !Number.isNaN(Number(this)) ? parseFloat(Number(this).toPrecision(precision ?? 4)) : this;
      break;
    case 'fraction':
      return this.toString().toMathJaxFraction()
    default:
      return this;
  }
}

String.prototype.toMathJaxFraction = function() {
  let x;

  if (Number.isNaN(Number(this))) {
    return this;
  }
  else {
    x = Number(this);
  }

  if (!Number.isInteger(x)) {
      let newX = new Fraction(x);
      if (newX.d == 1) {
        if (newX.s == -1) {
          x = -Math.abs(newX.n)
        }
        else {
          x = Math.abs(newX.n);
        }
      }
      else {
        if (newX.s == -1) {
          x = `-\\frac{${newX.n}}{${newX.d}}`;
        }
        else {
          x = `\\frac{${newX.n}}{${newX.d}}`;
        }
      }
  }
  return x;
}
