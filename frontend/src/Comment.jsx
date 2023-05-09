
import { Divider , Input } from 'antd';
import React from "react";
import InputBox from './InputBox';
import styles from './Comment.module.css';


export default function Comment({recipe , users , setCommentStatus }) {
    
    return(
        <div >
            <ListComment recipe= {recipe} users={ users } setCommentStatus = {setCommentStatus}/>                       
        </div>
    );
}

export function ListComment({ recipe , setCommentStatus , users }) {

    return (
    <div>
            {(recipe.comments).map((eachComment,index) => (
            <div key={index}>
                <div>
                    <div>
                        <span className={styles.username_comment} >{eachComment.username}: </span>
                    </div>
                    <span className={styles.context_comment} >{eachComment.comment}</span>
                    <div className={styles.date_comment} >{eachComment.date}</div>
                </div>
                <Divider />
            </div> 
            ))}

            <div>
                <InputBox recipe = {recipe} users = {users} setCommentStatus = {setCommentStatus} />
            </div>
    </div>    
    )            
}

