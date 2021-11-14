import React, { useContext, useEffect, useState } from "react";
import homeContext from "../homeContext";
import emptyCourse from '../../../assets/images/emptyCourse.jpg'
import emptyUser from '../../../assets/images/emptyUser.png'
import Rating from "react-rating";
import {Row,Col} from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { AppContext } from "../../../contexts/AppProvider";
import { addToCart } from "../../../services/cart.service";
import { addToWatchList } from "../../../services/watchlist.service";
import Swal from "sweetalert2";
export default function HotCourse() {
    const [message, setMessage] = React.useState(null);
    const {changeCart, setChangeCart,changeWish, setChangeWish} = useContext(AppContext)
    const { store } = useContext(homeContext);
    const [isLiving,setIsLiving] = useState(false)
    const history = useHistory()
    const btnAddToCart_Clicked = (courseId)=>{
        console.log("CourseId clicked",courseId);
        const res = addToCart(courseId);
        res
        .then((res) => {
            if (res.status === 201) {
                console.log(res);
                setMessage(res.data.message);
                setChangeCart(!changeCart);
                Swal.fire({
                    title:"added",
                    icon:"success"
                })
            }
        })
        .catch((error) => {
            Swal.fire({
                title:"OPPS",
                text:`This course is already in your cart before`,
                icon:"error"
            })
            console.error(error)
        });
    }
    const btnAddToWishList_Clicked = (courseId)=>{
        console.log("CourseId clicked",courseId);
        const res = addToWatchList(courseId);
        res
        .then((res) => {
            console.log(res);
            setChangeWish(!changeWish);
            Swal.fire({
                title:"added",
                icon:"success"
            })
        })
        .catch((error) => {
            Swal.fire({
                title:"Must login",
                icon:"error"
            })
            console.error(error)
        });
    }
    const onMouseOut_Event = ()=>{
        setIsLiving(true);
    }
    const onMouseOver_Event = ()=>{
        setIsLiving(false);
    }
    const handleCourseItemRouting_Clicked = (courseId) =>{
        if(isLiving===true){
            history.push(`/courses/${courseId}`);
        }else{
            console.log("stay")

        }
    }
  return (
    <div>
      <div>
        <h2 className="mb-1 text-left">HOT COURSES</h2>
      </div>
      <div>
        <div className="row course-items-area">
            {store.hotCourse && store.hotCourse.length !== 0?store.hotCourse.map((item)=>(
              <div className="mix col-lg-3 col-md-4 col-sm-6 finance ">
                <a class=" hvr-shrink course-item" onClick={()=>handleCourseItemRouting_Clicked(item.course_id)}>
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
                            <Row className="course-item-addcart-row">
                                <Col>
                                    <a style={{color:"green",zIndex:9}} onMouseOver={()=>onMouseOver_Event()} onMouseOut={()=>onMouseOut_Event()}
                                    class="btn hvr-grow" onClick={()=>btnAddToCart_Clicked(item.course_id)}><i class="fa fa-cart-plus" aria-hidden="true">Cart</i></a>
                                </Col>
                                <Col>
                                    <a style={{color:"green"}} class="btn hvr-grow" onMouseOver={()=>onMouseOver_Event()} onMouseOut={()=>onMouseOut_Event()}
                                     onClick={()=>btnAddToWishList_Clicked(item.course_id)}><i class="fa fa-heart" aria-hidden="true">Wishlist</i></a>
                                </Col>
                            </Row>
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
                </a>
            </div>
             )):""}
          </div>
        </div>
    </div>
  );
}
