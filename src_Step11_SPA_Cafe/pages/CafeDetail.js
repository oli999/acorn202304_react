// src/pages/CafeDetail.js

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function CafeDatail(){
    //페이지 이동을 하기 위한 함수 
    const navigate=useNavigate();

    // :id  경로 변수에 전달된값 얻어내기
    const {id}=useParams();

    //글 하나의 정보를 state 로 관리 하기 위해 
    const [state, setState]=useState({});

    useEffect(()=>{
        //id 에 해당하는 글 정보를 요청해서 얻어온다.
        axios.get("/cafes/"+id)
        .then(res=>{
            console.log(res.data);
            setState(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }, []);

    //삭제 버튼을 눌렀을때
    const handleDelete = ()=>{
        // react 에 confirm() 함수가 있기때문에 window.confirm() 을 사용한다. 
        const isDelete=window.confirm("이글을 삭제 하시겠습니까?");
        if(isDelete){
            axios.delete("/cafes/"+state.id)
            .then(res=>{
                //글 목록 보기로 이동
                navigate("/cafes");
            })
            .catch(error=>{});
        }
    }
    return (
        <>
            <h3>글 자세히 보기</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <td>{state.id}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            <textarea className="form-control" rows={10} value={state.content}></textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={()=>{
                //글 수정 페이지로 이동
                navigate(`/cafes/${id}/edit`);
            }} className="btn btn-success me-1">수정</button>
            <button onClick={handleDelete} className="btn btn-danger">삭제</button>
        </>
    )
}