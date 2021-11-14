import React, {useContext, useRef} from 'react'
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import SettingsContext from '../SettingsContext';
import {
    getFormattedDate
}from '../../../services/common.service'
import {
    updateUserEmail
}from '../../../services/user.service'
import Swal from "sweetalert2";

import { useHistory } from 'react-router-dom';
export default function ProfileInfo(){
    // const {store } = useContext(CourseContext)
    const history  = useHistory();

    const {store,dispatch} = useContext(SettingsContext)
    const newEmail = useRef("");
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const saveChanged_Clicked =async () =>{
        const checkEmail = validateEmail(newEmail.current.value)
        if(!checkEmail) {
            newEmail.current.value = ""
            return  Swal.fire({
                title: "Email không phù hợp. Xin hãy nhập lại",
                icon: "error",
            })
        }
        const updatedInfo={
            newEmail: newEmail.current.value,
        }
        const res = await updateUserEmail(updatedInfo);

        if(res.status ===201){

            dispatch({
                type:"update-email",
                payload:{
                    newEmail: newEmail.current.value,
                }
            })
            Swal.fire({

                title: "Đổi email thành công. Vui lòng xác thực tài khoản!",
                showCancelButton: true,
                confirmButtonText: `OK`
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    localStorage.usernameVerify = store.userInfo.username;  
                    history.push('/verify');
                } 

            })
            newEmail.current.value = ""
        }else{
            Swal.fire({
                title: "Cập nhật Email thất bại",
                icon: "error",
                confirmButtonText: `${res.data.message}`
            })
        }
    }



    return (
        <Card className="profile-card">

            <Card.Body>
                <Row className="justify-content-md-start profile-info-row">
                    <Col
                        md={4}
                    >
                        <div>New Email</div>

                        <Form.Control  placeholder="New Email..." className="border border-dark border-bottom" plaintext defaultValue={store.userInfo.email} ref={newEmail} />

                    </Col>
                </Row>
                <Row className="save-change-btn">
                   <Button className="" onClick={saveChanged_Clicked} variant="outline-success" size="sm">Save changes</Button>
                </Row>
            </Card.Body >

        </Card>                           
    )
}