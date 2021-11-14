import React, {useContext, useRef} from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import SettingsContext from '../SettingsContext';

import {
    updateUserPassword
}from '../../../services/user.service'
import Swal from "sweetalert2";
export default function ProfileInfo(){
    // const {store } = useContext(CourseContext)
    const {store,dispatch} = useContext(SettingsContext)
    const currentPassword = useRef("");
    const newPassword = useRef("");
 

    const saveChanged_Clicked =async () =>{
        const updatedInfo={
            oldPassword: currentPassword.current.value,
            newPassword: newPassword.current.value,
        }
        if( currentPassword.current.value === "" || newPassword.current.value === "" ) {
            return  Swal.fire({
                title: "Vui lòng nhập mật khẩu",
                icon: "error",
            })
        } else {
            console.log('123',updatedInfo);
            const res = await updateUserPassword(updatedInfo);

            if(res.status ===201){

                dispatch({
                    type:"update-password",
                    payload:{
                        oldPassword: currentPassword.current.value,
                        newPassword: newPassword.current.value,
                    }
                })
                Swal.fire({

                    title: "Đổi mật khẩu thành công!",

                    icon: "success"
                })
            }else{
                Swal.fire({

                    title: "Cập nhật thất bại!",
                    icon: "error",
                    text: `${res.data.message}`

                })
            }
        }
       
    }
    return (
        <Card className="profile-card">    
            <Card.Body>
                <Row className="justify-content-md-start profile-info-row">
                    <Col
                        md={4}
                    >
                        <div>Current Password</div>

                        <Form.Control required type="password" className="border border-dark border-bottom" plaintext  ref={currentPassword} />

                    </Col>
                </Row>
                <Row className="justify-content-md-start profile-info-row">
                    <Col
                        md={4}
                    >
                        <div>New Password</div>

                        <Form.Control required type="password" className="border border-dark border-bottom" plaintext   ref={newPassword} />

                    </Col>
                </Row>
                <Row className="save-change-btn">
                   <Button className="" onClick={saveChanged_Clicked} variant="outline-success" size="sm">Save changes</Button>
                </Row>
            </Card.Body >

        </Card>                           
    )
}