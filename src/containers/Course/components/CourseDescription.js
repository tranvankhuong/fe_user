import React, { useContext } from 'react'
import {Card} from 'react-bootstrap'
import CourseContext from '../courseContext'

export default function CourseDescription(){
    const {store} = useContext(CourseContext)
    return (
        <Card  className="course-card">
            <Card.Body>
                <Card.Title><h2 className="course-card-title">Course Descriptions</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Body>
                    <div dangerouslySetInnerHTML={{__html:  store.course.course_description }}></div>
                </Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
        </Card>
    )
}