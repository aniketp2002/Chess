
// export const dateChecks=(date)=>{
//     const todaysDate = new Date().toLocaleDateString()
//     const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).toLocaleDateString();
//     if(date===todaysDate){
//         return "Today"
//     }
//     else if(date===yesterday){
//         return "Yesterday"
//     }
//     else{
//         return date;
//     }
// }

import db from '../Firebase'

// const [allChats, setAllChats] = useState([])
export const getPosition = (setposition) => {
    db.collection("online").doc("O41y7N4oTmCqzIZHY8M7").onSnapshot(snapshot => {
        console.log(snapshot.data().position);
        setposition(snapshot.data().position);
    })

}

export const setPosition = (position) => {
    db.collection("online").doc("O41y7N4oTmCqzIZHY8M7").update({position})
}
