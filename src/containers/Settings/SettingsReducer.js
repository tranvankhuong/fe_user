export default function SettingsReducer(state, action) {
    switch (action.type) {
        case 'init':
            return {
                userInfo: action.payload.user
            }
        case 'update-password':
            return{
                userInfo:{
                    ...state.userInfo,
                    oldPassword: action.payload.oldPassword,
                    newPassword: action.payload.newPassword,
                }
            }
        case 'update-email':
            return{
                userInfo:{
                    ...state.userInfo,
                    newEmail: action.payload.newEmail,
                }
            }            
        default:
            return state;
    }
  }