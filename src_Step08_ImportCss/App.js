
/* css 파일을 import 하는것 만으로 css 를 사용할수 있다. */
import ChildComponent from './components/ChildComponent';
import './css/custom.css';

function App() {
 
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <div className="box"></div>
      <p className="bg-yellow">p 요소</p>
      
      <ChildComponent/>
    </div>
  );
}

// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
