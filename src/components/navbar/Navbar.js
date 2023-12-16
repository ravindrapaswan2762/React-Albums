import styles from "./navbar.module.css"
import img from "./add.png";
import { AddForm} from "../../redux/actions/fetchAction";
import { Link, Outlet } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";


export function Navbar(){
    
    const dispatch = useDispatch();

   

    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.logo}>React Albums</div>
                <div className={styles.add}>
                
                <Link to={"addForm"} >
                    <img src={img} alt="Add Album" />   
                </Link>

                </div>
            </div>

            <Outlet />
        </>
        
    )
}