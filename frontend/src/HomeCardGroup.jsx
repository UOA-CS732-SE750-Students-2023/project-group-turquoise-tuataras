import React, {useEffect, useState} from "react";
import style from "./HomeCardGroup.module.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function homeCardGroup(props) {
    // go to Recipe page
    const recipe = (id) => {
        if (id.length === 0) {
            return;
        }
        window.location.href = "./recipe/" + id;
    }
    return (<div>
            {props.data.value.length === 10 ?
                <div className={style.card_group}>
                    <div className={style.card_group_title}
                         style={{fontSize: "var(--card_title_" + props.index + ")"}}>{props.data.name}</div>
                    <div className={style.card_group_title_animation} style={{
                        fontSize: "var(--card_title_" + props.index + ")",
                        opacity: "var(--card_" + props.index + ")"
                    }}>{props.data.name}</div>
                    <div className={style.card_group_items} style={{opacity: "var(--card_group_" + props.index + ")"}}>
                        {props.data.value.map((item) =>
                            <Card className={style.card_group_card} key={item.id} onClick={() => recipe(item.id)}>
                                <Card.Img variant="top" height="160rem" src={item.image}/>
                                <Card.Body>
                                    <Card.Title style={{fontSize:"16px"}}>{item.title.length > 21 ? item.title.slice(0, 21) + "..." : item.title}</Card.Title>
                                </Card.Body>
                            </Card>)}
                    </div>
                </div> : <div className={style.card_group_error}>Cannot get data from back-end</div>}
        </div>
    );
}

export default homeCardGroup;