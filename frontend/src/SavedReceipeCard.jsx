import styles from './SavedReceipeCard.module.css';
import React from 'react'
import {FavoriteButton} from './FavoriteButton';
import {Image} from 'antd';
import {Button, Space} from 'antd';
import {Link} from 'react-router-dom';
import Card from "react-bootstrap/Card";

export default function SavedReceipeCard({item, favoriteStatus, setFavoriteStatus}) {

    return (
        <div style={{position: "relative", width: "100%", height: "100%"}}>
            <Card className={styles.card_group_card} key={item.id}>
                <Card.Img variant="top" height="160rem" src={item.image}/>
                <Card.Body>
                    <Card.Title style={{fontSize: "16px", textAlign: "left"}}>
                        <div className={styles.card_group_content_fix}>
                            {item.title}
                            <div className={styles.card_group_content}>
                                <div style={{position: "absolute", width: "fit-content"}}>
                                    <div className={styles.card_group_content_animation}>
                                        {item.title}&emsp;&emsp;{item.title}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.savedrecipe_button}>
                                <Space style={{width: "15rem"}}>
                                    <FavoriteButton recipe={item}
                                                    favoriteStatus={favoriteStatus}
                                                    setFavoriteStatus={setFavoriteStatus}/>

                                    <Button type="primary" size="medium" style={{width: "6rem"}}
                                            href={`../recipes/${item.spoonacularId}`} ghost>Detail</Button>
                                </Space>
                            </div>
                        </div>
                    </Card.Title>
                </Card.Body>
            </Card>

            {/*<Card className={styles.cards} */}
            {/*    hoverable*/}
            {/*    style={{ width: 360}}*/}
            {/*    */}
            {/*    cover={<Image alt="recipe image" src={item.image} width={360} height={240}/>}>   */}
            {/*    <div id="recipe_name">*/}
            {/*        <Meta title={item.recipe_name}/>*/}
            {/*    </div>*/}

            {/*    <div id={styles.savedrecipe_button}>*/}
            {/*        */}
            {/*        <Space>*/}
            {/*            <FavoriteButton recipe = {item} */}
            {/*                            favoriteStatus = {favoriteStatus}*/}
            {/*                            setFavoriteStatus ={ setFavoriteStatus}/>*/}
            {/*            */}
            {/*            <Link to={`../recipes/${item.spoonacularId}`}>*/}
            {/*                <Button type="primary" size="medium" style={{ background: "#a27d27"}} >Recipe Detail</Button>*/}
            {/*            </Link>*/}
            {/*        </Space>*/}
            {/*    </div>*/}
            {/*</Card>*/}
        </div>
    )
}
