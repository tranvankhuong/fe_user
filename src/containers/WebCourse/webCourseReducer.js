export default function webCourseReducer(state, action) {
  console.log({action,state})
    // action = { type, payload }
    switch (action.type) {
      case 'initWebCourse':
        return {
          ...state,
          webCourse: action.payload.webCourse,
        }
      default:
        return state;
    }
  }