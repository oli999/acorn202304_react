
import { useRef, useState } from "react"
import axios from "axios";
axios.defaults.baseURL="http://localhost:9000/boot07";

export default function App3(){
    //업로드된 파일의 정보를 임시로 관리하기 
    let [state, setState]=useState({
        orgFileName:"",
        saveFileName:"",
        fileSize:0,
        url:""
    });
    let inputFile=useRef();

    return (
        <div>
            <h1>파일 업로드 테스트</h1>
            <input type="file" ref={inputFile} />
            <button onClick={()=>{
                //FormData 객체를 생성해서 
                const formData=new FormData();
                //선택한 파일을 image 라는 키값으로 담는다.
                formData.append("myFile", inputFile.current.files[0]);
                //axios 를 이용해서  multipart 요청을 보낸다.
                axios.post("/api/file", formData, {
                    headers:{"Content-Type":"multipart/form-data"}
                })
                .then(res=>{
                    console.log(res.data);
                    const {orgFileName, saveFileName, fileSize} = res.data;
                    const url="http://localhost:9000/boot07/api/file"+
                        "?saveFileName="+saveFileName+
                        "&orgFileName="+orgFileName+
                        "&fileSize="+fileSize;
                    setState({orgFileName, saveFileName, fileSize, url});
                })
                .catch(error=>{
                    console.log(error);
                });
            }}>업로드</button>
            <br />
            { state.fileSize != 0 && 
                <div>
                    <p>원본 파일명 : <strong>{state.orgFileName}</strong></p>
                    <p>저장 파일명 : <strong>{state.saveFileName}</strong></p>
                    <p>파일의 크기 : <strong>{state.fileSize}</strong> byte</p>
                    <a href={state.url}>{state.orgFileName}</a>
                </div>    
            }
        </div>
    )
}