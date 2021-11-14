import axios from "../utils/axios";
// export function getAllCourse() {
//   return axios.get("/courses");
// }
// export function getCoursesWeb() {
//   return axios.get("/courses/category/web-courses");
// }

// export function getCoursesMobile() {
//   return axios.get("/courses/category/mobile-courses");
// }

// export function getCourseSingleCourse(courseId) {
//   return axios.get(`/courses/${courseId}`);
// }

export function getAllCourse(page) {
  return axios.get(`/courses?page=${page}`);
}
export function getCoursesByCategoryService(page, category_id) {
  return axios.get(`/courses/category?id=${category_id}&page=${page}`);
}

export function getCoursSearch(search, page) {
  return axios.get(`/courses/query?search=${search}&page=${page}`);
}

export function getCoursesSearchSort(search, page) {
  return axios.get(`/courses/search?key=${search}&page=${page}`);
}
  
export function getCourseSingleCourse(courseId){
    return axios.get(`/courses/${courseId}`);
}

export function loadAllCategory(){
    return axios.get('/category/all');
}
export function loadAllPostedCourse(){
    return axios.get('/courses/me');
}

export function postNewCourse(newCourse){
    return axios.post(`/courses/`,{
        courseName: newCourse.courseName,
        shortDescription: newCourse.shortDescription,
        categoryId: newCourse.categoryId,
        price: parseInt(newCourse.price),
        saleoff: parseFloat(newCourse.saleoff),
        sectionCount: parseInt(newCourse.sectionCount)
    });
}

export function updateCourseImage(courseId,formdata){
  return axios.patch(`/courses/${courseId}/image`,formdata)
}

export function updateCourseBasicInfo(courseId,updatedCourse){
  return axios.patch(`/courses/${courseId}`,{
      courseName: updatedCourse.courseName,
      shortDescription: updatedCourse.shortDescription,
      categoryId: parseInt(updatedCourse.categoryId),
      price: parseInt(updatedCourse.price),
      saleoff: parseFloat(updatedCourse.saleoff),
      sectionCount: parseInt(updatedCourse.sectionCount),
      courseStatus: parseInt(updatedCourse.courseStatus)
  });
}
export function postCourseDescription(courseId,courseDescription){
  return axios.patch(`/courses/${courseId}/description`,{
    description:courseDescription
  })
}


export function addNewSection(courseId,sectionTitle){
  return axios.post('/sections/',{
    courseId:courseId,
    sectionTitle:sectionTitle
  })
}

export function updateSection(sectionId,sectionTitle){
  return axios.patch(`/sections/${sectionId}`,{
    sectionTitle:sectionTitle
  })
}
export function deleteSection(sectionId){
  return axios.delete(`/sections/${sectionId}`)
}

export function addVideo(sectionId,videoTitle){
  return axios.post('/videos/',{
    sectionId: sectionId,
    videoTitle: videoTitle
  })
}
export function updateVideo(videoId,videoTitle,videoPreviewStatus){
  return axios.patch(`/videos/${videoId}`,{
    videoTitle: videoTitle,
    videoPreviewStatus: parseInt(videoPreviewStatus)
  })
}
export function uploadVideo(videoId,formData){
  return axios.patch(`/videos/${videoId}/upload`,formData)
}
export function deleteVideo(videoId){
  return axios.delete(`/videos/${videoId}`)
}


export function getReviewByCourseId(courseId){
  return axios.get(`/reviews/${courseId}`);
}

export function postRatingAndFeedBack(feedback,rating, courseId){
  return axios.post('/reviews/',{
    feedback,
    rating,
    courseId
  });
}
export function getWebCourse(){
  return axios.get(`/courses/category/web-courses`);
}
export function getMobileCourse(){
  return axios.get(`/courses/category/mobile-courses`);
}
export function getSearchResult(course,categoryId){
  // return axios.get(`courses/query?search=${course}&page=${page}`);
  return axios.get(`courses/query?search=${course}&categoryId=${categoryId}`);
}

export function getMySubscribeCourse(){
  return axios.get(`/subcribers/me/`);
}


export function setMySubscribeCourses(courseIdList) {
  return axios.post('/subcribers/checkout',{courseIdList});
}


export function getHotCourses(){
  return axios.get("/courses/hot-courses");
}

export function getNewCourses(){
  return axios.get("/courses/new-courses");
}


export function getPopularCourses(){
  return axios.get("/courses/popular-courses");
}
export function getFeaturedCourses(){
  return axios.get("/courses/featured-courses");
}
export function getViewestCourses(){
  return axios.get("/courses/mostviewest-courses");
}
export function getTopCategories(){
  return axios.get('/category/topcate');
}
export function getCoursesByCategoryId(categoryId){
  return axios.get(`/courses/category/${categoryId}`);
}