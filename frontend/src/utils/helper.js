export const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getInitials = (name)=>{

    if(!name){
        return "";
    }

    const nameArray= name.split(" ");
    if(nameArray.length>1){
        return nameArray[0].charAt(0).toUpperCase() + nameArray[nameArray.length-1].charAt(0).toUpperCase();
    }
    else{
        return nameArray[0].charAt(0).toUpperCase();
    }
    
    // return nameArray[0].charAt(0).toUpperCase()
    // if(nameArray.length>1){
    //     nameArray=nameArray[0].charAt(0).toUpperCase() + nameArray[nameArray.length-1].charAt(0).toUpperCase();
    // }else{
    //     nameArray=nameArray[0].charAt(0).toUpperCase();
    // }

    // return nameArray;
}