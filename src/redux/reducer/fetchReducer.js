
import { FETCH_LOADING } from "../actions/fetchAction";
import { FETCH_SUCCESS } from "../actions/fetchAction";
import { FETCH_ERROR } from "../actions/fetchAction";

import { FETCH_UPDATE } from "../actions/fetchAction";
import { FETCH_DELETE } from "../actions/fetchAction";
import { FETCH_ADD } from "../actions/fetchAction";
import { RANDOM_ID } from "../actions/fetchAction";


const INITIAL_STATE = { isLoading: false, data: [], error: null, randomId: 50};

export function fetchReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case FETCH_LOADING:
            console.log("fetch loading called")
            return {isLoading: true, data: state.data, error: null, randomId: state.randomId}

        case FETCH_SUCCESS:
            return {isLoading: false, data: [...action.data], error: null, randomId: state.randomId}
        
        case FETCH_ADD:
            console.log("fetchAdd called. ", action.data);
            console.log("state afetr adding new adata: ", state.data);
            return {isLoading: false, data: [action.data, ...state.data], error: null, randomId: state.randomId}
            
        case FETCH_UPDATE:
            console.log("data from fetch update reducer: ",action.data);
            const updatedData = state.data.map((album) => {
                if (album.id === action.data.id) {
                    return { id: action.data.id, title: action.data.title, userId: action.data.userId };
                } else {
                    return album;
                }
            });
            return { isLoading: false, data: updatedData, error: null, randomId: state.randomId };
            

        case FETCH_DELETE:
            console.log("fetchDelete called. ", action.data);
            const indexToDelete = state.data.findIndex(album => action.data.id === album.id);
        
            if (indexToDelete !== -1) {
                const newData = [...state.data];
                newData.splice(indexToDelete, 1);
                
                return {isLoading: false, data: [...newData], error: null,  randomId: state.randomId + 1}
            }else{
                return {isLoading: false, data: [...state.data], error: null,  randomId: state.randomId + 1}
            }
                  

        case RANDOM_ID:
            return {isLoading: false, data: [...state.data], error: null,  randomId: state.randomId + 1}

        case FETCH_ERROR:
            return {isLoading: false, data: state.data, error: action.error} 
        default:
            return state;
    }
}
