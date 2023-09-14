import { NavLink, Route, Routes } from "react-router-dom";

import {Gallery, Home, Member, MemberForm, MemberUpdateForm} from './pages';
import BsNavbar from "./components/BsNavbar";
// jsontokens 에서 디코더 import
import {decodeToken} from 'jsontokens';
import axios from "axios";
import { useEffect, useState } from "react";
//bootstrap ui 
import {Modal, FloatingLabel, Form, Alert, Button} from 'react-bootstrap';
// redux 에 관련된 함수 import
// useSelector 는 store 에 있는 값을 불러오기 위한 함수 
// useDispatch 는 action 을 발행(reducer 에 action 을 전달)하기 위한 함수 
import { useSelector, useDispatch } from "react-redux";
import initToken from './initToken';
import Editor from "./pages/Editor";

function App() {
  //모달을 띄울지 말지 상태값으로 관리!
  //const [modalShow, setModalShow]=useState(false);
  // store 에 저장된 값을 이용해서 모달을 띄울지 말지 관리!
  const modalShow=useSelector((state)=>state.modalShow);

  const dispatch=useDispatch();
  useEffect(()=>{
    //만일 localStorage 에 token 이라는 키값으로 저장된 문자열이 있다면  
    if(localStorage.token){
      //토큰을 디코딩
      const result=decodeToken(localStorage.token);
      //초단위
      const expTime=result.payload.exp*1000; // *1000 을 해서 ms 단위로 만들고 
      //현재시간
      const now=new Date().getTime();
      //만일 토큰 유효기간이 만료 되었다면 
      if(expTime < now){
        //모달을 띄운다
        dispatch({type:"SHOW_MODAL", payload:true});
      }else{//만료되지 않았으면 로그인된 상태이다
        dispatch({type:"SAVE_USER", payload:result.payload.sub});
        //localStorage 에 저장된 토큰을 사용할 준비를 한다.
        initToken(localStorage.token);
      }
    }else{//토큰이 없어도 로그인을 해야한다
      dispatch({type:"SHOW_MODAL", payload:true});
    }

  }, []);

  return (
    <>
      <BsNavbar/>
      <div className="container">
        
        <Routes>
          <Route path="/" Component={Home}/>
          <Route path="/members" Component={Member}/>
          <Route path="/members/new" Component={MemberForm}/>
          <Route path="/members/:num/edit" Component={MemberUpdateForm}/>
          <Route path="/gallery" Component={Gallery}/>
          <Route path="/editor" Component={Editor}/>
        </Routes>
      </div>
      <MyVerticallyCenteredModal show={modalShow} onHide={()=>{
        //모달 숨기기
        dispatch({type:"SHOW_MODAL", payload:false});
      }}/>
    </>
  );
}


function MyVerticallyCenteredModal(props) {
  //입력한 userName, password 를 상태값으로 관리 
  const [state, setState]=useState({});
  //에러가 있는지 여부 (아이디 비밀번호가 틀렸는지 여부) 를 상태값으로 관리 
  const [isError, setIsError]=useState(false);
  //입력할때 즉시 상태값에 반영이 되도록 
  const handleChange=(e)=>{
    setState({
      ...state,
      [e.target.name]:e.target.value
    })
  }

  //액션을 발행할 함수
  const dispatch = useDispatch();

  //로그인을 눌렀을때 인증요청(토큰발급요청)
  const handleSubmit=()=>{
    axios.post("/auth", state, {headers:{Authorization:"none"}})
    .then(res=>{
      //토큰이 정상적으로 발급되면 
      //토큰을 저장하고 
      localStorage.token=res.data;
      //모달창의 숨기고
      props.onHide();
      //에러정보를 없앤다.
      setIsError(false);
      //토큰에서 로그인된 사용자 정보를 얻어온다.
      const userName = decodeToken(res.data).payload.sub;
      //action 만들기
      const action = {type:"SAVE_USER",payload:userName};
      //action 발행 
      dispatch(action);
      initToken(localStorage.token);
    })
    .catch(error=>{
      console.log(error);
      //에러정보를 출력
      setIsError(true);
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          로그인이 필요 합니다.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel controlId="floatingInput" label="User Name" className="mb-3">
          <Form.Control onChange={handleChange} name="userName" type="text"  placeholder="User Name"/>
        </FloatingLabel>
        <FloatingLabel  controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control onChange={handleChange} name="password" type="password" placeholder="Password" />
        </FloatingLabel>
        {
          isError && <Alert variant="danger">아이디 혹은 비밀번호가 틀려요!</Alert>
        } 
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>로그인</Button>
      </Modal.Footer>
    </Modal>
  );
}



// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
