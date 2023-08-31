
import {Button, Col, Container, FloatingLabel, Form, Row, Stack} from 'react-bootstrap';
import {useState, useId} from 'react';
import './custom.css';

export default function App4(){
    //유일한 아이디를 얻어내기 위한 React Hook
    const email=useId();
    const comment=useId();

    return (
        <>  
            <Container>
                <h1>React Bootstrap 폼</h1>
                <Form>
                    <Form.Group className="mb-3" controlId={email}>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId={comment}>
                        <Form.Label>Example textarea</Form.Label>
                        {/* 
                            Form.Control 은 default 로 <input> 요소로 변경되지만
                            <textarea> 로 변경하고 싶으면
                            as="textarea" 하고  rows={행의 갯수} 를 전달할수도 있다. 
                        */}
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                <h3>floating label</h3>
                <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3">
                    <Form.Control type="email" placeholder="name@example.com" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control type="password" placeholder="Password" />
                </FloatingLabel>

            </Container> 
        </>
    )
}