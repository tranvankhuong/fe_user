import React, { useContext } from "react";
import mobileCourseContext from "../mobileCourseContext";
export default function MobileCourseList() {
  const { store } = useContext(mobileCourseContext);
  return (
    <div>
      <div>
        <h2 className="mb-1 text-left">MOBILE COURSES</h2>
      </div>
      <div className="row course-items-area">
      {store.mobileCourse.map((item) => (
          <div className="mix col-lg-3 col-md-4 col-sm-6 finance">
            <div className="course-item">
              <div
                style={{
                  backgroundImage: `url("http://localhost:3000/img/courses/${
                    item.course_id < 7 ? item.course_id : 1
                  }.jpg")`,
                }}
                className="course-thumb set-bg"
                data-setbg="img/courses/1.jpg"
              >
                <div className="price">
                  Price:{" "}
                  {store.mobileCourse && store.mobileCourse.length !== 0
                    ? item.price
                    : 0}
                  &#65284;
                </div>
              </div>
              <div className="course-info">
                <div className="course-text">
                  <h5>{item.course_name}</h5>
                  <p>{item.course_shortdescription}</p>
                  {/* <div className="students">{item.Saleoff!==0? item.saleoff*100:''} </div> */}
                  <i class="fa fa-cart-plus" aria-hidden="true">
                    {" "}
                    Add to Cart{" "}
                  </i>
                </div>
                <div className="course-author">
                  <div
                    className="ca-pic set-bg"
                    data-setbg="img/authors/1.jpg"
                  />
                  <p>
                    William Parker, <span>Developer</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
