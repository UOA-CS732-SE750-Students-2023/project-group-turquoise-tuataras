import styles from './SavedReceipeCard.module.css';
import React from 'react'
import {FavoriteButton} from './FavoriteButton';
import {Button, Space} from 'antd';
import {Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";
import style from "./HomeCardGroup.module.css";

export default function SavedReceipeCard({item, favoriteStatus, setFavoriteStatus}) {

    return (
        <Card className={style.card_group_card} style={{display: "inline-block"}} key={item.id}>
            <Card.Img variant="top" height="160rem" src={item.image}/>
            <Card.Body>
                <Card.Title style={{fontSize: "16px"}}>
                    <div className={style.card_group_content_fix}>
                        {item.title}
                        <div className={style.card_group_content}>
                            <div style={{position: "absolute", width: "fit-content"}}>
                                <div className={style.card_group_content_animation}>
                                    {item.title}&emsp;&emsp;{item.title}</div>
                            </div>
                        </div>
                    </div>
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
