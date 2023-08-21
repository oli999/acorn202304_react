
import './App.css';
import {useState} from "react";
import FoodComponent from './components/FoodComponent';
import FoodComponent2 from './components/FoodComponent2';
import FoodComponent3 from './components/FoodComponent3';

function App() {
  console.log("App 함수가 실행됩니다.")

  // object 를 이용해서 상태관리 하기
  const [state, setState] = useState({
    name:"김구라",
    age:20
  });

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <input type="text" value={state.name} onChange={(e)=>{
        setState({
          ...state,
          name:e.target.value //입력한 이름
        });      
      }}/>
      <input type="text" value={state.age} onChange={(e)=>{
        setState({
          ...state,
          age:e.target.value //입력한 나이 
        });
      }}/>
      <p>{`이름은 ${state.name}`}</p>
      <p>{`나이는 ${state.age}`}</p>

      <FoodComponent/>
      <FoodComponent2/>
      <FoodComponent3/>
    </div>
  );

}

// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
