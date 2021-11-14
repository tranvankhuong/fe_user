import React, { useEffect, useReducer } from "react";
import {useLocation} from 'react-router-dom';
import queryString from "query-string";
import "../../App.css";

import searchResultReducer from "./searchResultReducer";
import searchResultContext from "./searchResultContext";
import { Row,Col } from "react-bootstrap";
import { getSearchResult } from "../../services/course.service";

import SearchResultList from "./components/SearchResultList";
import FilterBar from "./components/FilterBar";
import OrderByBar from "./components/OrderByBar";

export default function SearchResult() {
  const {search} = useLocation();
  const {course,categoryId}=queryString.parse(search);
  const initialSearchResultCourseState = {
    backupCourses:[],
    searchResultCourse: [],

  };
  const [store, dispatch] = useReducer(
    searchResultReducer,
    initialSearchResultCourseState
  );
  useEffect(function () {
    async function loadSearchResultCourse() {
      console.log("queryString.parse(search)",queryString.parse(search),course,categoryId);
      const res = await getSearchResult(course,categoryId);
      console.log("resultcourse iisss:");
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "initSearchResultCourse",
          payload: {
            searchResultCourse: res.data.result,
          },
        });
      }
      if (res.status === 204) {
        dispatch({
          type: "initSearchResultCourse",
          payload: {
            searchResultCourse: null,
          },
        });
      }
    }
    loadSearchResultCourse();
  }, [course]);

  return (
    <div>
      <searchResultContext.Provider value={{ store, dispatch }}>
        <div className="container">
          <Row>
            <Col xs lg="3">
              <FilterBar></FilterBar>
            </Col>
            <Col>
              <OrderByBar></OrderByBar>

              <SearchResultList> </SearchResultList>


            </Col>
          </Row>
        </div>
      </searchResultContext.Provider>
    </div>
  );
}
