// src/pages/MemberUpdateForm.js
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"


export default function MemberUpdateForm(){
    // 수정할 글번호를 얻어온다.
    const {num} = useParams();
    // 글 내용을 state 로 관리한다.
    const [state, setState]=useState({
        num:0,
        name:"",
        addr:""
    });

    useEffect(()=>{
        console.log("요청함");
        axios.get("/members/"+num)
        .then(res=>{
            console.log(res.data);
            setState(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }, []);

    // input 요소 or textarea 에 입력할때마다 호출되는 함수 
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    }
    const navigate=useNavigate();
    const handleSave = ()=>{
        axios.put("/members/"+num, state)
        .then(res=>{
            console.log(res.data);
            //회원목록 보기로 이동
            navigate("/members");
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <>
            <h1>회원 정보 수정 양식</h1>
            <FloatingLabel controlId="name" label="이름" className="mb-3">
                <Form.Control name="name" type="text" placeholder="이름 입력..." 
                onChange={handleChange} value={state.name}/>
            </FloatingLabel>
            <FloatingLabel controlId="addr" label="주소" className="mb-3">
                <Form.Control name="addr" type="text" placeholder="주소 입력..." 
                onChange={handleChange} value={state.addr}/>
            </FloatingLabel>
            <Button variant='primary' onClick={handleSave}>수정확인</Button>
        </>
    );
}