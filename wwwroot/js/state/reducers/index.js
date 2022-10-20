import { homeReducer } from "./homeReducer"
import { combineReducers } from "redux"
import { accountReducer } from "./accountReducer";
import {cartReducer} from "./cartReducer"

const reducers = combineReducers({
    home:homeReducer,
    account:accountReducer,
    cart: cartReducer
})

export default reducers;