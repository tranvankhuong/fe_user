import React, { useContext, useEffect, useState } from "react";
import homeContext from "../homeContext";

import { useHistory } from "react-router-dom";

import { Carousel } from "react-bootstrap";

export default function SlideShow1() {
  const { store } = useContext(homeContext);
  console.log("popular course");
  console.log(store);
  console.log("popular course");

  const [index, setIndex] = useState(0);
  const history = useHistory();

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const Img_Click = function (courseId) {
    history.push(`/courses/${courseId}`);
  };
  return (
    <div>
      <Carousel fade>
        {store.featuredCourses.map((item) => (
          <Carousel.Item>
            <img
              // className="d-block w-100"
              className="d-block w-100 d-flex justify-content-between mb-4"
              src={
                item.course_image
                  ? `https://bct-onlinecourses-be.herokuapp.com/uploads/images/${item.course_image}`
                  : ""
              }
              alt="Course"
              height="500"
              onClick={() => Img_Click(item.course_id)}
            />
            <Carousel.Caption>
              {/* <h2 className="text-red">
                {item.course_name}
              </h2>
              <h2 className="text-white">{item.price}VND</h2>
              <p>{item.course_shortdescription}</p> */}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
