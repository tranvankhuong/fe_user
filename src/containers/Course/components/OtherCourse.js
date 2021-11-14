import React, { useContext } from   'react';
import {Card,Button,Row,Col} from 'react-bootstrap'
import emptyCourse from '../../../assets/images/emptyCourse.jpg'
import emptyUser from '../../../assets/images/emptyUser.png'
import Rating from 'react-rating'
import CourseContext from '../courseContext';
import { Link } from 'react-router-dom';
export default function OtherCourse(){
    const {store}  = useContext(CourseContext);
    const btnAddToCart_Clicked = (e) =>{
        console.log("(e)=>btnAddToCart_Clicked(e)");
    }
    const btnAddToWishList_Clicked = (e) =>{
        console.log("(e)=>btnAddToWishList_Clicked(e)");
    }
    return (
        <Card className="course-card">
            <Card.Body>
                <Card.Title> <h2 className="course-card-title">Hot courses</h2></Card.Title>
                <Card.Text>
                    <div>
                        <div className="row course-items-area">
                            {store.hotCourse && store.hotCourse.length !== 0?store.hotCourse.map((item)=>(
                            <div className="mix col-lg-3 col-md-4 col-sm-6 finance ">
                                <Link to={`/courses/${item.course_id}`} class=" hvr-shrink course-item" >
                                        <img
                                            className="course-thumb set-bg"
                                            src={item.course_image?`https://bct-onlinecourses-be.herokuapp.com/uploads/images/${item.course_image}`:emptyCourse}
                                        >
                                            
                                        </img>
                                        <div className="course-info">
                                            <div>
                                                <h5>{item.course_name}</h5>
                                                <p>{item.course_shortdescription}</p>
                                            </div>
                                            <h6 >
                                                {item.course_rv_point.toFixed(1)}
                                                <a className="btn" ><Rating  className = "course-rating" emptySymbol="fa fa-star-o fa-sm"  fullSymbol="fa fa-star fa-sm"  fractions={10} initialRating={item.course_rv_point} readonly="true"></Rating></a>
                                                <span>
                                                    ({item.totalReviews} ratings)
                                                </span>
                                            </h6>
                                            <h6 style={{paddingBottom:"10px",paddingTop:"10px"}}>Price: {parseInt(item.price*(1-item.saleoff))}VND <del class="badge badge-secondary">{item.price} VND</del> <span class="badge badge-warning">{item.saleoff*100}% off</span></h6>

                                            {/* <div className="students">{item.Saleoff!==0? item.saleoff*100:''} </div> */}
                                            <div className="course-author">
                                                <img
                                                    className="ca-pic set-bg"
                                                    src={item.lecturerImage?`https://bct-onlinecourses-be.herokuapp.com/uploads/profile/${item.lecturerImage}`:emptyUser}
                                                />
                                                <p>
                                                    {item.lecturerFullName},<span>Lecturer</span>
                                                </p>
                                            </div>
                                        </div>
                                </Link>
                            </div>
                            )):""}
                            
                        </div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}