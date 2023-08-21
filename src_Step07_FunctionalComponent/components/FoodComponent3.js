// src/components/FoodComponent.js

// useRef 함수도 추가로 import 한다. 
import {useState, useRef} from "react"; 


function FoodComponent3(){

    const [state, setState] = useState({
        foods:[],
        index:0
    });
    // useRef 함수가 리턴해주는 object 를 지역 변수에 담아둔다 
    let inputFood = useRef();
    console.log(inputFood);

    return (
        <div>
            <h3>좋아하는 음식 목록</h3>
            <input ref={inputFood} type="text" placeholder="음식입력..." />
            <button onClick={()=>{
                //입력한 음식이름을 state.foods 에 추가하기
                setState({
                    ...state,
                    foods:[...state.foods, <li key={state.index}>{inputFood.current.value}</li>],
                    index:state.index+1
                });
                //input 요소에 빈 문자열 출력하기 
                inputFood.current.value="";
                //input 요소에 포커스 주기
                inputFood.current.focus();
            }}>추가</button>
            <ul>
                {state.foods}
            </ul>
        </div>
    );
}

export default FoodComponent3