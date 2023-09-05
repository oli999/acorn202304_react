// src/pages/MemberForm.js


import {useState} from 'react';
import axios from 'axios';
// 버전 6 부터 추가된 Hook 
import { useNavigate } from 'react-router-dom';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

export default function MemberForm(){
    //페이지 이동을 도와주는 함수 
    const navigate=useNavigate();

    //입력한 글내용을 state 로 관리하기 
    const [state, setState]=useState({});
    //handleChange 함수에서 입력한 글 내용을 일괄 관리한다.
    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };
    //저장 버튼을 눌렀을때 실행할 함수 
    const handleSave=()=>{
        console.log("아래는 현재 state 입니다")
        console.log(state);
        //axios 를 이용해서 json server 에 전송하기( spring boot api)
        axios.post("/members", state)
        .then(res=>{
            console.log(res.data);
            alert("추가 했습니다");
            //글목록으로 이동?
            navigate("/members");
        })
        .catch(error=>{
            console.log(error);
        });
    }   

    return (
        <>
            <h3>새로운 회원 입력 양식</h3>
            <FloatingLabel controlId="name" label="이름" className="mb-3">
                <Form.Control name="name" type="text" placeholder="이름 입력..." 
                onChange={handleChange}/>
            </FloatingLabel>
            <FloatingLabel controlId="addr" label="주소" className="mb-3">
                <Form.Control name="addr" type="text" placeholder="주소 입력..." 
                onChange={handleChange}/>
            </FloatingLabel>
            <Button variant='primary' onClick={handleSave}>저장</Button>
        </>
    )
}