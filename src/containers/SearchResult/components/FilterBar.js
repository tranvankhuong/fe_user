import React, { useContext,useState, useEffect } from "react";
//import homeContext from '../homeContext';
import { FormSelect, Row} from 'react-bootstrap'
import searchResultContext from "../searchResultContext";
export default function FilterBar() {
  // const {store} = useContext(homeContext);
  const [searchFilter,setSearchFilter] = useState({categoryId:"all",saleoff:"all"});
  const {dispatch} = useContext(searchResultContext);
  useEffect(function(){
    console.log(searchFilter);
    dispatch({
        type: 'filter-set',
        payload:{
            ...searchFilter
        }
    })
  },[searchFilter])
  const handleFilterByCategory = (e)=> {
    console.log(e.target.value);
    // setSearchFilter((prevState)=>({
    //     ...prevState,
    //     ["categoryId"]:e.target.value
    // }));
    setSearchFilter({
        ...searchFilter,
        ["categoryId"]:e.target.value
    });
  }
  const handleFilterBySaleoff = (e)=> {
    console.log(e.target.value);
    setSearchFilter({
        ...searchFilter,
        ["saleoff"]:e.target.value
    });
  }
  return (
    <div>
      <section className="course-section ">
        <div className="course-warp">
          <ul className="course-filter controls">
              <li className="control course-name">
                <h5>Search Result Filter</h5>
                
              </li>
              <li className="control">
                <h5>Category</h5>
                <FormSelect onChange={(e)=>handleFilterByCategory(e)} defaultValue="all" style={{width:"150px"}}>
                  <option value="all">All</option>
                  <option value={1}>Web Course</option>
                  <option value={2}>Mobile Course</option>
                </FormSelect>
              </li>
              <li className="control">
                <h5>Saleoff</h5>
                <FormSelect onChange={(e)=>handleFilterBySaleoff(e)} defaultValue="all" style={{width:"150px"}}>
                <option value="all">all</option>
                <option value="low">0-30%</option>
                <option value="normal">30-70%</option>
                <option value="high">70-100%</option>
                </FormSelect>   
              </li>
            </ul>
        </div>
      </section>
    </div>
  );
}
