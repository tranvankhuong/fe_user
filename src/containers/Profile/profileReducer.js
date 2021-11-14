export default function profileReducer(state, action) {
    // action = { type, payload }
    switch (action.type) {
        case 'init':
            return {
                userInfo: action.payload.user
            }
        case 'update-info':
            return{
                userInfo:{
                    ...state.userInfo,
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    fullname: action.payload.fullname,
                    description: action.payload.description,
                    organization: action.payload.organization,
                }
            }
        case 'update-image':
            return{
                userInfo:{
                    ...state.userInfo,
                    image: action.payload.image,
                }
            }
        default:
            return state;
    }
  }