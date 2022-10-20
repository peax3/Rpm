import { dashReducer } from "./dashReducer"
import { combineReducers } from "redux"

const reducers = combineReducers({
    dash:dashReducer,
})

export default reducers;