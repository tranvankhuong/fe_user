import React, {useState,useContext} from 'react'
import {Card, Button} from 'react-bootstrap'
import ReactQuill from 'react-quill';
import CourseEditingContext from '../courseEditingContext';
import {postCourseDescription} from "../../../services/course.service"
import Swal from 'sweetalert2'
export default function CourseDescription(){
    const {store,dispatch} =useContext(CourseEditingContext);
    const [value, setValue] = useState('');
    const sectionEdited_Clicked = async(e) =>{
        console.log("submit clicked", value);
        const res =await postCourseDescription(store.course.course_id,value)

        if(res.status === 200){
            dispatch({
                type:"post-course-description",
                payload:{
                    courseDescription: value,
                }
            })
            Swal.fire({
                title: "Post course description successfully!",
                icon:"success"
            })
        }
        else{
            Swal.fire({
                title: "Oops!",
                text: `${res.data.message}`,
                icon:"error"
            }) 
        }
    }
    const modules = {
        toolbar: {
          container: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: ["small", false, "large", "huge"] }, { color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { align: [] }
            ],
            ["link"],
            ["clean"]
          ],
        },
    };
    
    
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "size",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
        "align"
    ];
    return (
        <Card  className="course-card">
            <Card.Body>
                <Card.Title><h2 className="course-card-title">Course Descriptions</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Body>
                    <div>
                        <ReactQuill theme="snow"  value={value} defaultValue={store.course.course_description?store.course.course_description:""} onChange={setValue} modules={modules}
                        formats={formats}/>

                    </div>
                    <div className="d-flex justify-content-md-center">
                        <Button  style = {{height:"100%",width:"200px"}} onClick={(e)=>sectionEdited_Clicked(e)} variant="primary">Post description</Button>
                    </div>
                </Card.Body>
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
            </Card.Body>
        </Card>
    )
}