// App.css 를 import 하면 css 가 자동 로딩된다.
import './App.css';
import MyComponent from './components/MyComponent';

//import "./css/bootstrap.css";

// module 화 된 css 활용해 보기 
import boot from "./css/bootstrap.module.css";
import {useState} from "react";

function App() {
  //문자열을 상태값으로 관리할 useState()
  const [btnClass, setBtnClass] = useState("");

  //css 클래스 속성의 이름이 어떻게 변경되었는지에 대한 정보가 들어 있는 object
  console.log(boot);

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <button className='bootstrap_btn__6fVHq bootstrap_btn-primary__lgDAE'>버튼</button>
      <button className={`${boot.btn} ${boot["btn-primary"]}`}>버튼2</button>
      <h3>동적으로 클래스 적용하기</h3>
      <input type="text" placeholder='버튼에 적용할 css 속성을 작성해 보세요' onChange={(e)=>{
        setBtnClass(e.target.value);
      }}/>
      <br />
      <button className={boot[btnClass]}>class 가 적용된 버튼</button>

      <MyComponent/>
    </div>
  );
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
