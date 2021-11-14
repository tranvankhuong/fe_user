import React, {useEffect, useReducer }  from 'react'
import courseReducer from './courseReducer'
import CourseContext from './courseContext'
import { useParams } from 'react-router';
import {getCourseSingleCourse,getReviewByCourseId,getHotCourses} from '../../services/course.service'
import {getLecturerInfo} from '../../services/user.service'

import {Container, Row, Col, Card } from 'react-bootstrap';

import CourseImage from './components/CourseImage'
import CourseInterview from './components/CourseInterview'
import {Redirect} from 'react-router-dom'
import CourseDescription from './components/CourseDescription'
import CourseContent from './components/CourseContent'
import CourseLecturerDescription from './components/CourseLecturerDescription'
import CourseReview from './components/CourseReview';
import OtherCourse from './components/OtherCourse';
function Course(){
    const  {courseId} = useParams();
    const initialCourseState = {
        course:{},
        lecturer: {},
        reviews: [],
        user:{}, 
        hotCourse: [],
    };
    const [store, dispatch] = useReducer(courseReducer, initialCourseState);

    useEffect(function () { 
        async function loadSingleCourse() {
            const res = await getCourseSingleCourse(courseId);
            if(res.status===200){
                dispatch({
                    type: 'init',
                    payload: {
                        course: res.data,
                    }
                });
                const lecturerRes = await getLecturerInfo(res.data.user_id);
                dispatch({
                    type: 'load-lecturer',
                    payload:{
                        lecturer: lecturerRes.data
                    }
                })
                const reviewRes = await getReviewByCourseId(courseId);
                dispatch({
                    type: 'load-reviews',
                    payload:{
                        reviews: reviewRes.data
                    }
                })
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
        async function loadHotCourse() {
            const res = await getHotCourses();
            
            if (res.status === 200) {
              dispatch({
                type: "initHotCourse",
                payload: {
                  hotCourse: res.data.length<=4?res.data:res.data.slice(0,4),
                },
              });
            }
            if (res.status === 204) {
              dispatch({
                type: "initHotCourse",
                payload: {
                  hotCourse: [],
                },
              });
            }
        }
        loadHotCourse()
        loadSingleCourse();
    },[]);
    const btnRatingClicked = () =>{
        console.log(store);
        console.log("Btn rating clicked");
    }
    return (
        <div>
            {store.course?(
                <CourseContext.Provider value={{ store, dispatch }}>
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
                        <Row className="justify-content-md-start course-row">
                            <CourseLecturerDescription></CourseLecturerDescription>
                        </Row>
                        <Row className="justify-content-md-start course-row">
                            <CourseReview></CourseReview>
                        </Row>
                        <Row className="justify-content-md-start course-row">
                            <OtherCourse></OtherCourse>
                        </Row>
                    </Container>
                </div>
            </CourseContext.Provider>
            ):(<Redirect to={{pathname:"/not-found"}}></Redirect>)}
        </div>
        
    )
}
export default Course;