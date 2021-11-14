import React, { useContext } from 'react'
import { Row, Col, Card} from 'react-bootstrap';
import CourseContext from '../courseContext';
import emptyUser from '../../../assets/images/emptyUser.png'
export default function CourseLecturerDescription(){
    const {store} = useContext(CourseContext)
    return(
        <Card className="course-card">
            <Card.Body>
                <Card.Title>
                    <h2 className="course-card-title">Instructor</h2>
                    <div><h3>{store.lecturer.fullname}</h3></div>
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{store.lecturer.organization}</Card.Subtitle>
                <Card.Body>
                    <Row className="justify-content-md-center">
                        <Col sm={4}>
                            {/* <Card.Text>
                                Lecturer Image
                            </Card.Text> */}
                            <img className="img-fluid img-responsive rounded-circle mr-2" src={store.lecturer.image?"https://bct-onlinecourses-be.herokuapp.com/uploads/profile/"+store.lecturer.image:emptyUser} width="200px"></img>
                            {/* <Card.Img  style={{width:"300px", height:"200px"}} src={store.lecturer.image?"https://bct-onlinecourses-be.herokuapp.com/uploads/profile/"+store.lecturer.image:emptyUser} ></Card.Img> */}
                        </Col>
                        <Col sm={8}>
                            <Card.Text>
                                <h4>
                                Lecturer description
                                </h4>
                                {store.lecturer.description}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card.Body>
        </Card>
    )
}