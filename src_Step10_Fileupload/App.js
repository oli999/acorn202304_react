
import './App.css';
import {useRef, useState} from 'react';
import axios from 'axios';
axios.defaults.baseURL="http://localhost:9000/boot07";

function App() {

  let inputFile=useRef();
  //서버에 저장된 이미지명을 state 값으로 관리하기 
  const [imageName, setImageName]=useState(null);

  return (
    <div className="container">
      <h1>파일 업로드 테스트</h1>
      <h3>업로드할 이미지 선택</h3>
      <input type="file" ref={inputFile} accept='.jpg, .JPG, .JPEG, .png, .PNG, .gif'/>
      <button onClick={()=>{
        //FormData 객체를 생성해서 
        const formData=new FormData();
        //선택한 파일을 image 라는 키값으로 담는다.
        formData.append("image", inputFile.current.files[0]);
        //axios 를 이용해서  multipart 요청을 보낸다.
        axios.post("/api/image", formData, {
          headers:{"Content-Type":"multipart/form-data"}
        })
        .then(res=>{
          console.log(res.data);
          //저장된 이미지의 이름을 state 에 넣어주기
          setImageName(res.data.saveFileName);
        })
        .catch(error=>{
          console.log(error);
        });
      }}>업로드</button>
      <br />
      { imageName && <img src={`http://localhost:9000/boot07/api/image/${imageName}`} alt="이미지"/>}
    </div>
  );
}


// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
