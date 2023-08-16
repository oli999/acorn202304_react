import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

/*
function App() {
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>

    </div>
  );
}
*/

//함수형 component 에서 클래스형 component 로 변경하기
class App extends Component{
  
  //메소드 만들기
  deleteClicked(){
    console.log("삭제합니다.")
  }
  //화살표 함수로 메소드 만들기 
  saveClicked = ()=>{
  console.log("저장합니다.")
  }
  //mousemove 이벤트가 발생했을때 실행할 함수 만들기
  onMouseMove = (e)=>{
    console.log(`
      x : ${e.clientX}
      y : ${e.clientY}
    `);
  }

  //render() 메소드 에서 리턴해주는 jsx 를 활용해서 화면 구성이 된다.
  render(){
    const updateClicked=()=>{
      console.log("수정합니다")
    }
    const styleObj={
      width:"300px",
      height:"300px",
      border:"1px solid red"
    };
    return (
      <div className="container">
        <h1>인덱스 페이지 입니다.</h1>
        {/* 
          여기는 jsx 내부에서의 주석입니다
          버튼을 눌렀을때 실행할 함수를 onClick 속성의 값으로 직접 전달하기 
        */}
        <button onClick={()=>{
          console.log("전송합니다!");
        }}>전송</button>
        {/* 미리 만들어 놓은 함수를 참조해서 전달할수도 있다. */}
        <button onClick={updateClicked}>수정</button>
        <button onClick={this.deleteClicked}>삭제</button>
        <button onClick={this.saveClicked}>저장</button>
        {/* 
           이벤트 리스너 함수에 전달되는 이벤트 객체는 react 가 넣어주는 이벤트 객체이다.
           original 이벤트 객체를 사용하고 싶다면 e.nativeEvent 를 사용하면 된다.
        */}
        <div style={styleObj} onMouseMove={(e)=>{
            console.log(e);
            console.log(`
              x : ${e.clientX}
              y : ${e.clientY}
            `);
        }}></div>
        <div style={styleObj} onMouseMove={this.onMouseMove}></div>
        <form action="search" onSubmit={(e)=>{
          //폼 제출 막기 
          e.preventDefault();
        }}>
          <input type="text" placeholder='검색어 입력...'/>
          <button type="submit">검색</button>
        </form>
      </div>
    )
  }
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
