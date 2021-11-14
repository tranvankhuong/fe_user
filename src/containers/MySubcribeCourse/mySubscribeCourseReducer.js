export default function mySubscribeCourseReducer(state, action) {
    // action = { type, payload }
    switch (action.type) {
        case 'init':
            return {
            courses: action.payload.courses
            }
        default:
            return state;
    }
  }