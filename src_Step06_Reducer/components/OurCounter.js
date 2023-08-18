// src/components/OurCounter.js

import { useState } from "react"

//함수형 component 
function OurCounter(){
    /*
        함수형 Component 에서 state 관리하기

        const [ 상태값, 상태값을 변화시키는 함수] = useState( 상태의 초기값 )
    */
    const [state, setState] = useState({count:0})

    return (
        <div>
            <button onClick={()=>{
               setState({
                count:state.count-1
               });
            }}>-</button>
            <strong>{state.count}</strong>
            <button onClick={()=>{
              setState({
                count:state.count+1
              });
            }}>+</button>
        </div>
    )
}

export default OurCounter


