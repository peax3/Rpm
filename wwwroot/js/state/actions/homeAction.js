import { ActionTypes } from "../constants/action-types";

export const setFeed = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_HOME_FEED,
            payload:feeds
        })
    }
}


export const setHomeTrending = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_HOME_TRENDING,
            payload:feeds
        })
    }
}

export const setQuickView = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_QUICK_VIEW,
            payload:feeds
        })
    }
}


export const setQuickBid = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_QUICK_BID,
            payload:feeds
        })
    }
}


export const setSwapProducts = (feeds)=>{
    return (dispatch)=>{
        dispatch({
            type: ActionTypes.SET_SWAP_PRODUCTS,
            payload:feeds
        })
    }
}