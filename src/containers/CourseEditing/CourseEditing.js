import React,{useReducer,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import CourseEditingContext from './courseEditingContext';
import courseEditingReducer from './courseEditingReducer';

import {getCourseSingleCourse, loadAllCategory} from '../../services/course.service'
import {getLecturerInfo} from '../../services/user.service'

import {Container, Row, Col, Card } from 'react-bootstrap';

import CourseImage from './components/CourseImage'
import CourseInterview from './components/CourseInterview'
import {Redirect} from 'react-router-dom'
import CourseDescription from './components/CourseDescription'
import CourseContent from './components/CourseContent'

export default function CourseEditing(){
    const  {courseId} = useParams();
    const initialCourseEditingState = {
        course:{},
        categories:[],
    };
    const [store, dispatch] = useReducer(courseEditingReducer, initialCourseEditingState);

    useEffect(function () { 
        async function loadCategories(){
            const loadCateRes = await loadAllCategory();
            if (loadCateRes.status === 200){
              dispatch({
                type: 'init-categories',
                payload: {
                  categories:loadCateRes.data
                }
              })
            }
          } 
        async function loadSingleCourse() {
            const res = await getCourseSingleCourse(courseId);
            if(res.status===200){
                dispatch({
                    type: 'init',
                    payload: {
                        course: res.data,
                    }
                });
            }
            if(res.status ===204){
                dispatch({
                    type: 'init',
                    payload: {
                        course: null,
                    }
                });
            }
        }
        loadCategories();
        loadSingleCourse();
    },[]);
    return (
        <div>
            {store.course?(
                <CourseEditingContext.Provider value={{ store, dispatch }}>
                <div className="course-content">
                    <Container  >
                        <Row className="justify-content-md-start course-row">
                            <Card className="course-card">
                                <Row >
                                    <Col sm={4}>
                                        <CourseImage></CourseImage>
                                    </Col>
                                    <Col  sm={8}>
                                        <CourseInterview></CourseInterview>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                        <Row className="justify-content-md-start course-row">
                            <CourseDescription></CourseDescription>
                        </Row>
                        <Row className="justify-content-md-start course-row">
                            <CourseContent></CourseContent>
                        </Row>
                       
                    </Container>
                </div>
            </CourseEditingContext.Provider>
            ):(<Redirect to={{pathname:"/not-found"}}></Redirect>)}
            
        </div>
        
    )
}