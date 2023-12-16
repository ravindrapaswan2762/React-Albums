
import styles from "./card.module.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDelete} from "../../redux/actions/fetchAction";
import { toast } from 'react-toastify';

export function Card(){
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state);

    function handleUpdate(album){
        let albumJSON = JSON.stringify(album);
        localStorage.setItem("album", albumJSON);
        console.log("album set in local");
    }

    const onDelete = (album) => {
        fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                console.log("deleted data from onDelete ", album);
                dispatch(fetchDelete(album));
                
                toast.success("Data Deleted Successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                })
            }
        })
        .catch((error) => console.error('Error updating album:', error));
    };
    

    return (
        <>
            {data?.map((album, index) => (
                <div className={styles.userCard} key={index}>
                    <div className={styles.userinfo}>
                        <h2>ID: {album.id}</h2><br/>
                        <p>Title: {album.title}</p><br/>
                        <p>userID: {album.userId}</p>
                    </div>
                    <div className={styles.options}>
                        <Link to={"updateForm"} >
                            <button onClick={() => handleUpdate(album)} className={styles.updateBtn}>Update</button>   
                        </Link>
                        
                        <button className={styles.deleteBtn} onClick={() => onDelete(album)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}
