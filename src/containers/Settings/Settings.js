import React,{useEffect, useReducer} from 'react'
import { Container, Row,Card, Col } from 'react-bootstrap'
import ChangePasswordInfo from './components/ChangePasswordInfo'
import ChangeEmailInfo from './components/ChangeEmailInfo'

import SettingsReducer from './SettingsReducer';
import {
    getUserInfo
} from '../../services/user.service'

import SettingsContext from './SettingsContext';
export default function ChangePassword(){
    const initialUserInfoState = {
        userInfo:{},
    };
    const [store, dispatch] = useReducer(SettingsReducer, initialUserInfoState);
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
                <SettingsContext.Provider value={{store,dispatch}}>
                    <div className="course-content">
                        <Container  >
                            <Row className="justify-content-md-start course-row">
                                <h2>Change Email</h2>
                                <ChangeEmailInfo></ChangeEmailInfo>
                            </Row>
                            <Row className="justify-content-md-start course-row">
                                <h2>Change Password settings</h2>
                                <ChangePasswordInfo></ChangePasswordInfo>
                            </Row>
                            
                        </Container>
                    </div>
                </SettingsContext.Provider>
            ):""}
            
        </div>
    )
}