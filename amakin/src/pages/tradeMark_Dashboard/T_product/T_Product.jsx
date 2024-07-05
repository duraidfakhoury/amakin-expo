import Single from "../../../components/single/Single";
import "./T_product.css" ;
import { singleProduct } from "../../../data";
const T_Product = ()=> {
    return <div className="product">
        <Single {...singleProduct}/>
    </div>
}

export default T_Product ;