
import './App.css';

import axios from 'axios';
import {useRef} from 'react';

function App() {
  // input 요소의 참조값을 담을 useRef 객체 
  let inputId=useRef();

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <button onClick={()=>{
        axios.post("http://localhost:9000/boot07/todos",{
          title:"react 공부하기",
          complete:false
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(error=>{
          console.log(error);
        });
      }}>Spring Boot 에 요청하기</button>
      <button onClick={()=>{
        axios.post("http://localhost:9000/boot07/todos2",{
          title:"react 공부하기",
          complete:false
        })
        .then(res=>{
          console.log(res.data);
        })
        .catch(error=>{
          console.log(error);
        });
      }}>Spring Boot 에 요청하기2</button>
      <br />
      <input ref={inputId} type="text" placeholder='아이디 입력...'/>
      <button onClick={()=>{
        axios.post("http://localhost:9000/boot07/api/signup",{
          id:inputId.current.value
        })
        .then(res=>{
          console.log(res.data);
          if(res.data.isSignupSuccess){
            alert("가입 되었습니다.");
          }else{
            alert("중복된 아이디 입니다.");
          }
        })
        .catch(error=>{
          console.log(error);
        });
      }}>가입</button>
    </div>
  );
}

// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
