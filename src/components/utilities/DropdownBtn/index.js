import React, { Component, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';

import './index.css'

export default class DropdownBtn extends Component {
  state = { clicked: false };

  componentDidMount() {
    const { open } = this.props;

    this.setState(() => ({
      clicked: true
    }));
  }

  toggleDropdown(event) {
    let target = event.target;
    let dropdownContent = target.nextElementSibling;
    if (dropdownContent.style.display === "block") {
     dropdownContent.style.display = "none";
    }
    else {
     dropdownContent.style.display = "block";
    }

    this.setState(() => ({
      clicked: !this.state.clicked
    }));
  }

  render() {
    let { id, label, showID } = this.props;

    return (
      <button key={id} className='dropdown-btn' onClick={(event) => {this.toggleDropdown(event)}}>
        {label.toString().titleCase()} {showID ? id : null}
        <FontAwesomeIcon icon={this.state.clicked ? faCaretDown : faCaretLeft} className='float-right'/>
      </button>
    )
  }
}
