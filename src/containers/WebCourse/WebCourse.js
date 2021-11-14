import React, { useEffect, useReducer } from "react";

import "../../App.css";

import webCourseReducer from "./webCourseReducer";
import webCourseContext from "./webCourseContext";

import { getWebCourse } from "../../services/course.service";

import WebCourseList from "./components/WebCourseList";
import Section from "./components/Section";

export default function WebCourse() {
  const initialWebCourseState = {
    webCourse: [],
  };
  const [store, dispatch] = useReducer(webCourseReducer, initialWebCourseState);

  useEffect(function () {
    async function loadWebCourse() {
      const res = await getWebCourse();
      console.log('webcourse issss:');
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "initWebCourse",
          payload: {
            webCourse: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initWebCourse",
          payload: {
            webCourse: null,
          },
        });
      }
    }
    loadWebCourse();
  }, []);

  return (
    <div>
      <webCourseContext.Provider value={{ store, dispatch }}>
        <div className="container">
        <Section></Section>

          <div className="row">
              <WebCourseList> </WebCourseList>
          </div>
        </div>
      </webCourseContext.Provider>
    </div>
  );
}
