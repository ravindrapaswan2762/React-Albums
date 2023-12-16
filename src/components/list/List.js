import styles from "./list.module.css"
import { Card } from "../card/Card"

export function List(props){
    return (
        <div className={styles.list}>
           <Card />
        </div>
    )
}