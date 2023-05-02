import useGet from './useGet';
import { Divider , Input } from 'antd';
import React from "react";
import InputBox from './InputBox';


export default function Comment({recipe , onChangeComment}) {
    
    return(
        <div >
            <ListComment recipe= {recipe} onChangeComment = {onChangeComment} />                       
        </div>
    );
}

export function ListComment({ recipe , onChangeComment}) {

    return (
    <div>
            {(recipe.comments).map((eachComment,index) => (
            <div key={index}>
                <div>
                    <div>
                        <span >{eachComment.username}: </span>
                        <span >{eachComment.comment}</span>
                    </div>
                    <div>{eachComment.date}</div>
                </div>
                <Divider />
            </div> 
            ))}

            <div >
                <InputBox recipe = {recipe} onChangeComment = {onChangeComment}/>
            </div>
    </div>    
    )            
}

