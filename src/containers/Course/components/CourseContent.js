import React, { useContext } from 'react'
import SectionContextAwareToggle from './SectionContextAwareToggle'
import VideoContextAwareToggle from './VideoContextAwareToggle'
import { Card, Accordion, Badge } from 'react-bootstrap';
import CourseContext from '../courseContext';
import {Player} from 'video-react'
export default function CourseContent(){
    const {store} = useContext(CourseContext);
    return(
        <Card className="course-card">
            <Card.Body>
                <Card.Title><h2 className="course-card-title">Course content</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{store.course.sections&&store.course.sections.length!==0?store.course.sections.length:0} Sections • 161 lectures • 8h 51m total length</Card.Subtitle>
                <Card.Text>
                    <Accordion >
                        {
                            store.course.sections?store.course.sections.map((section,index)=>
                                <Card>
                                    <Card.Header>
                                        <SectionContextAwareToggle eventKey={index}>{section.section_title}</SectionContextAwareToggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey={index}>
                                    <Card.Body>
                                        <Accordion >
                                        { section.videos?section.videos.map((video,vIndex)=>
                                            <Card>
                                                <Card.Header>
                                                    <VideoContextAwareToggle eventKey={vIndex}>{video.video_title}<Badge pill bg="danger">{video.preview_status?"Preview":""}</Badge></VideoContextAwareToggle>
                                                </Card.Header>
                                                <Accordion.Collapse eventKey={vIndex}>
                                                    {(video.preview_status||store.course.isView)?(<Card.Body>
                                                        {video.video_path?<Player playsInline src = {"https://bct-onlinecourses-be.herokuapp.com/uploads/videos/"+video.video_path}></Player>:<div>Empty video</div>}
                                                    </Card.Body>):<div>Empty</div>}
                                                </Accordion.Collapse>
                                            </Card>
                                        ):(<div>Empty</div>)}
                                        </Accordion>
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ):(<div>Empty</div>)
                        }
                        {/* <Card>
                            <Card.Header>
                            <SectionContextAwareToggle eventKey="0">• (30 minutes)</SectionContextAwareToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                
                                <Accordion >
                                    <Card>
                                        <Card.Header>
                                        <VideoContextAwareToggle eventKey="0">Video 1</VideoContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            Hello! I'm body
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card>
                                        <Card.Header>
                                        <VideoContextAwareToggle eventKey="1">Video 2</VideoContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <SectionContextAwareToggle eventKey="1">Section 2</SectionContextAwareToggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card> */}
                    </Accordion>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}