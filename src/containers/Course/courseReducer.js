export default function courseReducer(state, action) {
    // action = { type, payload }
    switch (action.type) {
      case 'init':
        return {
          ...state,
          course: action.payload.course
        }
      case 'load-lecturer':
        return {
          ...state,
          lecturer: action.payload.lecturer
        }
      case 'load-reviews':
        return{
          ...state,
          reviews: action.payload.reviews
        }
      case 'load-user':
        return{
          ...state,
          user: action.payload.user
        }
      case 'post-review':
        return{
          ...state,
          reviews: [action.payload.newReview,...state.reviews]
        }
      case 'initHotCourse':
        return {
          ...state,
          hotCourse: action.payload.hotCourse,
        }
      default:
        return state;
    }
  }