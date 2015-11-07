

export function getUserObject(){

    let userID;
    if(localStorage.getItem('uid') == null){
        userID = new Date().getTime() + "-" + Math.round(Math.random()*10000);
        localStorage.setItem('uid', userID);
    }else{
        userID = localStorage.getItem('uid');
    }

    //return {userID, currency: "£́"};
    return {userID, currency: "€"};
    //return {userID, currency: "$"};
}
