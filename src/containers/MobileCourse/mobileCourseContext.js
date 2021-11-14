import { createContext } from 'react';

const defaultValue = {
    mobileCourse:[],
};
const mobileCourseContext = createContext(defaultValue);

export default mobileCourseContext;