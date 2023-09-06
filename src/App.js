import { NavLink, Route, Routes } from "react-router-dom";

import {Home, Member, MemberForm, MemberUpdateForm} from './pages';
import BsNavbar from "./components/BsNavbar";
// jsontokens 에서 디코더 import
import {decodeToken} from 'jsontokens';
import axios from "axios";
import { useEffect } from "react";

function App() {

  useEffect(()=>{
      //localStorage 에 저장된 토큰을 디코딩 
    const result=decodeToken(localStorage.token);

    console.log(result);

    //초단위
    const expTime=result.payload.exp*1000; // *1000 을 해서 ms 단위로 만들고 
    
    //현재시간
    const now=new Date().getTime();

    if(expTime < now){
      console.log("토큰 유효기간이 만료 되었습니다.");
      //로그인 창을 띄운다.
      //const userName=prompt("아이디 입력");
      //const password=prompt("비밀번호 입력");
      axios.post("http://localhost:9000/boot08/auth", 
        {userName:"kimgura", password:"1234"}, {headers:{Authorization:"none"}})
      .then(res=>{
        alert("로그인 되었습니다.");
        localStorage.token=res.data;
      })
      .catch(error=>{
        console.log(error);
      });
    }
  }, []);

  return (
    <>
      <BsNavbar/>
      <div className="container">
        
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/members" Component={Member}/>
          <Route path="/members/new" Component={MemberForm}/>
          <Route path="/members/:num/edit" Component={MemberUpdateForm}/>
        </Routes>
      </div>
    </>
  );
}



// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
