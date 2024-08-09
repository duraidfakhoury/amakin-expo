import Single from "../../../components/single/Single";
import "./Tuser.css" ;

import { singleUser } from "../../../data";

const TUser = (props)=> {
    return <div className="t_user">
        <Single {...singleUser} userData={props.userData}/>
    </div>
}

export default TUser ;