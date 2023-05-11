import styles from './SavedReceipeCard.module.css';
import React from 'react'
import {FavoriteButton} from './FavoriteButton';
import {Button, Space} from 'antd';
import {Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";

const {Meta} = Card;

export default function SavedReceipeCard({item, favoriteStatus, setFavoriteStatus}) {

    return (
        <Card className={styles.card_group_card} style={{display: "inline-block"}} key={item.id}>
            <Card.Img variant="top" height="160rem" src={item.image}/>
            <Card.Body>
                <Card.Title
                    style={{fontSize: "16px"}}>
                    {item.title.length > 21 ? item.title.slice(0, 21) + "..." : item.title}
                    <div style={{position:"relative",textAlign:"center",top:"10px"}}>
                        <FavoriteButton
                            style={{position: "absolute", right: "0"}}
                            recipe={item}
                            favoriteStatus={favoriteStatus}
                            setFavoriteStatus={setFavoriteStatus}/>
                    </div>
                    <div style={{position:"relative",textAlign:"center",top:"16px"}}>
                        <Link to={`../recipes/${item.spoonacularId}`}>
                            <Button type="primary" size="medium"
                                    style={{background: "#a27d27"}}>Recipe Detail</Button>
                        </Link>
                    </div>
                </Card.Title>
            </Card.Body>
        </Card>
    )
}
