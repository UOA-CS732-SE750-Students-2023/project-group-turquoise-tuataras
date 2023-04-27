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
        window.location.href = "./recipe?id=" + id;
    }
    // get data from backend
    const [data, setData] = useState([]);
    // const url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=1414f1ede1c14cc3b2f498b8cfad8239';
    const url = API_BASE_URL+'/api/complexSearch';
    useEffect(() => {
        try {
            axios.get(url + "&query=" + props.type)
                .then(response => {
                    let data = response.data.results;
                    if (data.length > 7) {
                        setData(data.slice(0, 8))
                    }
                });
        } catch (err) {
            console.error(err);
        }
    }, []);
    return (<div>
            {data.length === 8 ?
                <div className={style.card_group}>
                    <div className={style.card_group_title}
                         style={{fontSize: "var(--card_title_" + props.index + ")"}}>{props.type}</div>
                    <div className={style.card_group_title_animation} style={{
                        fontSize: "var(--card_title_" + props.index + ")",
                        opacity: "var(--card_" + props.index + ")"
                    }}>{props.type}</div>
                    <div className={style.card_group_items} style={{opacity: "var(--card_group_" + props.index + ")"}}>
                        {data.map((item) =>
                            <Card className={style.card_group_card} key={item.id} onClick={() => recipe(item.id)}>
                                <Card.Img variant="top" height="160rem" src={item.image}/>
                                <Card.Body>
                                    <Card.Title>{item.title.length > 17 ? item.title.slice(0, 17) + "..." : item.title}</Card.Title>
                                </Card.Body>
                            </Card>)}
                    </div>
                </div> : <div className={style.card_group_error}>Cannot get data from remote</div>}
        </div>
    );
}

export default homeCardGroup;
