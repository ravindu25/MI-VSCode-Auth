import React from 'react';
import ReactDOM from 'react-dom';
import VSCodeAuth from './VSCodeAuth/index';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VSCodeAuth />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);