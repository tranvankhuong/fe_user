import React, { useContext, useEffect, useRef, useState } from 'react';
import Rating from 'react-rating'
import {Card} from 'react-bootstrap'
import CourseContext from '../courseContext';
import emptyUser from '../../../assets/images/emptyUser.png'
import {getFormattedDate,getFormattedDateAllTime} from '../../../services/common.service'
import {getUserInfo} from '../../../services/user.service'
import {postRatingAndFeedBack} from '../../../services/course.service'

import io from "socket.io-client";

import Swal from 'sweetalert2';
const host = "https://bct-onlinecourses-be.herokuapp.com";
let socket;
export default function Review(){
    const {store,dispatch} = useContext(CourseContext);
    const [rate,setRate]  = useState("");
    const feedBackEle = useRef("");
    //socket io vars
    // const socketRef = useRef();
    const [id, setId] = useState();
    const [mess, setMess] = useState([]);


    const btnRatingClicked = (rate) =>{
        console.log(rate);
        setRate(rate);
    }
    useEffect(function(){
        async function loadCurrentUser(){
            const res = await getUserInfo();
            dispatch({
                type:"load-user",
                payload:{
                    user: res.data
                }
            })
        }
        loadCurrentUser()
        //socket connection
        socket = io(host);
        socket.on('getId', data => {
            setId(data)
        }) // phần này đơn giản để gán id cho mỗi phiên kết nối vào page. Mục đích chính là để phân biệt đoạn nào là của mình đang chat.
    
        socket.on('sendDataServer', dataGot => {
            console.log(dataGot.data.content);
            dispatch({
                type:"post-review",
                payload:{
                    newReview: dataGot.data.content
                }
            })
        }) // mỗi khi có tin nhắn thì mess sẽ được render thêm 
    
        return () => {
            socket.disconnect();
        };
    },[]);
    const btnComment_Clicked =async () =>{
        if(rate === "" || !feedBackEle.current.value){
            Swal.fire({
                title: "Error",
                text:"You must rate and leave comment",
                icon:"warning"
            })
        }
        else{
            if(!localStorage.accessToken){
                Swal.fire({
                    title: "Error",
                    text:"You must login",
                    icon:"warning"
                })
            }else{
                if(!store.course.isView){
                    Swal.fire({
                        title: "Error",
                        text:"You must buy this course",
                        icon:"warning"
                    })
                }else{
                    console.log("comment oke",rate,feedBackEle.current.value);
                    const res = await postRatingAndFeedBack(feedBackEle.current.value,rate,store.course.course_id);
                    if(res.status===200){
                        const msg = {
                            content: res.data.newReview, 
                            id: id
                        }
                        socket.emit('sendDataClient', msg)
                    
                        /*Khi emit('sendDataClient') bên phía server sẽ nhận được sự kiện có tên 'sendDataClient' và handle như câu lệnh trong file index.js
                              socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
                                socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
                              })
                        */

                    }else{
                        Swal.fire({
                            title: "Error",
                            text:`${res.data.message}`,
                            icon:"error"
                        })
                    }
                }
            }
        }
    }
    return (
        <Card className="course-card">
            <Card.Body>
                <Card.Title><h2 className="course-card-title">Reviews</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted"> 
                    <h4>
                        Rating: {store.course.averageRating?store.course.averageRating:5}
                        <a className="btn" onClick={()=>btnRatingClicked()}><Rating  emptySymbol="fa fa-star-o fa-sm"  fullSymbol="fa fa-star fa-sm"  fractions={2} initialRating={store.course.averageRating?store.course.averageRating:5} readonly="true"></Rating></a>
                        <span>
                            ({store.course.totalReview} ratings)
                        </span>
                    </h4>
                </Card.Subtitle>
                <Card.Body>
                    <div className="d-flex justify-content-center row">
                        <div className="d-flex flex-column col-md-8">
                            <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                <img className="img-fluid img-responsive rounded-circle mr-2" src={store.user.image?"https://bct-onlinecourses-be.herokuapp.com/uploads/profile/"+store.user.image:emptyUser} width="38"></img>
                                <a className="btn badge-rating"   >
                                    <Rating onClick={(rate)=>btnRatingClicked(rate)} onHover={(rate) => document.getElementById('label-onrate').innerHTML = rate || ''} emptySymbol="fa fa-star-o fa-sm"  fullSymbol="fa fa-star fa-sm"  fractions={10} initialRating={rate}></Rating>
                                    <span className="badge" id="label-onrate"></span>
                                </a>
                                <input ref={feedBackEle} type="text" className="form-control mr-3" placeholder="Add comment"></input>
                                <button onClick={btnComment_Clicked} className="btn btn-primary" style={{width:"200px"}} type="button">Comment</button>
                            </div>
                            <div className="coment-bottom bg-white p-2 px-4">
                                {store.reviews?
                                <div>
                                    {store.reviews.map(r=>(
                                        r?(
                                            <>
                                                <div className="commented-section mt-2">
                                                    <div className="d-flex flex-row align-items-center commented-user">
                                                        <img className="img-fluid img-responsive rounded-circle mr-2" src={r.userImage&&r.userImage.length!==0?"https://bct-onlinecourses-be.herokuapp.com/uploads/profile/"+r.userImage:emptyUser} width="38"></img>
                                                        <h5 className="mr-2">{r.userFullName}</h5>
                                                        <span className="dot mb-1"></span>
                                                        <div>
                                                            <a className="btn" onClick={()=>btnRatingClicked()}><Rating  emptySymbol="fa fa-star-o fa-sm"  fullSymbol="fa fa-star fa-sm"  fractions={2} initialRating={r.review_rating} readonly="true"></Rating></a>
                                                        </div>
                                                        <span className="mb-1 ml-2">{getFormattedDateAllTime(r.timestamp)} hours ago</span>
                                                    </div>
                                                    <div className="comment-text-sm">
                                                        <span>{r.review_feedback}</span>
                                                    </div>
                                                    <div className="reply-section">
                                                        <div className="d-flex flex-row align-items-center voting-icons">
                                                            <i className="fa fa-sort-up fa-2x mt-3 hit-voting"></i>
                                                            <i className="fa fa-sort-down fa-2x mb-3 hit-voting"></i>
                                                            <span className="ml-2">10</span>
                                                            <span className="dot ml-2"></span>
                                                            <h6 className="ml-2 mt-1">Reply</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ):"Null"
                                    ))}
                                </div>
                                :"Course hadn't have any comments! Register course and leave for us some comments ane#@!"
                                }
                                
                                
                            </div>
                            
                        </div>
                    </div>
                </Card.Body>
            </Card.Body>
        </Card>
        
    )
}