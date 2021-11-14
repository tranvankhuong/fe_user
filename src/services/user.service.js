import axios from "../utils/axios"
export function getUserInfo(){
    return axios.get('/users/me');
}
export function getLecturerInfo(userId){
    console.log(userId);
    return axios.get('/users/'+userId);
}
export function updateUserInfo(updatedInfo){
    return axios.patch('/users/update-info',{
        fullname: updatedInfo.fullname,
        firstname: updatedInfo.firstname,
        lastname: updatedInfo.lastname,
        description: updatedInfo.description,
        organization: updatedInfo.organization
    })
}
export function updateUserPassword(updatedInfo){
    return axios.patch('/users/update-password',{
        oldPassword: updatedInfo.oldPassword,
        newPassword: updatedInfo.newPassword,
    })
}

export function updateUserEmail(updatedInfo){
    return axios.patch('/users/update-email',{
        newEmail: updatedInfo.newEmail,
    })
}

export function updateUserImage(formdata){
    return axios.patch('/users/me/image',formdata)
}