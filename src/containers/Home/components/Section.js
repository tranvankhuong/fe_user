import React, { useContext } from "react";
//import homeContext from '../homeContext';
export default function Section() {
  // const {store} = useContext(homeContext);
  return (
    <div>
      <section className="course-section spad pb-0">
        <div className="course-warp">
          <ul className="course-filter controls">
            <li className="control active" data-filter="all">
              ALL
            </li>
            <li className="control" data-filter="/*  */.finance">
              HOT COURSES
            </li>
            <li className="control" data-filter=".design">
              POPULAR COURSES
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
