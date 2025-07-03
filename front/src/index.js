import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios'; // axios 임포트

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './app/store'; // Redux store 임포트

axios.defaults.baseURL = 'http://localhost:8080'; // 백엔드 서버 기본 URL 설정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();