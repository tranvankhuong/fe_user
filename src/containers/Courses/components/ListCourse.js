/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { AppContext } from "../../../contexts/AppProvider";
import {
  getAllCourse,
  getCoursesByCategoryService,
  getCoursesSearchSort,
  getCoursSearch,
} from "../../../services/course.service";
import coursesReducer from "../coursesReducer";

function ListCourse({ category_id }) {
  const initialCourseState = {
    courses: [],
    maxPage: 0,
  };
  const [store, dispatch] = React.useReducer(
    coursesReducer,
    initialCourseState
  );
  const [page, setPage] = React.useState(1);
  const { search, setSearch } = React.useContext(AppContext);

  const setStore = React.useCallback((res) => {
    if (res.status === 200) {
      dispatch({
        type: "init",
        payload: {
          courses: res.data?.result,
          maxPage: res.data?.maxPage,
        },
      });
    }
    if (res.status === 204) {
      dispatch({
        type: "init",
        payload: {
          courses: null,
          maxPage: 0,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    async function getCourses() {
      let res = null;
      if (search) {
        console.log(search);
        onSearch(search, page);
        return;
      }
      if (category_id !== 0) {
        res = await getCoursesByCategoryService(page, category_id);
      } else {
        res = await getAllCourse(page);
      }

      console.log({ res });
      setStore(res);
    }

    getCourses();

    return () => {};
  }, [page, category_id]);

  React.useEffect(() => {
    setPage(1);
    return () => {};
  }, [category_id]);

  const onSearch = React.useCallback((value, page) => {
    async function getCourseSearch(search, page) {
      const res = await getCoursSearch(search, page);
      console.log({ res });
      setStore(res);
    }

    if (value) {
      getCourseSearch(value, page);
    }
    return;
  }, []);

  const onSearchAndSort = React.useCallback((value, page) => {
    async function getCoursesByPoint(search, page) {
      const res = await getCoursesSearchSort(search, page);
      console.log({ res });
      setStore(res);
    }
    getCoursesByPoint(value, page);
  }, []);

  const sortPrice = React.useCallback((store) => {
    let coursesSort = store.courses.sort((a, b) => a.price - b.price);
    dispatch({
      type: "init",
      payload: {
        courses: coursesSort,
        maxPage: store.maxPage,
      },
    });
  }, []);

  const changePage = (type) => {
    if (type === "next" && page < store.maxPage) {
      setPage(page + 1);
    } else if (type === "prev" && page > 1) {
      setPage(page - 1);
    }
    return;
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            setPage(1);
            onSearch(search, 1);
          }
        }}
      />
      <button
        onClick={() => {
          setPage(1);
          onSearch(search, 1);
        }}
      >
        Search
      </button>
      <button
        onClick={() => {
          sortPrice(store);
        }}
        disabled={search ? false : true}
      >
        Giá giảm
      </button>
      <button
        disabled={search ? false : true}
        onClick={() => onSearchAndSort(search, page)}
      >
        Điểm
      </button>
      <button onClick={() => changePage("prev")}>Prev</button>
      <button onClick={() => changePage("next")}>Next</button>
    </div>
  );
}

export default ListCourse;
