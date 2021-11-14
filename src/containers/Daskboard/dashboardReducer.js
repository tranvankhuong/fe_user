export default function dashboardReducer(state, action) {
    // action = { type, payload }
    switch (action.type) {
        case 'init':
            return {
            course: action.payload.course
            }
        case 'init-categories':
            return {
                ...state,
                categories: action.payload.categories
            }
        case 'init-all-posted':
            return {
                ...state,
                courses: action.payload.courses
            }
        case 'add-newcourse':
            return {
                ...state,
                courses: [...state.courses,action.payload.newCourse]
            }
        default:
            return state;
    }
  }