
import { useState } from 'react';
import './App.css';
import {Alert, Button} from 'react-bootstrap';

function App() {

  const [show, setShow] = useState(true);

  return (
    <div className="container">
      <h1>인덱스 페이지 입니다.</h1>
      <Button variant='primary' className='me-1'>버튼</Button>
      <Button variant='success' className='me-1'>버튼</Button>
      <Button variant='danger'>버튼</Button>
      {[
        'primary',
        'secondary',
        'success',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} 
          <Alert.Link href="#"> an example link </Alert.Link>
          alert—check it out!
        </Alert>
      ))}

      <Alert show={show} variant="success">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}

    </div>
  );
}
// import 한 곳에 무엇을 리턴해줄지 결정하기 
export default App;
