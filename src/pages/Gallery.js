// src/pages/Gallery.js

import { useEffect, useState } from "react";
import { Button, Card, Col, FloatingLabel, Form, Modal, Pagination, Row } from "react-bootstrap";
import axios from "axios";

export default function Gallery(){
    const [formShow, setFormShow]=useState(false);
    //const [galleryList, setGalleryList]=useState([]);
    const [pageInfo, setPageInfo]=useState({
      content:[]
    });
    //페이징 UI 에 사용할 배열
    const [pageArray, setPageArray]=useState([]);

    //페이징 UI 를 만들때 사용할 배열을 리턴해주는 함수 
    function createArray(start, end) {
      const result = [];
      for (let i = start; i <= end; i++) {
          result.push(i);
      }
      return result;
    }
    const PAGE_DISPLAY_COUNT=5;
    //겔러리 목록 새로 고침하는 메소드 
    const refresh = (pageNum)=>{
        axios.get("/gallery?pageNum="+pageNum)
        .then(res=>{
            console.log(res.data);
            setPageInfo(res.data);
            //페이징 UI 관련 처리
            const startPageNum=1+Math.floor((pageNum-1)/PAGE_DISPLAY_COUNT)*PAGE_DISPLAY_COUNT;
            let endPageNum=startPageNum+PAGE_DISPLAY_COUNT-1;
            if(endPageNum > res.data.totalPages){
              endPageNum=res.data.totalPages;
            }
            setPageArray(createArray(startPageNum, endPageNum));
        })
        .catch(error=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        refresh(1);
    }, []);

    const BASE_URL="http://localhost:9000";



    return (
        <>
            <h3>Gallery 목록 입니다</h3>
            <Button variant="outline-success" onClick={()=>{setFormShow(true)}}>+</Button>
            <Row>
            {
                pageInfo.content.map(item=>(
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

            <Pagination className="mb-3">
              <Pagination.Item onClick={()=>{
                const pageNum=pageArray[0]-1;
                refresh(pageNum);
              }} disabled={pageArray[0] === 1}>&laquo;</Pagination.Item>
              {
                pageArray.map(num=>(<Pagination.Item onClick={()=>{
                  refresh(num);
                }} key={num} active={num === pageInfo.number+1}>{num}</Pagination.Item>))
              }
              <Pagination.Item onClick={()=>{
                // endPageNum+1
                const pageNum=pageArray[pageArray.length-1]+1;
                refresh(pageNum);
              }} disabled={pageArray[pageArray.length-1]+1 >= pageInfo.totalPages}>&raquo;</Pagination.Item>
            </Pagination>
            <UploadFormModal show={formShow} onClose={()=>{
                //모달을 숨기고 
                setFormShow(false);
                //데이터를 다시 받아와서 화면 refresh
                refresh(1);
            }}/>
        </>
    )
}


function UploadFormModal(props) {
    
    //입력한 설명 
    const [caption, setCaption]=useState("");
    //선택한 이미지 파일 
    const [image, setImage]=useState(null);
    //선택한 이미지 preview 관련 state
    const [previewImage, setPreviewImage]=useState(null);

    //이미지를 선택했을때 실행되는 함수
    const handleChange=(e)=>{
        //선택한 파일 얻어내기
        const file = e.target.files[0];
        console.log(file);
        setImage(file);
        //선택한 파일로 부터 이미지 로딩하기
        const reader=new FileReader();
        reader.readAsDataURL(file);
        reader.onload=(event)=>{
          //읽은 파일 데이터 얻어내기 
					const data=event.target.result;
          setPreviewImage(data);
        };
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
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={previewImage} />
            <Card.Body>
              <Card.Text>{caption}</Card.Text>
            </Card.Body>
          </Card> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpload}>업로드</Button>
        </Modal.Footer>
      </Modal>
    );
  }