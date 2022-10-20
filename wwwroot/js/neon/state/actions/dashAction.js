import { ActionTypes } from "../constants/action-types";

export const setUserCount = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_USERS_COUNT,
            payload:count
        })
    }
}


export const setCategoryCount = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_CATEGORY_COUNT,
            payload:count
        })
    }
}

export const setUsers = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_USERS,
            payload:count
        })
    }
}



export const setCategories = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_CATEGORIES,
            payload:count
        })
    }
}
