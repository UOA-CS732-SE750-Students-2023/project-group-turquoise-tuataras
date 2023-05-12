import styles from './SavedReceipeCard.module.css';
import React from 'react'
import { FavoriteButton } from './FavoriteButton';
import { Card } from 'antd';
import { Image } from 'antd';
import { Button, Space } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function SavedReceipeCard({ item , favoriteStatus , setFavoriteStatus}) {

    return (
        <div id={styles.popularCards} className={styles.popularBlock}>
            <Card className={styles.cards} 
                hoverable
                style={{ width: 360}}
                
                cover={<Image alt="recipe image" src={item.image} width={360} height={240}/>}>   
                <div id="recipe_name">
                    <Meta title={item.recipe_name}/>
                </div>

                <div id={styles.savedrecipe_button}>
                    
                    <Space>
                        <FavoriteButton recipe = {item} 
                                        favoriteStatus = {favoriteStatus}
                                        setFavoriteStatus ={ setFavoriteStatus}/>
                        
                        <Link to={`../recipes/${item.spoonacularId}`}>
                            <Button type="primary" size="medium" style={{ background: "#a27d27"}} >Recipe Detail</Button>
                        </Link>
                    </Space>
                </div>
            </Card>
        </div>
    )
}
