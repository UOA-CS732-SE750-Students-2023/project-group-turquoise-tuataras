import React, {useEffect, useState} from 'react';
import style from "./MealSchedule.module.css"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {ListGroup, ListGroupItem} from "react-bootstrap";

function MealSchedule({isLoggedIn, user}) {
    // JUST FOR TEST
    isLoggedIn = true;
    user = '643e631893f3ed7ee9a445df';
    // constants
    const WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let [tag, setTag] = useState(false);
    // function add
    const funAdd = () => {
        //发送请求
        setTag(!tag);
    }
    // function delete
    const funDelete = () => {
        //发送请求
        setTag(!tag);
    }
    // select date
    const [select, setSelect] = useState(0);
    // get current date
    let dateArray = [];
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        dateArray.push(new Date(date.setDate(date.getDate() + i)));
    }
    // get schedule
    const [data, setData] = useState(new Map());
    const [savedRecipes, setSavedRecipes] = useState(new Map());
    const [mealPlanId, setMealPlanId] = useState([]);
    const mealPlanUrl = 'http://localhost:3000/api/meal-plan/';
    const savedRecipesUrl = 'http://localhost:3000/api/users/' + user + '/savedRecipes';
    useEffect(() => {
        try {
            axios.get(savedRecipesUrl)
                .then(response => {
                    console.log(response)
                })
        } catch (err) {
            console.error(err);
        }
    })

    useEffect(() => {
        try {
            axios.get(mealPlanUrl + user)
                .then(response => {
                    let arrayData = response.data;
                    let mapData = new Map();
                    for (let i = 0; i < 7; i++) {
                        mapData.set(dateArray[i].getDate(), new Map())
                    }
                    let tempArray = []
                    arrayData.forEach((item) => {
                        tempArray.push(item._id);
                        let date = new Date(item.dateTime).getDate();
                        if (mapData.has(date)) {
                            item.recipe.forEach((tempItem) => {
                                if (!mapData.get(date).has(tempItem._id)) {
                                    mapData.get(date).set(tempItem._id, tempItem);
                                }
                            })
                        }
                    })
                    setData(mapData);
                    setMealPlanId(tempArray);
                });
        } catch (err) {
            console.error(err);
        }
    }, [tag]);
    return (
        <div>
            {isLoggedIn ? <div>
                <div className={style.meal_schedule_title}>
                    <div className={style.meal_schedule_time_picker}></div>
                    <ul>
                        {
                            dateArray.map((item, index) => <li style={{color: index === select ? 'red' : 'black'}}
                                                               key={index} onClick={() => {
                                setSelect(index)
                            }}>
                                <a>{index === 0 ? 'Today' : WEEKS[item.getDay()]}<br/>{item.getDate()} {MONTH[item.getMonth()]}
                                </a></li>)
                        }
                    </ul>

                </div>
                <div className={style.meal_schedule_content}>
                    <div className={style.meal_schedule_content_date}>
                        <a>{dateArray[select].getDate()}</a>
                        <div
                            className={style.meal_schedule_content_date_month}>{MONTH[dateArray[select].getMonth()]}</div>
                    </div>
                    <div className={style.meal_schedule_button}>Shopping List</div>
                    <div className={style.meal_schedule_button} style={{top: "280px"}}>Meal Schedule</div>
                    <div className={style.meal_schedule_content_table}>
                        <div className={style.meal_schedule_items_group}>
                            <ListGroup as="ul">
                                {
                                    data.get(dateArray[select].getDate()) &&
                                    Array.from(data.get(dateArray[select].getDate()).values()).map((item, index) =>
                                        <ListGroupItem as="li" key={index} className={style.meal_schedule_items}>
                                            {item.title}
                                            <Button variant="danger"
                                                    className={style.meal_schedule_delete_button}
                                                    onClick={funDelete}>DELETE</Button>
                                        </ListGroupItem>
                                    )
                                }
                                {
                                    data.get(dateArray[select].getDate()) &&
                                    Array.from(data.get(dateArray[select].getDate()).values()).length === 0 &&
                                    <div className={style.meal_schedule_items_none}>Add recipes to your schedule</div>
                                }
                            </ListGroup>
                        </div>
                        <div style={{position: "absolute", top: "10px", width: "100%"}}>
                            <div style={{position: "relative", display: "inline-block", width: "85%", left: "2%"}}>
                                <Form.Select>
                                    <option>Select a recipe from saved recipes</option>
                                    <option value="1">One</option>
                                    <option value="2">TWO</option>
                                </Form.Select>
                            </div>
                            <div style={{
                                position: "relative",
                                display: "inline-block",
                                width: "10%",
                                top: "-2px",
                                left: "3%"
                            }}>
                                <Button variant="outline-secondary" style={{width: "100%"}}
                                        onClick={funAdd}>ADD</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div>False</div>}
        </div>
    );
}

export default MealSchedule;
