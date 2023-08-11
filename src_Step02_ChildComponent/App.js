import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Child from './components/ChildComponent';
import Contact from './components/ContactComponent';
import MyName from './components/MyNameComponent';

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
    const name="원숭이"
    return (
      <div className="container">
        <h1>인덱스 페이지 입니다.</h1>
        <Child></Child>
        <Child></Child>
        <Child></Child>
        <Contact></Contact>
        <h3>MyNameComponent 사용해 보기</h3>
        <MyName name={"김구라"}/>
        <MyName name={"해골"}/>
        <MyName name={name}/>
      </div>
    )
  }
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
