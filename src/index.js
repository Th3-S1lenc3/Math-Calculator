import React from 'react';
import ReactDOM from 'react-dom';

import { MathJaxContext } from 'better-react-mathjax';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Main from './components';

const config = {
  hideUntilTypeset: "every",
}

ReactDOM.render(
  <React.StrictMode>
    <MathJaxContext config={config}>
      <Main />
    </MathJaxContext>
  </React.StrictMode>,
  document.getElementById('root')
);
