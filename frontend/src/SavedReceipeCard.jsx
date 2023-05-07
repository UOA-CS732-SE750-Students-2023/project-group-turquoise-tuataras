import styles from './SavedReceipeCard.module.css';
import React, { useState } from 'react'
import Comment from './Comment.jsx'
import { Card } from 'antd';
import { Image } from 'antd';
import { Button, Tooltip, Drawer, Space} from 'antd';
import { LikeOutlined , DislikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { Meta } = Card;

export default function SavedReceipeCard({ item , onChangeComment , onChangeFavorite , users}) {

    const [favoriteStatus, setFavoriteStatus] = useState(true);

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };

    const onClose = () => {
      setOpen(false);
    };

    const insertSavedRecipe = async () => {
        setFavoriteStatus(true);
        // add the selected SavedRecipe to databse , then call the refresh favorite
        const addNewSavedRecipeData = await axios.post(
              `http://localhost:3000/api/users/savedrecipes/${users[0].id}`, item)
              .then(()=> onChangeFavorite());
      };

    const deleteSavedRecipe = async () => {
        setFavoriteStatus(false);
            // delete the selected SavedRecipe to databse , then call the refresh favorite
        const deleteNewSavedRecipeData = await axios.post(
            `http://localhost:3000/api/users/deleteSavedrecipes/${users[0].id}`, item)
            .then(()=> onChangeFavorite());
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
                        <Button onClick={ (favoriteStatus) ? deleteSavedRecipe :insertSavedRecipe } type="primary" size="medium" id="like_button" shape="circle" 
                                icon={(favoriteStatus) ? <DislikeOutlined /> : <LikeOutlined />} style={(favoriteStatus) ? { background: "#b0aeb0"}:{ background: "#f64747"}}/>

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

        </div>
    )
}

