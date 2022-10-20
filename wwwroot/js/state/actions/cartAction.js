import { ActionTypes } from "../constants/action-types";

export const setCartProducts = (products)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_CART_PRODUCTS,
            payload:products
        })
    }
}
