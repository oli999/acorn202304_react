// src/components/TodoComponent.js

import {useState, useEffect, useRef} from "react";
import axios from "axios";
//base url 설정
axios.defaults.baseURL="http://localhost:3001";

export default function TodoComponent(){
    //할일 목록을 state 로 관리하기 
    const [todos, setTodos]=useState([]);

    //할일 목록을 요청하는 함수 
    const getTodos = ()=>{
        axios.get("/todos")
        .then(res=>{
            //res.data 는 할일 목록이 들어 있는 배열이다.
            console.log(res.data);
            //state 를 변경해서 UI 가 업데이트 되도록 한다.
            setTodos(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }
    //TodoComponent 가 활성화 되는 시점에 데이터 받아오기 
    useEffect(()=>{
        getTodos();
    }, []);

    const handleCompleteChange = (id, complete)=>{
        // id 바꿀 할일의 id , complete 는 checkbox 체크여부가 들어 있다.
        const newArray = todos.map(item=>{
            //만일 변경해야할 item 이라면 
            if(item.id == id){
                //변경을 해서 
                item.complete = complete;
            }
            //리턴한다.
            return item;
        });

        //상태값 변경
        setTodos(newArray);

        //서버에 해당 아이템을 일부수정(PATCH) 하도록 요청한다.
        axios.patch("/todos/"+id, {
            complete
        })
        .then(res=>{
            //UI 는 이미 위에서 update 했기때문에 다시 렌더링 할 필요는 없다!
            console.log(res.data);
        }) 
        .catch(error=>{
            console.log(error);
        })
    } 

    const handleCompleteChange2 = (id, complete)=>{
        
        //서버에 해당 아이템을 일부수정(PATCH) 하도록 요청한다.
        axios.patch("/todos/"+id, {
            complete
        })
        .then(res=>{
            console.log(res.data);
            //목록을 다시 받아오게해서 UI 가 업데이트 되도록 한다.
            getTodos();
        }) 
        .catch(error=>{
            console.log(error);
        })
    } 
    // input 요소의 참조값을 보관할  useRef 객체 
    let inputTodo = useRef();

    const handleDelete = (id)=>{
        axios.delete("/todos/"+id)
        .then(res=>{
            getTodos();
        })
        .catch(error=>{
            console.log(error);
        });
    }

    return (
        <div>
            <h3>할일 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>달성(complete)</th>
                        <th>달성(complete)</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                {/* todos 배열을 이용해서 jsx 배열을 만들어 낸다 */}
                {todos.map(item=>{
                    return (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td><input onChange={(e)=>{
                                //함수 호출하면 id 와 checkbox 체크 여부를 전달 
                                handleCompleteChange(item.id, e.target.checked);
                            }} type="checkbox" checked={item.complete}/></td>
                            <td>
                                <input onChange={(e)=>handleCompleteChange2(item.id, e.target.checked)} 
                                    type="checkbox" checked={item.complete}/>
                            </td>
                            <td>
                                <button onClick={()=>handleDelete(item.id)}>x</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            <input ref={inputTodo} type="text" placeholder="할일 입력..." />
            <button onClick={()=>{
                //input 요소에 입력한 문자열을 읽어와서 전송
                const title=inputTodo.current.value;
                axios.post("/todos", {
                    title,
                    complete:false
                })
                .then((res)=>{
                    console.log(res.data);
                    getTodos();
                })
                .catch(error=>{
                    console.log(error);
                });
            }}>추가</button>
            <button onClick={()=>{
                //input 요소에 입력한 문자열을 읽어와서 전송
                const title=inputTodo.current.value;
                axios.post("/todos", {
                    title,
                    complete:false
                })
                .then((res)=>{
                    //추가된 할일 정보가 들어있다. 
                    console.log(res.data);
                    //추가된 할일 정보를 add 한 새로운 배열을 얻어내서 상태값 변경
                    setTodos([...todos, res.data]);
                })
                .catch(error=>{
                    console.log(error);
                });
            }}>추가2</button>
        </div>
    )
}