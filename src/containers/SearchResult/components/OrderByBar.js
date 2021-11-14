import React, { useContext, useState,useEffect } from "react";
import { FormSelect } from "react-bootstrap";
import searchResultContext from "../searchResultContext";
import {Col, Row} from 'react-bootstrap'
export default function OrderByBar() {
  const [searchOrderBy,setSearchOrderBy] = useState({orderBy:"default"});
  const {dispatch} = useContext(searchResultContext);
  useEffect(function(){
    console.log(searchOrderBy);
    dispatch({
        type: 'orderby-set',
        payload:{
            ...searchOrderBy
        }
    })
  },[searchOrderBy])
  const handleOrderByChange = (e)=> {
    console.log(e.target.value);
    // setSearchFilter((prevState)=>({
    //     ...prevState,
    //     ["categoryId"]:e.target.value
    // }));
    setSearchOrderBy({
        ["orderBy"]:e.target.value
    });
  }
  return (
    <div>
      <section className="course-section ">
        <div className="course-warp">
          <ul className="course-filter controls">
              <li className="control course-name">
                Order By:
              </li>
              <li className="control">
                <FormSelect onChange={(e)=>handleOrderByChange(e)} defaultValue="default" style={{width:"150px"}}>
                  <option value="default">Default</option>
                  <option value="newest">Newest</option>
                  <option value="highestRating">Highest Rating</option>
                  <option value="price">Price (lowest-highest)</option>
                </FormSelect>
              </li>
            </ul>
        </div>
      </section>
    </div>
  );
}
