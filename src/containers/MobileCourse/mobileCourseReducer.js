export default function mobileCourseReducer(state, action) {
  console.log({action,state})
    // action = { type, payload }
    switch (action.type) {
      case 'initMobileCourse':
        return {
          ...state,
          mobileCourse: action.payload.mobileCourse,
        }
      default:
        return state;
    }
  }