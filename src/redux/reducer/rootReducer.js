import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";

const rootReducer = combineReducers ({
    default:defaultReducer,
})


export default rootReducer