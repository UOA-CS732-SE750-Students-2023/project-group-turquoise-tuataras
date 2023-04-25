import {ButtonGroup, Carousel} from "react-bootstrap";
import React, {useEffect, useRef} from "react";
import style from "./HomeCardGroup.module.css";
import * as basicScroll from "basicscroll";
import Card from "react-bootstrap/Card";

function homeCardGroup(props) {
    console.log(props)
    const instance = basicScroll.create({
        from: '0px',
        to: '300px',
        props: {
            '--card_title_position': {
                from: "0px",
                to: "50px"
            }
        }
    });
    instance.start();
    return (
            <div id="CardGroup" className={style.card_group}>
                <div id="Title" className={style.card_group_title}>{props.type}</div>
                <div id="Items" className={style.card_group_items}>
                    <Card className={style.card_group_card}>
                        <Card.Img variant="top" height="160rem"/>
                        <Card.Body>
                            <Card.Title>title</Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            </div>
    );
}

export default homeCardGroup;
