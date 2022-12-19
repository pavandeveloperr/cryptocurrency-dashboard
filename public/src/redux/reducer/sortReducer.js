import actionTypes from "../action/types";

const initialState ={
    order : "market_cap_desc"
}

const selectCurrencyReducer = (state=initialState, action) =>{
    
    switch(action.type){
        case actionTypes.SELECT_SORT_SUCCESS: 
        return {
            ...state,
            order:action.payload
        }
        default: return state
    }
}

export default selectCurrencyReducer;