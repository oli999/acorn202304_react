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
  
  //render() 메소드 에서 리턴해주는 jsx 를 활용해서 화면 구성이 된다.
  render(){
    //jsx 객체를 만들어서 변수에 담기
    let p1 = <p>p1 입니다</p>;
    //배열에 jsx 객체 담기 
    let msgs = [];
    msgs.push(<p>안녕하세요</p>);
    msgs.push(<p>jsx 객체 입니다</p>);
    msgs.push(<p>어쩌구.. 저쩌구...</p>);

    let animals=["Cat", "Dog", "Elempant"];
    //배열에 저장된 아이템을 이용해서 jsx 가 저장된 새로운 배열을 얻어낸다. 
    let result=animals.map((item, index)=>{
      return <p key={index}>{item}</p>
    });
    let result2=animals.map((item, index) => <li key={index}>{item}</li>);
    return (
      <div className="container">
        <h1>인덱스 페이지 입니다.</h1>
        {p1}
        {msgs}
        <h3>동물들</h3>
        {result}
        <h3>동물 목록</h3>
        <ul>
          {result2}
        </ul>
      </div>
    )
  }
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
