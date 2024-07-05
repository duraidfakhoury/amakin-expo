import Single from "../../../components/single/Single";
import "./T_user.css" ;

import { singleUser } from "../../../data";

const T_User = (props)=> {
    return <div className="t_user">
        <Single {...singleUser} userData={props.userData}/>
    </div>
}

export default T_User ;