export default function courseEditingReducer(state, action) {
    // action = { type, payload }
    switch (action.type) {
    case 'init':
        return {
            ...state,
            course: action.payload.course
        }
    //   case 'load-lecturer':
    //     return {
    //       ...state,
    //       lecturer: action.payload.lecturer
    //     }
    case 'init-categories':
        return {
            ...state,
            categories: action.payload.categories
        }
    case 'update-course-image':
        return{
            ...state,
            course: {
                ...state.course,
                course_image: action.payload.newImage
            }
        }
    case 'update-course-basic-info':
        return{
            ...state,
            course: {
                ...state.course,
                course_name: action.payload.updatedCourse.courseName,
                course_shortdescription: action.payload.updatedCourse.shortDescription,
                price: parseInt(action.payload.updatedCourse.price),
                saleoff: parseFloat(action.payload.updatedCourse.saleoff),
                category_id: parseInt(action.payload.updatedCourse.categoryId),
                section_count: parseInt(action.payload.updatedCourse.sectionCount),
                course_status: parseInt(action.payload.updatedCourse.courseStatus),

            }
        }
    case 'add-section':
        return {
            ...state,
            course:{
                ...state.course,
                sections: [...state.course.sections,action.payload.newSection],

            }
        }
    case 'edit-section':
        return {
            ...state,
            course:{
                ...state.course,
                sections: state.course.sections.map((s)=>{
                    if(s.section_id===action.payload.sectionId){
                        return {
                            ...s,
                            section_title:action.payload.sectionTitle
                        }
                    }else return s;
                }),

            }
        }
    case 'delete-section':
        return {
            ...state,
            course:{
                ...state.course,
                sections: [...state.course.sections.filter((s)=>s.section_id!==action.payload.deletedSectionId)],

            }
        }    
    case 'add-video':
        return {
            ...state,
            course:{
                ...state.course,
                sections:  state.course.sections.map((s)=>{
                    if(s.section_id===action.payload.sectionId){
                        if(s.videos.length  === 0){
                            return {
                                ...s,
                                videos: [action.payload.newVideo]
                            }
                        }
                        else{
                            return {
                                ...s,
                                videos: [...s.videos,action.payload.newVideo]
                            }
                        }                       
                    }else return s;
                }),

            }
        }
    case 'edit-video-title':
        return {
            ...state,
            course:{
                ...state.course,
                sections:  state.course.sections.map((s)=>{
                    if(s.videos.length === 0){
                        return s;
                    }
                    else{
                        let newVideos = s.videos.map(v=>{
                            if(v.video_id  === action.payload.videoId){
                                return {
                                    ...v,
                                    video_title: action.payload.videoTitle,
                                    preview_status: action.payload.videoPreviewStatus
                                }
                            }
                            else{
                                return v
                            }      
                        })
                        return {
                            ...s,
                            videos: newVideos
                        }               
                    }
                }),

            }
        }   
    case 'upload-video':
        return {
            ...state,
            course:{
                ...state.course,
                sections:  state.course.sections.map((s)=>{
                    if(s.videos.length === 0){
                        return s;
                    }
                    else{
                        let newVideos = s.videos.map(v=>{
                            if(v.video_id  === action.payload.videoId){
                                return {
                                    ...v,
                                    video_path: action.payload.videoPath
                                }
                            }
                            else{
                                return v
                            }      
                        })
                        return {
                            ...s,
                            videos: newVideos
                        }               
                    }
                }),

            }
        }   
    case 'delete-video':
        return {
            ...state,
            course:{
                ...state.course,
                sections:  state.course.sections.map((s)=>{
                    if(s.videos.length === 0){
                        return s;
                    }
                    else{
                        let newVideos = s.videos.filter(v=>v.video_id  !== action.payload.videoId)
                        return {
                            ...s,
                            videos: newVideos
                        }               
                    }
                }),

            }
        }  
    case 'post-course-description':
        return {
            ...state,
            course:{
                ...state.course,
                course_description: action.payload.courseDescription

            }
        }   
    default:
        return state;
    }
  }