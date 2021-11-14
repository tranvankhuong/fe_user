import React, {useContext,useState} from 'react'
import { Row, Col, Card,Button, Form, Modal } from 'react-bootstrap';
import emptyCourse from '../../../assets/images/emptyCourse.jpg'
import CourseEditingContext from '../courseEditingContext';
import Swal from 'sweetalert2'
import {updateCourseImage} from '../../../services/course.service'
export default function CourseImage(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState("");
    const {store,dispatch } = useContext(CourseEditingContext)
    const testOnclicked = () =>{
        console.log(store);
    }
    
    const handleChange = (e) =>{
        console.log(e.target.files);
        const fileData = new FormData();
        fileData.append("image",e.target.files[0]);
        setFile(fileData);
    }
    const handleSaveChanges =async () =>{
        console.log(file);
        const res  = await updateCourseImage(store.course.course_id,file);
        if(res.status ===201){
            dispatch({
                type:"update-course-image",
                payload:{
                    newImage: res.data.newImage
                }
            })
            Swal.fire({
                title: "Upload Course image thành công!",
                icon: "success"
            })
            setShow(false);
        }else{
            Swal.fire({
                title: "Thất bại!",
                icon: "error",
                confirmButtonText: `${res.data.message}`
            })
            setShow(false);
        }
    }
    return (
        <>
            <Card border="light" style={{ width: '350px' }}>
                <Card.Img className="card-img-img" variant="top" src={store.course.course_image?"https://bct-onlinecourses-be.herokuapp.com/uploads/images/"+store.course.course_image:emptyCourse} />
                <Card.Body className="card-img-body">
                    <Row>
                        <Button onClick={handleShow} variant="danger" style={{width:"100%"}}>Change Course Image</Button>
                    </Row>
                    {/* <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                    </Card.Text> */}
                </Card.Body >
                {/* <Card.Footer className="card-img-footer">
                    <small className="text-muted">Some thing some thing</small>
                </Card.Footer> */}
            </Card>    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Choose your profile image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control
                        type="file"
                        required
                        name="file"
                        onChange={(e)=>handleChange(e)}
                        //isInvalid={!!errors.file}
                        />
                        {/* <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                        </Form.Control.Feedback> */}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </>                       
    )
}