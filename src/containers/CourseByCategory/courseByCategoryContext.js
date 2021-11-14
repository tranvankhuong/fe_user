import { createContext } from 'react';

const defaultValue = {
    courses:[],
};
const courseByCategoryContext = createContext(defaultValue);

export default courseByCategoryContext;