// src/components/WeCounter.js

import { useReducer } from "react"

//리듀서 함수 만들기 
const reducer = (count, action)=>{
    let newCount;
    //현재 상태값과 액션값이 전달된다.
    if(action == "minus"){
        newCount = count-1;
    }else if(action == "plus"){
        newCount = count+1;
    }else{
        newCount = count;
    }
    //상태값과 액션값을 활용해서 새로운 상태값을 리턴해주면 된다.
    return newCount;
}

//함수형 component 
function WeCounter(){
    /*
        [ 상태값, 상태를 변경할때 사용할 함수 ] = useRecucer( 리듀서 함수, 초기값)
    */
    const [count, dispatch] = useReducer(reducer, 0)

    return (
        <div>
            <button onClick={()=>{
              //카운트 값을 감소 시켜 달라는 액션를 발생(발행) 시킨다.
              dispatch("minus"); //결과적으로 리듀서 함수가 호출된다. 
            }}>-</button>
            <strong>{count}</strong>
            <button onClick={()=>{
              //카운트 값을 증가 시켜 달라는 액션를 발생(발행) 시킨다.
              dispatch("plus");
            }}>+</button>
        </div>
    )
}

export default WeCounter


