import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";

const RenderApp = () => {
  const accountRoutes = require('./routes/account').default()
  const routes = require('./routes/index').default()

  return (
    <React.StrictMode>
      <ToastProvider>
        <BrowserRouter>
          <App routes={ routes } accountRoutes={accountRoutes}/>
        </BrowserRouter>
      </ToastProvider>
    </React.StrictMode>
  )
}

ReactDOM.render(
  <RenderApp/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
