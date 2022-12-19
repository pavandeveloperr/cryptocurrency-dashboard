import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";
import exchangeReducer from "./exchangeReducer";
import sortReducer from "./sortReducer";

const rootReducer = combineReducers ({
    default : defaultReducer,
    exchange : exchangeReducer,
    order : sortReducer,
})


export default rootReducer