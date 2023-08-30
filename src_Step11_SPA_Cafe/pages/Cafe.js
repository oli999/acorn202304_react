
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// axios 사용 준비 
import axios from 'axios';

export default function Cafe(){
    //글목록을 state 로 관리한다.
    const [list, setList]=useState([]);
    //Component 가 초기화 되는 시점에 글목록을 ajax 요청을 통해 받아와서 state 로 관리
    useEffect(()=>{
        axios.get("/cafes")
        .then(res=>{
            //res.data 는 글목록이 들어 있는 배열이다 [{},{},{},...]
            console.log(res.data);
            setList(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }, []);

    return (
        <>
            <Link to="/cafes/new">새글작성</Link>
            <h1>글 목록 입니다.</h1>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                {
                    list.map(item=>{
                        return (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <Link to={"/cafes/"+item.id}>{item.title}</Link>
                                </td>
                                <td>{item.writer}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    )
}