import React,{useContext,useRef,useState} from 'react'
import { Button, Form, Row, Col } from 'react-bootstrap';
import CourseEditingContext from '../courseEditingContext';
import {updateCourseBasicInfo} from '../../../services/course.service'
import Swal from 'sweetalert2'
import { useForm } from 'react-hook-form';
export default function CourseInterview(){
    const {register,formState: { errors },handleSubmit} = useForm();
    const {store, dispatch } = useContext(CourseEditingContext)
    const courseNameEle = useRef("");
    const courseShortDescriptionEle  =useRef("");
    const coursePriceEle = useRef("");
    const courseSaleoffEle = useRef("");
    const courseCategoryIdEle = useRef("");
    const courseSectionCountEle  = useRef("");
    const courseStatusEle = useRef("");
    
    const onSubmit = async (data) =>{
        console.log(data);
        console.log(store);
        const updatedCourse={
            courseName: data.courseName1, 
            shortDescription: data.shortDescription1,
            categoryId:parseInt(data.categoryId1),
            price:parseInt(data.price1),
            saleoff:parseFloat(data.saleoff1),
            sectionCount:parseInt(data.sectionCount1),
            courseStatus: parseInt(data.courseStatus1)
        }
        console.log(updatedCourse);
        const res = await updateCourseBasicInfo(store.course.course_id,updatedCourse);
        if(res.status ===200){
            dispatch({
                type: "update-course-basic-info",
                payload: {
                    updatedCourse:updatedCourse
                }
            })
            Swal.fire({
                title:"Update course basic info success",
                icon:"success"
            })
        }else{
            Swal.fire({
                title:"Update course basic info success",
                icon:"fail"
            })
        }
    }
    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                  

                <Form.Group className="mb-3" controlId="courseName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={courseNameEle} {...register("courseName1",{required:true})} defaultValue={store.course.course_name} placeholder="abc course" />
                    {errors.courseName1?.type==="required" && "Course name is required"}
                </Form.Group>

                <Form.Group className="mb-3" controlId="shortDescription">
                    <Form.Label>Short Description</Form.Label>
                    <Form.Control ref={courseShortDescriptionEle} {...register("shortDescription1",{required:true})} defaultValue={store.course.course_shortdescription} placeholder="learning abc" />
                    {errors.shortDescription1?.type==="required" && "Short Description is required"}
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control ref={coursePriceEle} {...register("price1",{required:true})} defaultValue={store.course.price}  type="number"  />
                        {errors.price1?.type==="required" && "Price is required"}
                    </Form.Group>
                    <Form.Group as={Col} controlId="saleoff">
                        <Form.Label>Sale off</Form.Label>
                        <Form.Control ref={courseSaleoffEle} {...register("saleoff1",{required:true,min:0,max:1})} defaultValue={store.course.saleoff} type="number"  step="any" min="0" max="1"/>
                        {errors.saleoff1 && "Saleoff is required and value between(0,1)"}
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group  as={Col} controlId="sectionCount">
                        <Form.Label>Sections</Form.Label>
                        <Form.Control ref={courseSectionCountEle} {...register("sectionCount1",{required:true, min:0, max:20})} defaultValue={store.course.section_count} type="number"/>
                        {errors.sectionCount1 && "Sections is required and value between(0,20)"}
                    </Form.Group>
                    <Form.Group  as={Col} controlId="categoryId">
                        <Form.Label>Category</Form.Label>
                        <div>
                            <Form.Select style={{width:"100%",height:"33px"}} ref={courseCategoryIdEle} {...register("categoryId1")}  defaultValue={store.course.category_id}>
                            {store.categories?store.categories.map((c)=><option value={c.category_id}>{c.category_name}</option>):""}
                            </Form.Select>
                        </div>
                    </Form.Group>
                </Row>
                <Form.Group  className="mb-3" controlId="courseStatus">
                    <Form.Label>Course Status</Form.Label>
                    <Form.Select  ref={courseStatusEle} {...register("courseStatus1")} defaultValue={store.course.course_status}>
                        <option value={0}>Chưa hoàn thành</option>
                        <option value={1}>Đã hoàn thành</option>
                    </Form.Select>
                </Form.Group>
                <div className=" d-flex justify-content-md-center">
                    <Button type="submit" variant="success">Change basic info</Button>

                </div>
            </Form>
            
        </div>
    )
}