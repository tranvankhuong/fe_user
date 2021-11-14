export default function appReducer(state, action) {
  console.log({action,state})
    // action = { type, payload }
    switch (action.type) {
      case 'initCategories':
        return {
          ...state,
          categories: action.payload.categories,
        }
      default:
        return state;
    }
  }