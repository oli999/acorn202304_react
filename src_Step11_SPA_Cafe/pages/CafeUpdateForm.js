// src/pages/CafeUpdateForm.js

import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom"

export default function CafeUpdateForm(){
    //페이지를 이동할 함수 
    const navigate = useNavigate();
    //수정할 글번호를 얻어와서
    const {id} = useParams();

    //글 내용을 state 로 관리하기
    const [state, setState]=useState({
        title:"",
        content:"",
        writer:""
    });

    //useEffect() 에 전달한 함수 안에서 글정보를 얻어내서 state 로 관리한다.
    useEffect(()=>{
        axios.get("/cafes/"+id)
        .then(res=>{
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

    //저장 버튼을 눌렀을때 호출되는 함수
    const handleSave = ()=>{
        axios.put("/cafes/"+id, state)
        .then(res=>{
            console.log(res.data);
            alert("수정 했습니다");
            //글 자세히 보기로 이동
            navigate("/cafes/"+id);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    return (
        <>
            <h3>글 수정 양식</h3>
            <div className='mb-3'>
                <label className='form-label' htmlFor="title">제목</label>
                <input onChange={handleChange} className='form-control'value={state.title} type="text" id="title" name="title"/>
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="content">내용</label>
                <textarea onChange={handleChange} className='form-control'  value={state.content} name="content" id="content" cols="30" rows="5"></textarea>
            </div>
            <div className='mb-3'>
                <label htmlFor="writer">작성자</label>
                <input onChange={handleChange} className='form-control'  value={state.writer} type="text" name="writer" id="writer" />
            </div>
            <button onClick={handleSave} className='btn btn-outline-primary'>저장하기</button>
        </>
    )
}