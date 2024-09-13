export const formatDate  =(date: string) =>{
    const newDate = new Date(date)
    const day = ("0" + newDate.getDate()).slice(-2);
    const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();

    return `${year}-${month}-${day}`;

}

export const compareIfFirstDateIsMostRecent = (date1: Date, date2: Date) =>{

    if(date1<date2){
        return true
    }
    else{
        return false
    }
}