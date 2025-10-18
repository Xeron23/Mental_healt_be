export const checkTgl = async(create)=>{
    const createdAt = new Date(create);
    const now = new Date()
    const diffMinutes = (now - createdAt)/(1000*60);
    console.log(diffMinutes);
    
    if(diffMinutes < 5){
        return true;
    }
    return false;
}