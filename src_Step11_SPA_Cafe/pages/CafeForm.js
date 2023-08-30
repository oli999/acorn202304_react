
import {useState} from 'react';
import axios from 'axios';
// 버전 6 부터 추가된 Hook 
import { useNavigate } from 'react-router-dom';

export default function CafeForm(){
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
        axios.post("/cafes", state)
        .then(res=>{
            console.log(res.data);
            alert("추가 했습니다");
            //글목록으로 이동?
            navigate("/cafes");
        })
        .catch(error=>{
            console.log(error);
        });
    }   

    return (
        <>
            <h3>새글 입력 양식</h3>
            <div className='mb-3'>
                <label className='form-label' htmlFor="title">제목</label>
                <input className='form-control' onChange={handleChange} type="text" id="title" name="title"/>
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor="content">내용</label>
                <textarea className='form-control'  onChange={handleChange} name="content" id="content" cols="30" rows="5"></textarea>
            </div>
            <div className='mb-3'>
                <label htmlFor="writer">작성자</label>
                <input className='form-control' onChange={handleChange} type="text" name="writer" id="writer" />
            </div>
            <button className='btn btn-outline-primary' onClick={handleSave}>저장</button>
        </>
    )
}