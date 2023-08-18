import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import MyCounter from './components/MyCounter';
import YourCounter from './components/YourCounter';
import OurCounter from './components/OurCounter';
import WeCounter from './components/WeCounter';
import WeCounter2 from './components/WeCounter2';

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
    return (
      <div className="container">
        <h1>인덱스 페이지 입니다.</h1>
        <h3>MyCounter</h3>
        <MyCounter/>

        <h3>YourCounter</h3>
        <YourCounter/>

        <h3>OurCounter</h3>
        <OurCounter/>

        <h3>WeCounter</h3>
        <WeCounter/>

        <h3>WeCounter2</h3>
        <WeCounter2/>
      </div>
    )
  }
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
