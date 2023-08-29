/*
    npm  start  를 하게 되면 최초로 실행되는  파일은  src/index.js 이다 
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js 파일을 불러와서 App 라는 이름으로 사용하기 
import App from './App2';
import reportWebVitals from './reportWebVitals';
/*
  npm install react-router-dom 을 설치 해야 사용할수 있다.
*/
import {BrowserRouter} from 'react-router-dom';

// public/index.html 파일에서 id 가 root 인 요소에  App 을  렌더링하기 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
