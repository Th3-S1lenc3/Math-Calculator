import React, { Component } from 'react';

import Span from './Span';

export default class SystemOfLinearEquations extends Component {

  createEquationTable() {
    const { variables } = this.props;
    let { equations } = this.props;
    equations = parseInt(equations);

    const variablesArr = [];
    const equationsArr = [];

    const validVariables = "abcdefghijklmnopqrstuvwxyz".split("");

    var variable;

    for (var i = 1; i <= variables; i++) {
      var key = `${i}-`;
      var variable_id = 'variable-' + i;
      var char_id = `char-${i}`;
      var operator_id = `operator-${i}`;
      var constant_id = `constant-${i}`;

      variable = (
        <td key={key + 1} id={variable_id} className="equation-variable">
          <Span type="number" className="equation-input" placeholder="1" />
        </td>
      );
      variablesArr.push(variable);

      variable = (
        <td key={key + 2} id={char_id} className="equation-char">
          {validVariables[i-1]}
        </td>
      );
      variablesArr.push(variable);

      if (i != variables) {
        variable = (
          <td key={key + 3} id={operator_id} className="equation-operator">
            <select className="operatorInput">
              <option value="add">+</option>
              <option value="subtract">-</option>
              <option disabled value="muliply">x</option>
              <option disabled value="divide">÷</option>
            </select>
          </td>
        );
        variablesArr.push(variable);
      }
      else {
        variable = (
          <td key={key + 4}>=</td>
        );
        variablesArr.push(variable);
        variable = (
          <td key={key + 5} id={constant_id} className="equation-constant">
            <Span type='number' className="equation-input" placeholder="0"/>
          </td>
        );
        variablesArr.push(variable);
      }
    }

    for (var j = 1; j <= equations; j++) {
      var equation_id = 'equation-' + j;

      var equation = (
        <tr key={j} id={equation_id} className="equation-row">
          {variablesArr}
        </tr>
      );
      equationsArr.push(equation);
    }

    return equationsArr;
  }

  render() {
    const { id } = this.props;
    const prefixed_id = 'equationBody-' + id;

    return (
      <table className="equationTable">
        <tbody id={prefixed_id}>
          {this.createEquationTable()}
        </tbody>
      </table>
    )
  }
}
