
import {Button, Col, Container, Row, Stack} from 'react-bootstrap';
import {useState} from 'react';
import './custom.css';

export default function App3(){
    
    return (
        <>  
            <Container>
                <h1>React Bootstrap 사용하기</h1>
                <Row>
                    <Col xs={{span:3}}>span3</Col>
                    <Col xs={{span:3, offset:3}}>span3, offset3</Col>
                </Row>
                <Row>
                    <Col xs={{span:8, offset:2}} md={{span:4, offset:4}}>칼럼</Col>
                </Row>
                <h3>수직 Stack</h3>
                <Stack gap={3}>
                    <div className="p-2">First item</div>
                    <div className="p-2">Second item</div>
                    <div className="p-2">Third item</div>
                </Stack>

                <h3>수평 Stack</h3>
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2">First item</div>
                    <div className="p-2">Second item</div>
                    <div className="p-2">Third item</div>
                </Stack>

                <h3>Stack 응용</h3>
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2">First item</div>
                    {/* 
                        ms-auto => margin-start(margin-left) 을  남는 공간만큼 모두 가지겠다.
                    */}
                    <div className="p-2 ms-auto">Second item</div>
                    <div className="vr" />
                    <div className="p-2">Third item</div>
                </Stack>

                <h3>Stack 응용2</h3>
                <Stack gap={2} className="col-md-5 mx-auto">
                    <Button variant="secondary">Save changes</Button>
                    <Button variant="outline-secondary">Cancel</Button>
                </Stack>
            </Container> 
        </>
    )
}