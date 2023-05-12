import React, { useState, useEffect } from "react";
import { Button, Tooltip, Drawer} from 'antd';
import Comment from './Comment';

export function CommentButton({recipe, setCommentStatus, setRecipeData}) {


    const [open, setOpen] = useState(false);
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
    <Tooltip title="Show Comments">
        <Button type="primary" onClick={showDrawer} ghost>Comments</Button>
  
        <Drawer title="Comments:" placement="right" onClose={onClose} open={open}>
            <Comment recipe = {recipe} setCommentStatus = {setCommentStatus} setRecipeData = {setRecipeData}/>
        </Drawer>
    </Tooltip>
    )
  }  

