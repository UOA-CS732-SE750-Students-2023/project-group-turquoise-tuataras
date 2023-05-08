import React, { useState, useEffect } from "react";
import { Button, Tooltip, Drawer} from 'antd';
import Comment from './Comment';

export function CommentButton({recipe , onChangeComment , users}) {


    const [open, setOpen] = useState(false);
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    return (
    <Tooltip title="Show Comments">
        <Button type="primary" onClick={showDrawer}  
            style={{ background: "#20a4da"}}>Comments</Button>
  
        <Drawer title="Comments:" placement="right" onClose={onClose} open={open}>
            <Comment recipe = {recipe} onChangeComment ={onChangeComment} users = {users}/>
        </Drawer>
    </Tooltip>
    )
  }  

