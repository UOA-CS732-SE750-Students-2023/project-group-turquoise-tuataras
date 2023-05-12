
import { Divider , Input } from 'antd';
import React from "react";
import InputBox from './InputBox.jsx';
import styles from './Comment.module.css';


export default function Comment({recipe, setCommentStatus, setRecipeData }) {
    
    return(
        <div >
            <ListComment recipe= {recipe} setCommentStatus = {setCommentStatus} setRecipeData = {setRecipeData}/>                       
        </div>
    );
}

export function ListComment({ recipe , setCommentStatus, setRecipeData}) {
    if (!recipe.comments) {
        return(
            <div>
                <InputBox recipe = {recipe} setCommentStatus = {setCommentStatus} setRecipeData = {setRecipeData}/>
            </div>
        )
    }

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
                <InputBox recipe = {recipe} setCommentStatus = {setCommentStatus} setRecipeData = {setRecipeData}/>
            </div>
    </div>    
    )            
}

