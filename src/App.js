import "./styles.css";
import { Navbar } from "./components/navbar/Navbar";
import { List } from "./components/list/List";
import { Update } from "./components/update/Update";
import { Add } from "./components/add/Add";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";

import { fetchSuccess, fetchLoading, fetchError } from "./redux/actions/fetchAction";

export function App() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state);
 
  const getData = async () => {
    try{
      dispatch(fetchLoading());

      fetch("https://jsonplaceholder.typicode.com/albums")
      .then(response => response.json())
        .then(parsedJson => {
          console.log('App render: ',parsedJson);
          dispatch(fetchSuccess(parsedJson));
        })
    }
    catch(error){
      dispatch(fetchError(error));
    }
  }

  useEffect( ()=>{
    getData();
  }, [] );


  if (isLoading) {
    return <h3>Loading...</h3>;
  }
  if (error) {
    return <h3>{error.message}</h3>;
  }

  const router = createBrowserRouter([
    {path: "/", 
     element: <Navbar />,
      children: [
        {index: true, element: <List />},
        {path: "addForm", element: <Add />},
        {path: "updateForm", element: <Update />}
      ]
    }
  ])
  
  return(
    <>
      <RouterProvider router={router} />
    </>
  )
}
