import { combineReducers } from "redux";
import authReduce from "./auth.reduce";
import userReducer from "./user.reducer";
const rootReducer =combineReducers({
    auth:authReduce,
    user:userReducer,
})

export default rootReducer;