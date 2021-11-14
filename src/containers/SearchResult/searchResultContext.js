import { createContext } from 'react';

const defaultValue = {
    searchResultCourse:[],
};
const searchResultContext = createContext(defaultValue);

export default searchResultContext;