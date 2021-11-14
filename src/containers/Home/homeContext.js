import { createContext } from "react";

const defaultValue = {
  hotCourse: [],
  popularCourse: [],
  newCourse: [],
  topCategories: [],
  featuredCourses: [],
};
const homeContext = createContext(defaultValue);

export default homeContext;
