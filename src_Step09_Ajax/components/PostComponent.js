// src/components/PostComponent.js

/*
    [ Restful 방식 요청 예시 ]

    GET   /posts     => post 목록 얻어오기
    GET   /posts/1   => post 한개 얻어오기
    POST  /posts     => post 추가 하기
    PUT   /posts/1     => post 수정 하기
    DELETE /posts/1  => post 삭제 하기 
*/
import { useState, useEffect } from "react";


//함수형 component
export default function PostComponent(){

    const [posts, setPosts] = useState([]);
    
    const getPosts = ()=>{
        //출력할 데이터를 fetch() 함수를 이용해서 얻어오기
        fetch("http://localhost:3001/posts")
        .then(res=>res.json())
        .then(data=>{
            //data 는 post 목록이 들어 있는 배열
            console.log(data);
            setPosts(data);
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
                            /*
                            //서버에 전송할 정보를 object 에 담고 
                            const obj={
                                title,
                                author:item.author
                            };
                            
                            // put 방식으로 전송 
                            fetch("http://localhost:3001/posts/"+item.id,{
                                method:"put",
                                headers:{"Content-Type":"application/json; charset=utf-8"},
                                body:JSON.stringify(obj) // object 에 담긴 정보를 json 문자열로 변환
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data);
                                getPosts();
                            });
                            */
                            
                            //전송할 정보를 FormData 객체에 담는다.
                            const formData=new FormData();
                            formData.append("title", title);
                            formData.append("author", item.author);
                            //FormData 객체에 담겨 있는 내용을 query 문자열로 변환 
                            const queryString=new URLSearchParams(formData).toString();
                            //fetch() 함수를 이용해서 전송
                            fetch("http://localhost:3001/posts/"+item.id, {
                                method:"put",
                                headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},
                                body:queryString
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data);
                                getPosts();
                            });
                        }}>수정</button></td>
                        <td><button onClick={()=>{
                            fetch("http://localhost:3001/posts/"+item.id, {
                                method:"delete"
                            })
                            .then(res=>res.json())
                            .then(data=>{
                                console.log(data);
                                getPosts();
                            })
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
                //fetch() 함수를 이용해서 전송
                fetch(url, {
                    method,
                    headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},
                    body:queryString
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                    //방금 추가된 데이터를 posts 에 추가하기 
                    //setPosts([...posts, data]);
                    //목록전체를 다시 받아오기 
                    getPosts();
                })
                .catch(error=>{
                    console.log("에러 발생", error)
                });
            }}>
                <input type="text" name="title" placeholder="제목..."/>
                <input type="text" name="author" placeholder="작성자..."/>
                <button type="submit">저장</button>
            </form>
        </div>
    )
}