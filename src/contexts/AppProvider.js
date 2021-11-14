import React, { useEffect, useReducer } from "react";
import {loadAllCategory} from '../services/course.service'
import appReducer from "./appReducer";
const initialAppState = {
  categories: []
}
export const AppContext  = React.createContext(initialAppState)
function AppProvider({ children }) {
  const [search, setSearch] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [changeCart, setChangeCart] = React.useState(false);
  const [changeWish, setChangeWish] = React.useState(false);

  const [store,dispatch]  = useReducer(appReducer,initialAppState);
  useEffect(function(){
    async function loadCategories() {
      const res  = await loadAllCategory()
      console.log(res.data)
      dispatch({
        type:"initCategories",
        payload:{
          categories:res.data
        }
      })
    }
    loadCategories();
  },[])
  return (
    <AppContext.Provider
      value={{
        search,
        setSearch,
        message,
        setMessage,
        changeWish,
        setChangeWish,
        changeCart,
        setChangeCart
        ,store
        ,dispatch
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
