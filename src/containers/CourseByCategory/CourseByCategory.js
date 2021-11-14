import React, { useEffect, useReducer } from "react";

import "../../App.css";
import { useParams } from "react-router";
import courseByCategoryReducer from "./courseByCategoryReducer";
import CourseByCategoryContext from "./courseByCategoryContext";

import { getCoursesByCategoryId } from "../../services/course.service";

import CourseList from "./components/CourseList";
import Section from "./components/Section";

export default function CourseByCategory() {
  const  {categoryId} = useParams();
  const initialCourseByCategoryState = {
    courses: [],
  };
  const [store, dispatch] = useReducer(courseByCategoryReducer, initialCourseByCategoryState);

  useEffect(function () {
    async function loadCoursesByCategoryId(categoryId) {
      const res = await getCoursesByCategoryId(categoryId);
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "init",
          payload: {
            courses: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "init",
          payload: {
            courses: [],
          },
        });
      }
    }
    loadCoursesByCategoryId(categoryId);
  }, []);

  return (
    <div>
      <CourseByCategoryContext.Provider value={{ store, dispatch }}>
        <div className="container">
        <Section></Section>

          <div className="row">
              <CourseList> </CourseList>
          </div>
        </div>
      </CourseByCategoryContext.Provider>
    </div>
  );
}
