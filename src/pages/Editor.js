
import { useEffect, useRef, useState } from 'react';
import {initEditor} from '../editor/SmartEditor';

export default function Editor(){
    //입력한 내용을 얻어오기 위한 useRef()
    const inputTitle=useRef();
  	const inputContent=useRef();

	const [editorTool, setEditorTool]=useState([]);

    useEffect(()=>{
        //initEditor() 함수를 호출하면서 SmartEditor 로 변환할 textarea 의 id 를 전달하면
		//textarea 가 SmartEditor 로 변경되면서 에디터 tool 객체가 리턴된다.  
		setEditorTool(initEditor("content"));
    }, []);

    //폼 전송 버튼을 눌렀을때 호출되는 함수 
    const handleSubmit = (e)=>{
        e.preventDefault();
        //에디터 tool 을 이용해서 SmartEditor 에 입력한 내용을 textarea 의 value 값으로 변환
        editorTool.exec();
        //폼 요소에 입력한 내용 읽어오기 
        const title=inputTitle.current.value;
        const content=inputContent.current.value;
        //axios 를 이용해서 전송!
        console.log(content);
    }

    return (
    <>
        <h3>Smart Editor 테스트</h3>
        <form action="">
            <div>
                <label htmlFor="title">제목</label>
                <input ref={inputTitle} type="text" name="title" id="title"/>
            </div>
            <div>
                <label htmlFor="content">내용</label>
                <textarea ref={inputContent} name="content" id="content" rows="10"></textarea>
            </div>
            <button type="submit" onClick={handleSubmit}>저장</button>
        </form>
    </>
    )
}