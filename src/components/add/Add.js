import styles from "../update/update.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addRandomId, fetchAdd} from "../../redux/actions/fetchAction";
import { useRef } from "react";
import { toast } from 'react-toastify';


export function Add() {
    const {randomId } = useSelector((state) => state);
    const [updatedAlbum, setUpdatedAlbum] = useState({id: randomId, title: "", userId: 1, });

    const dispatch = useDispatch();
    const textInputRef = useRef(null);

    useEffect( ()=>{
        textInputRef.current.focus();
        console.log('randomId ',randomId)
    }, [] );

  
    const onAdd = () =>{
        fetch('https://jsonplaceholder.typicode.com/albums', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAlbum),
        })
        .then((response) => response.json())
        .then((data) => {

            dispatch(fetchAdd({id: randomId, title: data.title, userId: data.userId}));
            toast.success("Data Added Successfully!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            dispatch(addRandomId());
        })
        .catch((error) => console.error('Error adding album:', error));
    }


    const handleTextChange = (value) => {
        setUpdatedAlbum({id: randomId, title:value, userId:updatedAlbum.userId})
    };

    const handleUserIdChange = (value) => {
        setUpdatedAlbum({id: randomId, title:updatedAlbum.title, userId:value})
    };


    return (
        <div className={styles.updateUserCard}>
        <h2>Add Album</h2>
        <label>
            ID:
            <input
            type="number"
            name="id"
            disabled
            value={randomId}

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
            required
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
                <button className={styles.updateBtn} onClick={onAdd}>Add</button>
            </Link>

            <Link to={"/"}>
                <button className={styles.cancelBtn} >Cancel</button>
            </Link>
        </div>
        </div>
    );
}
