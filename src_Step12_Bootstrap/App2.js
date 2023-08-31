
import {Col, Container, Row} from 'react-bootstrap';
import {useState} from 'react';

export default function App2(){
    //칼럼의 크기를 상태값으로 관리
    const [size, setSize]=useState(6);

    return (
        <>
            <div className="container">
                <h1>React Bootstrap 사용하기</h1>
                <div className="row">
                    <div className="col">컬럼1</div>
                    <div className="col">칼럼2</div>
                </div>
            </div>
            <Container>
                <h1>React BootStrap 사용하기</h1>
                <Row>
                    <Col>칼럼1</Col>
                    <Col>칼럼2</Col>
                </Row>
            </Container>

            <Container fluid>
                <h1>fluid Container</h1>
                <p>모든 영역에 대해서 fluid</p>
            </Container>

            <Container fluid="md">
                <h1>조건부 fluid Container</h1>
                <p> 폭이 768px 미만 일때만 fluid</p>
                <p> 폭이 768px 이상 일때는 일반 container</p>
            </Container>

            <Container>
                <Row>
                    <Col>1 of 3</Col>
                    {/* xs={ javascript 데이터 } */}
                    <Col xs={6}> 모든 영역에 대해서 6/12</Col>
                    <Col>3 of 3</Col>
                </Row>
                <Row>
                    <Col>남은 크기는 내가</Col>
                    <Col xs={size}>
                        <input onChange={(e)=>{
                            setSize(Number(e.target.value));
                        }} type="number" value={size} min="1" max="11" step="1"/>
                    </Col>
                </Row>
                <h1>반응형 크기</h1>
                <Row>
                    <Col  md="6" lg="3">칼럼1</Col>
                    <Col  md="6" lg="3">칼럼2</Col>
                    <Col  md="6" lg="3">칼럼3</Col>
                    <Col  md="6" lg="3">칼럼4</Col>
                </Row>
            </Container>
        </>
    )
}