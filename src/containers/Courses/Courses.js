import React from "react";
import { AppContext } from "../../contexts/AppProvider";
import ListCourse from "./components/ListCourse";

function Courses() {
  const [category, setCategory] = React.useState(0);
  const { setSearch } = React.useContext(AppContext);

  return (
    <>
      <h1>Hien thi ui</h1>
      <div>
        <button
          onClick={() => {
            setSearch("");
            setCategory(1);
          }}
        >
          WEB
        </button>
        <button
          onClick={() => {
            setSearch("");
            setCategory(2);
          }}
        >
          MOBILE
        </button>
        <ListCourse category_id={category} />
      </div>
    </>
  );
}

export default Courses;
