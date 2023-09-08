// src/pages/Gallery.js

import { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import axios from "axios";

export default function Gallery(){
    const [formShow, setFormShow]=useState(false);
    const [galleryList, setGalleryList]=useState([]);

    const refresh = ()=>{
        axios.get("/gallery")
        .then(res=>{
            setGalleryList(res.data);
        })
        .catch(error=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        refresh();
    }, []);

    const BASE_URL="http://localhost:9000/boot08";
    return (
        <>
            <h3>Gallery 목록 입니다</h3>
            <Button variant="outline-success" onClick={()=>{setFormShow(true)}}>+</Button>
            <Row>
            {
                galleryList.map(item=>(
                    <Col sm={6} md={3} key={item.num}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`${BASE_URL}/gallery/images/${item.imagePath}`} />
                            <Card.Body>
                                <Card.Text>{item.caption}</Card.Text>
                                <Card.Text>writer : <strong>{item.writer}</strong></Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card> 
                    </Col> 
                ))
            }
            </Row>
            <UploadFormModal show={formShow} onClose={()=>{
                setFormShow(false);
                refresh();
            }}/>
        </>
    )
}


function UploadFormModal(props) {
    
    //입력한 설명 
    const [caption, setCaption]=useState("");
    //선택한 이미지 파일 
    const [image, setImage]=useState(null);
    //이미지를 선택했을때 실행되는 함수
    const handleChange=(e)=>{
        //선택한 파일 얻어내기
        const file = e.target.files[0];
        console.log(file);
        setImage(file);
    }

    const handleUpload = ()=>{
        //FormData 에  입력한 caption 과 image 파일 정보를 담아서
        const formData=new FormData();
        formData.append("caption", caption);
        formData.append("image", image);
        axios.post("/gallery", formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        .then(res=>{
            console.log(res.data);  
            props.onClose();
        })
        .catch(error=>{
            console.log(error);
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
            이미지 업로드 양식
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingInput" label="이미지 설명" className="mb-3">
            <Form.Control onChange={(e)=>setCaption(e.target.value)} name="caption" type="text"  placeholder="이미지 설명"/>
          </FloatingLabel>
          <FloatingLabel  controlId="floatingPassword" label="이미지 선택" className="mb-3">
            <Form.Control onChange={handleChange} name="image" type="file" accept="image/*" placeholder="이미지 선택" />
          </FloatingLabel>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpload}>업로드</Button>
        </Modal.Footer>
      </Modal>
    );
  }