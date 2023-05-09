import styles from './SavedReceipeCard.module.css';
import React, { useState } from 'react'
import { FavoriteButton } from './FavoriteButton';
import { Card } from 'antd';
import { Image } from 'antd';
import { Button, Tooltip, Drawer, Space} from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function SavedReceipeCard({ item , userData , favoriteStatus , setFavoriteStatus}) {

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
                       
                        <FavoriteButton recipe = {item} 
                                        userData = { userData} 
                                        favoriteStatus = {favoriteStatus}
                                        setFavoriteStatus ={ setFavoriteStatus}/>
                        
                        <Link to={`../recipes/${item.spoonacularId}`}>
                            <Button type="primary" size="medium" style={{ background: "#a27d27"}} >Recipe Detail</Button>
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

