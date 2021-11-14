import React, { useEffect, useReducer } from "react";

import "../../App.css";

import mobileCourseReducer from "./mobileCourseReducer";
import mobileCourseContext from "./mobileCourseContext";

import { getMobileCourse } from "../../services/course.service";

import MobileCourseList from "./components/MobileCourseList";
import Section from "./components/Section";

export default function WebCourse() {
  const initialMobileCourseState = {
    mobileCourse: [],
  };
  const [store, dispatch] = useReducer(mobileCourseReducer, initialMobileCourseState);

  useEffect(function () {
    async function loadMobileCourse() {
      const res = await getMobileCourse();
      console.log('mobilecourse issss:');
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "initMobileCourse",
          payload: {
            mobileCourse: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initMobileCourse",
          payload: {
            mobileCourse: null,
          },
        });
      }
    }
    loadMobileCourse();
  }, []);

  return (
    <div>
      <mobileCourseContext.Provider value={{ store, dispatch }}>
        <div className="container">
        <Section></Section>

          <div className="row">
              <MobileCourseList> </MobileCourseList>
          </div>
        </div>
      </mobileCourseContext.Provider>
    </div>
  );
}
