
import {useState, useRef} from 'react';

function App() {

  const noticeList=[
    "React 수업 중입니다.",
    "Built test 중...",
    "어쩌구... 저쩌구..."
  ];

  const [notice, setNotice] = useState(noticeList);
  const inputNotice=useRef();
  //추가 버튼을 누르면 호출되는 함수
  const handleAdd=()=>{ 
    //input 요소에 입력한 내용을 읽어와서 state 변경 
    setNotice([...notice, inputNotice.current.value]);
    inputNotice.current.value="";
  }
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <h3>공지사항</h3>
      <div className="row">
        <div className="col">
          <input className="form-control" ref={inputNotice} type="text" placeholder='공지사항 입력...'/>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={handleAdd}>추가</button>
        </div>
      </div>
      <ul>
          {notice.map((item,index)=><li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}



// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
