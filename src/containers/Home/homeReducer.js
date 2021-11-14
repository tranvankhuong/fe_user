export default function homeReducer(state, action) {
  console.log({ action, state });
  // action = { type, payload }
  switch (action.type) {
    case "initHotCourse":
      return {
        ...state,
        hotCourse: action.payload.hotCourse,
      };
    case "initNewCourse":
      return {
        ...state,
        newCourse: action.payload.newCourse,
      };
    case "initPopularCourse":
      return {
        ...state,
        popularCourse: action.payload.popularCourse,
      };
    case "initTopCategories":
      return {
        ...state,
        topCategories: action.payload.topCategories,
      };
    case "initViewestCourse":
      return {
        ...state,
        viewestCourses: action.payload.viewestCourses,
      };
    case "initFeaturedCourse":
      return {
        ...state,
        featuredCourses: action.payload.featuredCourses,
      };
    default:
      return state;
  }
}
