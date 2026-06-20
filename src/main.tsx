
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import logo from './ae-logo.svg';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import logo from './ae-logo.svg';

function App() {
  return (
    <div>
      <img src={logo} alt="Assurances ELOMRANI" />
    </div>
  );
}

export default App;
