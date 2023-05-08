import styles from './SavedReceipeCard.module.css';
import React, { useState } from 'react'
import Comment from './Comment.jsx'
import { FavoriteButton } from './FavoriteButton';
import { Card } from 'antd';
import { Image } from 'antd';
import { Button, Tooltip, Drawer, Space} from 'antd';
import { LikeOutlined , DislikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Meta } = Card;

export default function SavedReceipeCard({ item , onChangeComment , onChangeFavorite , users}) {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    return (
        <div id={styles.popularCards} className={styles.popularBlock}>
            <Card className={styles.cards} 
                hoverable
                style={{ width: 300}}
                
                cover={<Image alt="recipe image" src={item.image} width={300} height={200}/>}>   
                <div id="recipe_name">
                    <Meta title={item.recipe_name}/>
                </div>

                <div id="ingredients_button">
                    
                    <Space>
                       
                        <FavoriteButton recipe ={item} users = {users }onChangeFavorite = {onChangeFavorite} />
                        
                        <Tooltip title="Show Comments">
                            <Button type="primary" onClick={showDrawer} className={styles.pressButton} 
                                    style={{ background: "#2183d8"}}>Comments</Button>

                                <Drawer title={item.recipe_name} placement="right" onClose={onClose} open={open}>
                                    <h4>Comments:</h4>
                                    <Comment recipe = {item} onChangeComment ={onChangeComment} users = {users} />
                                </Drawer>
                        </Tooltip>
                        <Link to={`../recipes/${item.spoonacularId}`}>
                            <Button type="primary" size="medium">Detail</Button>
                        </Link>
                    </Space>
                </div>
            </Card>

            <Link to={`../shoppingList`}>
                <Button type="primary" size="medium">shoppingList</Button>
            </Link>

        </div>
    )
}

