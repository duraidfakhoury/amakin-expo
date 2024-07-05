import Single from "../../../components/single/Single";
import "./T_user.css" ;

import { singleUser } from "../../../data";

const T_User = ()=> {
    return <div className="t_user">
        <Single {...singleUser}/>
    </div>
}

export default T_User ;