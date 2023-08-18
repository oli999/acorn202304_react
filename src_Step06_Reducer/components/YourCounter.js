// src/components/MyCounter.js

import { useState } from "react"

//함수형 component 
function YourCounter(){
    /*
        함수형 Component 에서 state 관리하기

        const [ 상태값, 상태값을 변화시키는 함수] = useState( 상태의 초기값 )
    */
    const [count, setCount] = useState(0)

    return (
        <div>
            <button onClick={()=>{
               setCount(count-1)
            }}>-</button>
            <strong>{count}</strong>
            <button onClick={()=>{
               setCount(count+1)
            }}>+</button>
        </div>
    )
}

export default YourCounter


