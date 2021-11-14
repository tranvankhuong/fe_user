import React, {useContext, useRef} from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import emptyUser from '../../../assets/images/emptyUser.png'
import ProfileContext from '../profileContext';
import {
    getFormattedDate
}from '../../../services/common.service'
import {
    updateUserInfo
}from '../../../services/user.service'
import Swal from "sweetalert2";
export default function ProfileInfo(){
    // const {store } = useContext(CourseContext)
    const {store,dispatch} = useContext(ProfileContext)
    const firstnameElement = useRef("");
    const lastnameElement = useRef("");
    const fullnameElement = useRef("");
    const descriptionElement = useRef("");
    const organizationElement = useRef("");

    const saveChanged_Clicked =async () =>{
        const updatedInfo={
            firstname: firstnameElement.current.value,
            lastname: lastnameElement.current.value,
            fullname: fullnameElement.current.value,
            description: descriptionElement.current.value,
            organization: organizationElement.current.value,
            
        }
        console.log(updatedInfo);
        const res = await updateUserInfo(updatedInfo);
        if(res.status ===200){
            dispatch({
                type:"update-info",
                payload:{
                    firstname: firstnameElement.current.value,
                    lastname: lastnameElement.current.value,
                    fullname: fullnameElement.current.value,
                    description: descriptionElement.current.value,
                    organization: organizationElement.current.value,
                }
            })
            Swal.fire({
                title: "Cập nhật thông tin thành công!",
                icon: "success"
            })
        }else{
            Swal.fire({
                title: "Cập nhật thông tin thành công!",
                icon: "error",
                confirmButtonText: `${res.data.message}`
            })
        }
    }
    return (
        <Card className="profile-card">
            
            
            <Card.Body>
                <Row className="justify-content-md-start profile-info-row">
                    <Col >
                        <div>First Name</div>
                        <Form.Control className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.firstname} ref={firstnameElement}/>
                    </Col>
                    <Col>
                        <div>Last Name</div>
                        <Form.Control className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.lastname}   ref={lastnameElement}/>
                    </Col>
                </Row>
                <Row className="justify-content-md-start profile-info-row">
                    <Col>
                        <div>Full Name</div>
                        <Form.Control className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.fullname} ref={fullnameElement} />
                    </Col>
                    <Col>
                        <div>DOB</div>
                        <Form.Control readOnly className="border border-dark border-bottom" plaintext defaultValue={getFormattedDate(store.userInfo.dob)} />
                    </Col>
                </Row>
                <Row className="justify-content-md-start profile-info-row">
                    <Col>
                        <div>Organization</div>
                        <Form.Control className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.organization}  ref={organizationElement} />
                    </Col>
                    <Col>
                        <div>Description</div>
                        <Form.Control className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.description}  ref={descriptionElement} />
                    </Col>
                </Row>
                <Row className="justify-content-md-end save-change-btn">
                   <Button className="" onClick={saveChanged_Clicked} variant="outline-success" size="sm">Save changes</Button>
                </Row>
            </Card.Body >
            {/* <Card.Footer className="card-img-footer">
                <small className="text-muted">Some thing some thing</small>
            </Card.Footer> */}
        </Card>                           
    )
}