export const FETCH_LOADING = "Fetch Loading";
export const FETCH_SUCCESS = "Fetch Success";
export const FETCH_ERROR = "Fetch Error";

export const FETCH_UPDATE = "Fetch Update";
export const FETCH_DELETE = "Fetch Delete";
export const FETCH_ADD = "Fetch Add";
export const RANDOM_ID = "Random Id";

// action creators
export const fetchLoading = () => ({ type: FETCH_LOADING });
export const fetchSuccess = (data) => ({ type: FETCH_SUCCESS, data: data });
export const fetchError = (error) => ({ type: FETCH_ERROR, data: error });

export const fetchAdd = (data) => ({type: FETCH_ADD, data: data});
export const fetchUpdate = (data) => ({type: FETCH_UPDATE, data: data});
export const fetchDelete = (data) => ({ type: FETCH_DELETE, data: data });

export const addRandomId = () => ({type: RANDOM_ID});
