import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

export default function BsNavbar() {
  //로그인된 사용자명이 store 에 있는지 읽어와본다 초기값 null 로 설정되어 있음 
  const userName=useSelector((state)=>{
    return state.userName;
  });
  const dispatch=useDispatch();
  return (
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* bootstrap Component 를 Router Component 로 교체해서 사용 */}
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/members">Member</Nav.Link>
            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
          </Nav>
          {/* store 에 userName 이 null 이 아니면 userName 을 출력 아니면 로그인 버튼 출력 */}
          {
            userName ? 
              <>
                <Nav>
                  <Nav.Link as={NavLink}>{userName}</Nav.Link>
                  <span className="navbar-text">Signed in</span>
                </Nav>
                <Button variant='outline-warning' onClick={()=>{
                  delete localStorage.token;
                  dispatch({type:"SAVE_USER", payload:null});
                }}>Logout</Button>
              </>
              : 
              <Button variant='outline-primary' onClick={()=>{
                //로그인 버튼을 눌렀을때 로그인 모달 띄우기 
                dispatch({type:"SHOW_MODAL", payload:true});
              }}>Sign in</Button>
          }
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

