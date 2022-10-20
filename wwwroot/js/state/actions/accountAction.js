import { ActionTypes } from "../constants/action-types";

export const setFeed = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_HOME_FEED,
            payload:feeds
        })
    }
}
