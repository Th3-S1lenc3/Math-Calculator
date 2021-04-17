import React, { Component } from 'react';

export default class Span extends Component {

  validateNumerical(e) {
    if (e.defaultPrevented) {
      return;
    }
    const key = e.key || e.code;
    if ((e.key.length <= 1) && (!(e.metaKey || e.ctrlKey || e.altKey))) {
      if (!((key >= '0' && key <= '9') || (key === '-') || (key === '.') )) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    }
  }

  validateSequence(e) {
    if (e.defaultPrevented) {
      return;
    }

    const key = e.key || e.code;
    let target = e.target;

    if ((e.key.length <= 1) && (!(e.metaKey || e.ctrlKey || e.altKey))) {
      if (!((key >= '0' && key <= '9') || (key === '-') || (key === ',') )) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    }
  }

  render() {
    let { className, placeholder } = this.props;

    let classes = className || '';

    classes += ' float-right';

    if (typeof this.props.type !== 'undefined') {
      let { type } = this.props;

      switch (type) {
        case 'number':
          return (
            <span className={classes} contentEditable='true' onKeyDown={this.validateNumerical} placeholder={placeholder}/>
          );
          break;
        case 'sequence':
          classes = className || '';
          return (
            <span className={classes} contentEditable='true' onKeyDown={this.validateSequence} placeholder={placeholder}/>
          );
          break;
        default:
          return (
            <span className={classes} contentEditable='true' placeholder={placeholder}/>
          );
          break;
      }

    }
    else {
      return (
        <span className={classes} contentEditable='true' placeholder={placeholder}/>
      );
    }
  }
}
