// src/pages/Home.js

import {useState, useRef, useEffect} from 'react';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:9000/boot08";

export default function Home(){
    const [notice, setNotice] = useState([]);

    useEffect(()=>{
      //공지 사항을 요청을 통해 받아온다.
      axios.get("/notice")
      .then(res=>{
        //spring boot 서버가 응답한 json 문자열이 javascript 배열로 변경되어 있다.
        console.log(res.data);
        setNotice(res.data);
      })
      .catch(error=>{
        console.log(error);
      });
    }, []);
  
    const inputNotice=useRef();
    //추가 버튼을 누르면 호출되는 함수
    const handleAdd=()=>{ 
      //input 요소에 입력한 내용을 읽어와서 state 변경 
      setNotice([...notice, inputNotice.current.value]);
      inputNotice.current.value="";
    }
    return (
      <>
        <h1>인덱스 페이지 입니다.</h1>
        
        <h3>공지사항</h3>
        <div className="row">
          <div className="col">
            <input className="form-control" ref={inputNotice} type="text" placeholder='공지사항 입력...'/>
          </div>
          <div className="col">
            <button className="btn btn-primary" onClick={handleAdd}>추가</button>
          </div>
        </div>
        <ul>
            {notice.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </>
    );
}