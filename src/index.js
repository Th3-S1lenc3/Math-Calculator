import React from 'react';
import ReactDOM from 'react-dom';

import { MathJaxContext } from 'better-react-mathjax';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Main from './components';

ReactDOM.render(
  <React.StrictMode>
    <MathJaxContext>
      <Main />
    </MathJaxContext>
  </React.StrictMode>,
  document.getElementById('root')
);
