import { fetchReducer } from "./redux/reducer/fetchReducer";
const redux = require("redux");


export const store = redux.createStore(fetchReducer);