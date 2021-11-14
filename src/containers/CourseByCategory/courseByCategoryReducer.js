export default function courseByCategoryReducer(state, action) {
  console.log({action,state})
    // action = { type, payload }
    switch (action.type) {
      case 'init':
        return {
          ...state,
          courses: action.payload.courses,
        }
      default:
        return state;
    }
  }