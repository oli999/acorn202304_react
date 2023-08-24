// src/components/PostComponent.js

/*
    [ Restful 방식 요청 예시 ]

    GET   /posts     => post 목록 얻어오기
    GET   /posts/1   => post 한개 얻어오기
    POST  /posts     => post 추가 하기
    PUT   /posts/1   => post 전체(모든칼럼) 수정 하기
    PATCH /posts/1   => post 일부 수정 하기
    DELETE /posts/1  => post 삭제 하기 
*/
import { useState, useEffect } from "react";

// ajax 요청을 도와줄 객체 import
import axios from "axios";

//함수형 component
export default function PostComponent2(){

    const [posts, setPosts] = useState([]);
    
    const getPosts = ()=>{
        
        //출력할 데이터를 axios 객체의 get() 함수를 이용해서 얻어오기
        axios.get("http://localhost:3001/posts")
        .then(res=>{
            //res.data 는 배열이다. 
            console.log(res.data);
            //상태값 변경하기 
            setPosts(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    };
    /*
        useEffect( 함수, 빈배열) 
        위와 같이 useEffect() 함수를 호출하면서 전달된 함수는 
        이 컴포넌트가 최초 초기화 될때 오직 한번만 호출된다.
    */
    useEffect(()=>{
        getPosts();
    }, []);
    

    return (
        <div>
            <h3>글 목록입니다</h3>
            <table>
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>수정</th>
                        <th>삭제</th>  
                    </tr>
                </thead>
                <tbody>
                {posts.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.author}</td>
                        <td><button onClick={()=>{
                            const title=prompt("수정할 제목 입력...");
                            axios.put("http://localhost:3001/posts/"+item.id, {
                                title,
                                author:item.author
                            })
                            .then(res=>{
                                console.log(res.data);
                                getPosts();
                            })
                            .catch(error=>{
                                console.log(error);
                            });
                         
                        }}>수정</button></td>
                        <td><button onClick={()=>{
                            axios.delete("http://localhost:3001/posts/"+item.id)
                            .then(res=>{
                                console.log(res.data);
                                getPosts();
                            })
                            .catch(error=>{
                                console.log(error);
                            });  
                        }}>x</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            <form action="http://localhost:3001/posts" method="post" onSubmit={(e)=>{
                //폼 전송 막기
                e.preventDefault();
                //폼에 입력한 내용을 ajax 전송 
                //요청 url 
                const url=e.target.action;
                //요청 방식
                const method=e.target.method;
                //전송할 폼 데이터
                const formData=new FormData(e.target);
                const queryString=new URLSearchParams(formData).toString();
                
                axios[method](url, queryString)
                .then(res=>{
                    console.log(res.data);
                    getPosts();
                })
                .catch(error=>{
                    console.log(error);
                }); 
                
            }}>
                <input type="text" name="title" placeholder="제목..."/>
                <input type="text" name="author" placeholder="작성자..."/>
                <button type="submit">저장</button>
            </form>
        </div>
    )
}