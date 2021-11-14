export default function coursesReducer(state, action) {
  switch (action.type) {
    case "init":
      return {
        courses: action.payload.courses,
        maxPage: action.payload.maxPage,
      };
    default:
      return state;
  }
}
