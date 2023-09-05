// src/pages/Member.js

import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';

export default function Member(){
    // javascript 로 페이지 이동하기 위한 함수
    const navigate = useNavigate();

    const [members, setMembers]=useState([]);

    const refresh=()=>{
        axios.get("/members")
        .then(res=>{
            setMembers(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        refresh();
    }, []);

    //삭제 버튼을 눌렀을때 실행할 함수 
    const handleDelete=(num)=>{
        // react 에 confirm() 함수가 있기때문에 window.confirm() 을 사용한다. 
        const isDelete=window.confirm("이글을 삭제 하시겠습니까?");
        if(isDelete){
            axios.delete("/members/"+num)
            .then(res=>{
                refresh();
            })
            .catch(error=>{});
        }
    }
    return(
        <>  
            <Link to="/members/new">회원추가</Link>
            <h1>회원 목록입니다.</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>주소</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                {
                    members.map(item =>(
                        <tr key={item.num}>
                            <td>{item.num}</td>
                            <td>{item.name}</td>
                            <td>{item.addr}</td>
                            <td>
                                <Button variant='success' onClick={()=>{
                                    navigate(`/members/${item.num}/edit`);
                                }}>수정</Button>
                            </td>
                            <td>
                                <Button variant='warning' onClick={()=>handleDelete(item.num)}>삭제</Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>  
        </>
    )
}