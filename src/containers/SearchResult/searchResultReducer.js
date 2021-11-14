import {sortCourseByCreatedDateFunction,sortCourseByPriceFunction,sortCourseByRatingFunction} from '../../services/common.service'
export default function searchResultReducer(state, action) {
  console.log({action,state})
    // action = { type, payload }
    switch (action.type) {
      case 'initSearchResultCourse':
        return {
          ...state,
          backupCourses: action.payload.searchResultCourse,
          searchResultCourse: action.payload.searchResultCourse,
        }
      case 'filter-set':
        let tempSearchResult = state.backupCourses;  
        if(action.payload.categoryId !== "all"){
          tempSearchResult = tempSearchResult.filter(c=>c.category_id == parseInt(action.payload.categoryId))
        }     
        if(action.payload.saleoff === "low"){
          tempSearchResult = tempSearchResult.filter(c=>c.saleoff >= 0 && c.saleoff <= 0.3)
        }else if(action.payload.saleoff === "normal")
        {
          tempSearchResult = tempSearchResult.filter(c=>c.saleoff >= 0.3 && c.saleoff <= 0.7)
        }else if(action.payload.saleoff === "high")
        {
          tempSearchResult = tempSearchResult.filter(c=>c.saleoff >= 0.7 && c.saleoff <= 1)
        }
        
        return {
          ...state,
          searchResultCourse: tempSearchResult
        }
      case "orderby-set":
        let tempOrderByResult = state.backupCourses;
        if(action.payload.orderBy === "newest"){
          tempOrderByResult = tempOrderByResult.sort(sortCourseByCreatedDateFunction);
        }else if(action.payload.orderBy === "highestRating"){
          tempOrderByResult = tempOrderByResult.sort(sortCourseByRatingFunction);
        }else if(action.payload.orderBy === "price")
        {
          tempOrderByResult = tempOrderByResult.sort(sortCourseByPriceFunction);
        }
        return {
          ...state,
          searchResultCourse: tempOrderByResult
        }
      default:
        return state;
    }
  }