import React, { useEffect, useReducer } from "react";

import "../../App.css";

import homeReducer from "./homeReducer";
import homeContext from "./homeContext";

import {
  getHotCourses,
  getNewCourses,
  getPopularCourses,
  getTopCategories,
  getViewestCourses,
  getFeaturedCourses,
} from "../../services/course.service";

import HotCourse from "./components/HotCourse";
import SlideShow1 from "./components/SlideShow1";
import PopularCourse from "./components/PopularCourse";
import ViewestCourse from "./components/ViewestCourse";
import NewCourse from "./components/NewCourse";
import Section from "./components/Section";
import TopCategories from "./components/TopCategories";
export default function Home() {
  const initialHomeState = {
    hotCourse: [],
    popularCourse: [],
    newCourse: [],
    viewestCourses: [],
    topCategories: [],
    featuredCourses: [],
  };
  const [store, dispatch] = useReducer(homeReducer, initialHomeState);

  useEffect(function () {
    async function loadHotCourse() {
      const res = await getHotCourses();

      if (res.status === 200) {
        dispatch({
          type: "initHotCourse",
          payload: {
            hotCourse: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initHotCourse",
          payload: {
            hotCourse: null,
          },
        });
      }
    }
    async function loadPopularCourse() {
      const res = await getPopularCourses();
      if (res.status === 200) {
        dispatch({
          type: "initPopularCourse",
          payload: {
            popularCourse: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initPopularCourse",
          payload: {
            popularCourse: null,
          },
        });
      }
    }
    async function loadNewCourse() {
      const res = await getNewCourses();
      if (res.status === 200) {
        dispatch({
          type: "initNewCourse",
          payload: {
            newCourse: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initNewCourse",
          payload: {
            newCourse: null,
          },
        });
      }
    }
    async function loadViewestCourses() {
      const res = await getViewestCourses();
      if (res.status === 200) {
        dispatch({
          type: "initViewestCourse",
          payload: {
            viewestCourses: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initViewestCourse",
          payload: {
            viewestCourses: [],
          },
        });
      }
    }
    async function loadFeaturedCourses() {
      const res = await getFeaturedCourses();
      if (res.status === 200) {
        dispatch({
          type: "initFeaturedCourse",
          payload: {
            featuredCourses: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initFeaturedCourse",
          payload: {
            featuredCourses: [],
          },
        });
      }
    }
    async function loadTopCategories() {
      const res = await getTopCategories();
      if (res.status === 200) {
        dispatch({
          type: "initTopCategories",
          payload: {
            topCategories: res.data,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initTopCategories",
          payload: {
            topCategories: [],
          },
        });
      }
    }
    loadHotCourse();
    loadPopularCourse();
    loadNewCourse();
    loadViewestCourses();
    loadTopCategories();
    loadFeaturedCourses();
  }, []);

  return (
    <div>
      <homeContext.Provider value={{ store, dispatch }}>
        <div className="container">
          <Section></Section>

          <div className="row">
            <div className="d-flex justify-content-between mb-5 slidesh">
              <SlideShow1> </SlideShow1>
            </div>
            <HotCourse> </HotCourse>
            <ViewestCourse> </ViewestCourse>
            <NewCourse> </NewCourse>
            <TopCategories> </TopCategories>
          </div>
        </div>
      </homeContext.Provider>
    </div>
  );
}
