// UpdateUserCard.jsx
import React, { useEffect, useState } from "react";
import styles from "./update.module.css"; 
import { useDispatch } from "react-redux";
import {  fetchUpdate } from "../../redux/actions/fetchAction";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export function Update() {
  const [updatedAlbum, setUpdatedAlbum] = useState({id: 0, title: "", userId: 0});

  const dispatch = useDispatch();
  const textInputRef = useRef(null);

  useEffect( ()=>{
    const storedAlbumJSON = localStorage.getItem("album");
    const storedAlbum = JSON.parse(storedAlbumJSON);
    console.log("storedAlbum ", storedAlbum);
    setUpdatedAlbum(storedAlbum);

    textInputRef.current.focus();
  }, [] )


  //---------------------------------------------
  const onUpdate = () => {
    console.log("updatedAlbum-state from onUpdate", updatedAlbum);
    fetch(`https://jsonplaceholder.typicode.com/albums/${updatedAlbum.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedAlbum),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("servar data from onUpdate", data)
        dispatch(fetchUpdate({id: data.id, title: data.title, userId: data.userId}));
        
        toast.success("Data Updated Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

      })
      .catch((error) => console.error('Error updating album:', error));
  };
  //---------------------------------------------



  const handleTextChange = (value) => {
    setUpdatedAlbum({id:updatedAlbum.id, title:value, userId:updatedAlbum.userId})
  };

  const handleUserIdChange = (value) => {
    setUpdatedAlbum({id:updatedAlbum.id, title:updatedAlbum.title, userId:value})
  };


  return (
    <div className={styles.updateUserCard}>
      <h2>Update Album</h2>
      <label>
        ID:
        <input
          type="number"
          name="id"
          disabled
          value={updatedAlbum.id}
        
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          ref={textInputRef}
          value={updatedAlbum.title}
          onChange={(e)=>handleTextChange(e.target.value)}
        />
      </label>
      <label>
        userId:
        <input
          type="number"
          name="userId"
          value={updatedAlbum.userId}
          onChange={(e)=>handleUserIdChange(e.target.value)}
        />
      </label>

      <div className={styles.buttons}>
        <Link to={"/"}>
            <button className={styles.updateBtn} onClick={onUpdate}>Update</button>
        </Link>
        
        <Link to={"/"}>
            <button className={styles.cancelBtn} >Cancel</button>
        </Link>

      </div>
    </div>
  );
}
