/*
    npm  start  를 하게 되면 최초로 실행되는  파일은  src/index.js 이다 
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// App.js 파일을 불러와서 App 라는 이름으로 사용하기 
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
// legacy_createStore 를 createStore 라는 이름으로 사용하기 (store 를 만들 함수)
import { legacy_createStore as createStore } from 'redux';
// store(저장소) 공급자 
import { Provider } from 'react-redux';

//store 에서 관리될 초기 상태값 
const initialState={
  userName:null,
  modalShow:false
}

//리듀서 함수(차원을 줄이는)
const reducer = (state=initialState, action)=>{
  /*
    이전 상태와 action 을 전달 받아서 새로운 상태 값을 리턴해 주어야 한다
    action 은 object 이고  
    object 안에는 type 과  payload 가  들어 있다.
    type 에는 어떤 동작을 할지가 들어 있고
    payload 에는 동작에 필요한 데이터가 들어 있을수 있다. 
  */
  if(action.type === "SAVE_USER"){
    return {...state, userName:action.payload};
  }else if(action.type === "SHOW_MODAL"){
    return {...state, modalShow:action.payload};
  }
  
  return state;

}

//저장소를 만들어서 (저장소를 만들때 리듀서 함수를 전달)
const store = createStore(reducer);

// public/index.html 파일에서 id 가 root 인 요소에  App 을  렌더링하기 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 만든 저장소를 공급해 준다 */}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
