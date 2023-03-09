import { collection, getDocs, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { db } from "../firebase";

const YourProfile = ({feedUser, pathUID}) => {
    const {currentUser} = useContext(AuthContext) ;
    const [yourUser, setYourUser] = useState([]) ;
    const url = `/feed/${feedUser.Data.UID}/${feedUser.DocID}` ; 
    // const url = `/feed/${feed.Data.UID}/${feed.DocID}` ; 
    const navigate = useNavigate();

    const getLoginUser = async() => {
        const getUserData = query(collection(db, "Users"), where("uid", "==", `${pathUID}`));
        const querySnapshot = await getDocs(getUserData);
        querySnapshot.forEach((doc) => {
            setYourUser(doc.data()) ;
        }); 
    } ;

    useEffect(() => {
        getLoginUser() ;
    }, []) ;

    // console.log(yourUser)
    // console.log(feedUser)
    return(
        <div style={{backgroundColor:"green", margin:"10px"}}>
            <img src={yourUser.attachmentUrl} width="30px" height="30px" /> 
            <p> {yourUser.displayName} </p> 
            {feedUser ? 
            <div>
                <img src={feedUser.Data.attachmentUrl} width="300px" height="300px" 
                    onClick={(() => {
                        navigate(`/feed/${feedUser.Data.UID}/${feedUser.DocID}`)
                    })}/> 
                <p> {feedUser.Data.message} </p>
            </div> : null}
        </div>
    )
}

export default YourProfile ; 