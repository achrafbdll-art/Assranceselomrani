import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import logo from './ae-logo.svg';
<img src={logo} alt="Assurances ELOMRANI" ... />

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
