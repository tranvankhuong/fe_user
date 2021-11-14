import { render } from '@testing-library/react';
import React, {useContext,useRef,useState} from 'react'
import { Row, Col, Card, Modal, Button, Form } from 'react-bootstrap';
import emptyUser from '../../../assets/images/emptyUser.png'
import ProfileContext from '../profileContext';
import {updateUserImage} from '../../../services/user.service'
import Swal from "sweetalert2";
export default function ProfileImage(){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [file, setFile] = useState("");
    // const {store } = useContext(CourseContext)
    const {store,dispatch} = useContext(ProfileContext);
    
    const handleChange = (e) =>{
        console.log(e.target.files);
        const fileData = new FormData();
        fileData.append("image",e.target.files[0]);
        setFile(fileData);
    }
    const handleSaveChanges =async () =>{
        const res  = await updateUserImage(file);
        if(res.status ===201){
            dispatch({
                type:"update-image",
                payload:{
                    image: res.data.image
                }
            })
            Swal.fire({
                title: "Upload profile image thành công!",
                icon: "success"
            })
        }else{
            Swal.fire({
                title: "Thất bại!",
                icon: "error",
                confirmButtonText: `${res.data.message}`
            })
        }
    }
    return (
        <Card className="profile-card">
            <div>{store.userInfo.user_name}</div>
            
            <Card.Body className="card-img-body">
                
                <div>
                    <div class="media d-block d-sm-flex align-items-center">
                        <Card.Img className=" rounded-circle" style={{ width: '100px', height: '100px' }} variant="top" src={store.userInfo.image?"https://bct-onlinecourses-be.herokuapp.com/uploads/profile/"+store.userInfo.image:emptyUser}/>
                        <div class="media-body pl-sm-3 text-center text-sm-left">
                            <button class="btn btn-rounded btn-outline-primary btn-sm px-3 mb-2" type="button" onClick={handleShow}>
                                <i class="icon icon-sync"></i> Change avatar
                            </button>
                            <div>
                                <small class="text-muted">Upload JPG, GIF or PNG image. 100 x 100 required.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </Card.Body >
            {/* <Card.Footer className="card-img-footer">
                <small className="text-muted">Some thing some thing</small>
            </Card.Footer> */}
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
        </Card>                           
    )
}