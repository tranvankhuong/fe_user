import { createContext } from 'react';

const defaultValue = {
    webCourse:[],
};
const webCourseContext = createContext(defaultValue);

export default webCourseContext;