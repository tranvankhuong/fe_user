import React,{useEffect, useReducer} from 'react'
import { Container, Row,Card, Col } from 'react-bootstrap'
import ProfileImage from './components/ProfileImage'
import ProfileInfo from './components/ProfileInfo'
import profileReducer from './profileReducer';
import {
    getUserInfo
} from '../../services/user.service'

import ProfileContext from './profileContext';
export default function Profile(){
    const initialUserInfoState = {
        userInfo:{},
    };
    const [store, dispatch] = useReducer(profileReducer, initialUserInfoState);
    useEffect(()=>{
        async function loadUserInfo(){
            const res = await getUserInfo();
            dispatch({
                type: 'init',
                payload: {
                    user: res.data,
                }
            });
            console.log(store);
        }
        loadUserInfo();
    },[])
    return (
        <div>
            {store.userInfo?(
                <ProfileContext.Provider value={{store,dispatch}}>
                    <div className="course-content">
                        <Container  >
                            <Row className="justify-content-md-start course-row">
                                <h2>Avatar settings</h2>
                                <ProfileImage></ProfileImage>
                            </Row>
                            <Row className="justify-content-md-start course-row">
                                <h2>Profile settings</h2>
                                <ProfileInfo></ProfileInfo>
                            </Row>
                            
                        </Container>
                    </div>
                </ProfileContext.Provider>
            ):""}
            
        </div>
    )
}