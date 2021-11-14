import React, { useContext, useRef,useState } from 'react'
import SectionContextAwareToggle from './SectionContextAwareToggle'
import VideoContextAwareToggle from './VideoContextAwareToggle'
import { Card, Accordion, Badge, Button, Form, Row, Col,Modal } from 'react-bootstrap';
import {Player} from 'video-react'
import CourseEditingContext from '../courseEditingContext';
import Swal from 'sweetalert2'
import {addNewSection,deleteSection,updateSection,addVideo,updateVideo,uploadVideo,deleteVideo} from '../../../services/course.service'
export default function CourseContent(){
    const [editedSection,setEditedSection] = useState("");
    const [newVideo,setNewVideo] = useState("");
    const [updatedVideoInfo,setUpdatedVideoInfo] = useState({videoTitle:"", videoPreviewStatus:0});
    const [file, setFile] = useState({videoId:"",videoFile: ""});
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setFile({videoId:"",videoFile: ""});
        setShow(false)
    };
    const handleShow = (e) => {
        const videoId = parseInt(e.target.value);
        console.log("Clicked videoId:", videoId);
        setFile((preFileConfig)=>({
            ...preFileConfig,
            videoId:videoId
        }));
        setShow(true)
    };

    const {store,dispatch} = useContext(CourseEditingContext);
    const addNewSectionEle = useRef("");
    const sectionAdded_Clicked = async()=>{
        const newSectionTitle = addNewSectionEle.current.value;
        if( !newSectionTitle )
        {
            Swal.fire({
                title:"Please enter section title field before add!",
                icon:"error"
            })
        }else{
            const addNewSectionResponse  =await addNewSection(store.course.course_id,newSectionTitle);
            if(addNewSectionResponse.status ===201)
            {
                dispatch({
                    type: "add-section",
                    payload:{
                        newSection: addNewSectionResponse.data.newSection
                    }
                })
                Swal.fire({
                    title:"New section added!",
                    icon:"success"
                })
            }else{
                Swal.fire({
                    title:"Added new section failed",
                    text:`${addNewSectionResponse.data.message}`,
                    icon:"error"
                })
            }
            
        }
    }
    const handleEditSectionChange = (e) =>{
        setEditedSection(e.target.value);
        
    }
    const sectionEdited_Clicked =async (e) =>{
        const sectionId = parseInt(e.target.value)
        if(editedSection!==""){
            const res = await updateSection(sectionId,editedSection);
            if(res.status===201){
                dispatch({
                    type: "edit-section",
                    payload:{
                        sectionId: sectionId,
                        sectionTitle: editedSection
                    }
                })
                Swal.fire({
                    title:"Update section Title successfully!",
                    icon:"success"
                })
                setEditedSection("");
            }
            else{
                Swal.fire({
                    title:"Update section Title successfully!",
                    icon:"error"
                })
                setEditedSection("");

            }
           

        }
        else{
            Swal.fire({
                title: "Enter updated title!!",
                icon: "warning"
            })
        }


    }
    
    const sectionDeleted_Clicked =async (e) =>{
        const sectionId = parseInt(e.target.value);
        const res = await deleteSection(sectionId);
        if(res.status === 200){
            dispatch({
                type:"delete-section",
                payload: {
                    deletedSectionId: sectionId
                }
            })
            Swal.fire({
                title:"Delete section successfully",
                icon:"success"
            })
        }
        else{
            Swal.fire({
                title:"Delete section failed",
                icon:"error"
            })
        }
    }
    const handleAddNewVideoChange = (e) =>{
        setNewVideo(e.target.value);
    }
    const videoAdded_Clicked = async (e) =>{
        const sectionId = parseInt(e.target.value);
        if(newVideo!=="")
        {
            const res = await addVideo(sectionId,newVideo);
            if(res.status ===201){
                dispatch({
                    type: "add-video",
                    payload: {
                        sectionId: sectionId,
                        newVideo: res.data.newVideo,
                    }
                })
                Swal.fire({
                    title: "Add new video successfully!",
                    icon: "success"
                })
                setNewVideo("");
            }else{
                Swal.fire({
                    title: "Add new video fail!",
                    icon: "error"
                })
                setNewVideo("");
            }
            

        }
        else{
            Swal.fire({
                title: "Please Enter video title!!",
                icon: "warning"
            })
        }
    }
    const handlelEditVideoTitleChange =(e) =>{
        const {name, value} = e.target;
        setUpdatedVideoInfo((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }
    const updateVideo_Clicked =  async (e) =>{
        const videoId = parseInt(e.target.value);
        console.log("update video clicked",e.target.value,videoId,updatedVideoInfo);
        if(updatedVideoInfo.videoTitle !== ""){
            const res = await updateVideo(videoId,updatedVideoInfo.videoTitle,updatedVideoInfo.videoPreviewStatus);
            if(res.status === 201){
                dispatch({
                    type:"edit-video-title",
                    payload:{
                        videoId: videoId,
                        videoTitle: updatedVideoInfo.videoTitle,
                        videoPreviewStatus: parseInt(updatedVideoInfo.videoPreviewStatus)
                    }
                })
                Swal.fire({
                    title:"Update video title/status successfully!",
                    icon:"success"
                })
                setUpdatedVideoInfo({videoTitle:""})

            }else{
                Swal.fire({
                    title:"Opps>>Errorr!!",
                    text: `${res.data.message}`,
                    icon:"error"
                })
                setUpdatedVideoInfo({videoTitle:""})
            }
        }else{
            Swal.fire({
                title:"Opps>>Errorr!!",
                text: "Please change current video value!",
                icon:"error"
            })
        }
    }
    //Upload video
    const handleUploadVideoChange = (e) =>{
        console.log(e.target.files);
        const fileData = new FormData();
        fileData.append("video",e.target.files[0]);
        setFile((preFileConfig)=>({
            ...preFileConfig,
            videoFile:fileData
        }));
    }
    const handleUploadVideo_Clicked =async () =>{
        console.log(file);
        if(file.videoFile!==""&&file.videoId!==""){
            console.log("Upload video");
            const res  = await uploadVideo(parseInt(file.videoId),file.videoFile);
            if(res.status ===200){
                dispatch({
                    type:"upload-video",
                    payload:{
                        videoId: parseInt(file.videoId),
                        videoPath: res.data.videoPath
                    }
                })
                Swal.fire({
                    title: "Upload Course Video Successfully!",
                    icon: "success"
                })
                setShow(false);
            }else{
                Swal.fire({
                    title: "Thất bại!",
                    icon: "error",
                    confirmButtonText: `${res.data.message}`
                })
                setShow(false);
            }
        }else{
            Swal.fire({
                title:"Failed!",
                text:"Please select your video, Before submit",
                icon:"error"
            })
        }
        
    }
   
    const deleteVideo_Clicked =async (e) =>{
        const videoId = parseInt(e.target.value);
        console.log("deleteVideo_Clicked video clicked",e.target.value,videoId);
        const res  = await deleteVideo(videoId);
        if(res.status ===200){
            dispatch({
                type:"delete-video",
                payload:{
                    videoId: videoId,
                }
            })
            Swal.fire({
                title: "Delete video successfully!",
                icon: "success"
            })
        }else{
            Swal.fire({
                title: "Thất bại!",
                icon: "error",
                confirmButtonText: `${res.data.message}`
            })
        }
    }
    return(
        <Card className="course-card">
            <Card.Body>
                <Card.Title><h2 className="course-card-title">Course content</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{store.course.sections&&store.course.sections.length!==0?store.course.sections.length:0} Sections • 161 lectures • 8h 51m total length</Card.Subtitle>
                <Card.Text>
                    <div className=" justify-content-md-center">
                        <Form>
                            <Form.Group className="mb-3" controlId="addNewSectionEle">
                                <Form.Label>Section name</Form.Label>
                                <Form.Control ref={addNewSectionEle} placeholder="section xyzz name" />
                                <div className="d-flex justify-content-md-center">
                                    <Button style = {{height:"100%",width:"200px"}} onClick={sectionAdded_Clicked} variant="success">Add section</Button>
                                </div>
                            </Form.Group>
                        </Form>
                       
                    </div>
               
                    <div>
                        <Accordion >
                            {
                                store.course.sections?store.course.sections.map((section,index)=>
                                    <Card>
                                        <Card.Header>
                                            <SectionContextAwareToggle eventKey={index}>{section.section_title}</SectionContextAwareToggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={index}>
                                       
                                        <Card.Body>
                                            <div>
                                                <Row>
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control onChange={(e)=>handleEditSectionChange(e)} placeholder="section name" defaultValue={section.section_title}/>
                                                                <div className="d-flex justify-content-md-center">
                                                                    <Button value={section.section_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>sectionEdited_Clicked(e)} variant="primary">Update</Button>
                                                                </div>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                   
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3">
                                                                <Form.Control onChange={(e)=>handleAddNewVideoChange(e)}  placeholder="video name"/>
                                                                <div className="d-flex justify-content-md-center">
                                                                    <Button value={section.section_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>videoAdded_Clicked(e)} variant="success">Add Video</Button>
                                                                </div>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                    <Col>
                                                        <Form>
                                                            <Form.Group className="mb-3" >
                                                                <Form.Control readOnly value="Delete Section"/>
                                                                <div className="d-flex justify-content-md-center">
                                                                    <Button value={section.section_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>sectionDeleted_Clicked(e)} variant="danger">Delete</Button>
                                                                </div>
                                                            </Form.Group>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Accordion >
                                            { section.videos?section.videos.map((video,vIndex)=>
                                                <Card>
                                                    <Card.Header>
                                                        <VideoContextAwareToggle eventKey={vIndex}>{video.video_title}<Badge pill bg="danger">{video.preview_status?"Preview":""}</Badge></VideoContextAwareToggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse eventKey={vIndex}>
                                                        {store.course.isEdit?(<Card.Body>
                                                            <div>
                                                                <Row>
                                                                    <Col>
                                                                        <Row>
                                                                            <Card style={{width:"100%"}}>
                                                                                <Form >
                                                                                    <Form.Group className="mb-3">
                                                                                        <span>
                                                                                            Video title:
                                                                                            <Form.Control name="videoTitle" onChange={(e)=>handlelEditVideoTitleChange(e)} placeholder="video title" defaultValue={video.video_title}/>
                                                                                        </span>
                                                                                        <span>
                                                                                            Preview Status:(current is {video.preview_status === 1? "Preview": "UnPreview"})
                                                                                            <Form.Select name = "videoPreviewStatus"  onChange={(e)=>handlelEditVideoTitleChange(e)} defaultValue={video.preview_status}>
                                                                                                <option value={0}>UnPreview</option>
                                                                                                <option value={1}>Preview</option>
                                                                                            </Form.Select>
                                                                                        </span>
                                                                                        <div className="d-flex justify-content-md-center">
                                                                                            <Button value={video.video_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>updateVideo_Clicked(e)} variant="primary">Update</Button>
                                                                                        </div>
                                                                                    </Form.Group>
                                                                                </Form>
                                                                            </Card>
                                                                        </Row>
                                                                    
                                                                        <Row className="d-flex justify-content-md-center">
                                                                            <Form>
                                                                                <Form.Group className="mb-3">
                                                                                    <div className="d-flex justify-content-md-center">
                                                                                        <Button value={video.video_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>handleShow(e)} variant="success">Upload Video</Button>
                                                                                    </div>
                                                                                </Form.Group>
                                                                            </Form>
                                                                        </Row>
                                                                        <Row className="d-flex justify-content-md-center">
                                                                            <Form>
                                                                                <Form.Group className="mb-3" >
                                                                                    <div className="d-flex justify-content-md-center">
                                                                                        <Button value={video.video_id} style = {{height:"100%",width:"200px"}} onClick={(e)=>deleteVideo_Clicked(e)} variant="danger">Delete Video</Button>
                                                                                    </div>
                                                                                </Form.Group>
                                                                            </Form>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col>
                                                                        {video.video_path?
                                                                        <Player playsInline src = {"https://bct-onlinecourses-be.herokuapp.com/uploads/videos/"+video.video_path}></Player>
                                                                        :
                                                                        <div>Empty Video</div>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                            
                                                        </Card.Body>):<div>Dont have permission to Edit Course content</div>}
                                                    </Accordion.Collapse>
                                                </Card>
                                            ):(<div>Empty Video</div>)}
                                            </Accordion>
                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ):(<div>Empty Section</div>)
                            }
                        </Accordion>
                    </div>
                    
                </Card.Text>
            </Card.Body>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Choose Course Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="position-relative mb-3">
                        <Form.Label>File</Form.Label>
                        <Form.Control
                        type="file"
                        required
                        name="file"
                        onChange={(e)=>handleUploadVideoChange(e)}
                        //isInvalid={!!errors.file}
                        />
                        {/* <Form.Control.Feedback type="invalid" tooltip>
                        {errors.file}
                        </Form.Control.Feedback> */}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUploadVideo_Clicked}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )
}