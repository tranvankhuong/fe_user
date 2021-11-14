export  function getFormattedDate (date){
    if(date===null || date === undefined){
        var d = new Date();

        d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2);

        return d;
    }
    else{
        var d = new Date(date);

        d = d.getFullYear() + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) ;

        return d;
   }
}
export function getFormattedDateAllTime(date){
    if(date===null || date === undefined){
        return 0;
    }
    else{
        var d = new Date(date);
        var thisD = new Date();

        return parseInt((thisD-d)/(60*60*1000));
   }
}

export function sortCourseByCreatedDateFunction(a, b) {
    if (a.created_date === b.created_date) {
        return 0;
    }
    else {
        return (a.created_date > b.created_date) ? -1 : 1;
    }
}


export function sortCourseByRatingFunction(a, b) {
    if (a.course_rv_point === b.course_rv_point) {
        return 0;
    }
    else {
        return (a.course_rv_point > b.course_rv_point) ? -1 : 1;
    }
}

export function sortCourseByPriceFunction(a, b) {
    if (a.price*(1-a.saleoff) === b.price*(1-b.saleoff)) {
        return 0;
    }
    else {
        return (a.price*(1-a.saleoff) < b.price*(1-b.saleoff)) ? -1 : 1;
    }
}
