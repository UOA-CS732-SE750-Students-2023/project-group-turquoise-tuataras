import React, {useEffect, useRef, useState} from 'react';
import style from "./MealSchedule.module.css"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {ListGroup, ListGroupItem, Table} from "react-bootstrap";
import * as url from "url";
import { useAuthContext } from './hooks/useAuthContext';

let inputValue = "-1";

function inputValueChangeHandler(event) {
    inputValue = event.target.value
}

function MealSchedule() {

    const { user, loading } = useAuthContext()
    
    // constants
    const WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let [tag, setTag] = useState(false);
    //open and close schedule
    let refObject = useRef();
    const funClose = () => {
        refObject.current.style.display = "none";
    }
    const funOpen = () => {
        refObject.current.style.display = "block";
    }
    // shopping list
    const funShopping = () => {
        window.location.href = "./api/shoppingList";
    }
    // function add
    const funAdd = () => {
        //send request
        const url = 'http://localhost:3000/api/meal-plan/';
        if (inputValue != "-1") {
            console.log(mealPlanId)
            if (mealPlanId.length > 0) {
                try {
                    axios.patch(url + mealPlanId[0], {"recipe": [inputValue]}, {
                        headers: {
                          Authorization: `Bearer ${user.token}`
                        }
                      })
                        .then(response => {
                            console.log(response)
                        })
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    axios.post(url, {"dateTime": dateArray[select], "recipe": [inputValue]}, {
                        headers: {
                          Authorization: `Bearer ${user.token}`
                        }
                      })
                        .then(response => {
                            console.log(response)
                        })
                } catch (err) {
                    console.error(err);
                }
            }
        }
        setTag(!tag);
    }
    // function delete
    const funDelete = (item) => {
        //send request
        const url = 'http://localhost:3000/api/meal-plan/';
        mealPlanId.forEach((obj) => {
            console.log(obj)
            try {
                axios.delete(url + obj + "/" + item._id, {
                    headers: {
                      Authorization: `Bearer ${user.token}`
                    }
                  })
                    .then(response => {
                        console.log(response)
                    })
            } catch (err) {
                console.error(err);
            }
        })
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
    // get data from backend
    const [data, setData] = useState(new Map());
    const [savedRecipes, setSavedRecipes] = useState(new Map());
    const [mealPlanId, setMealPlanId] = useState([]);
    const mealPlanUrl = 'http://localhost:3000/api/meal-plan/';
    const savedRecipesUrl = 'http://localhost:3000/api/users' + '/savedRecipes';
    // get saved recipes
    useEffect(() => {
        try {
            axios.get(savedRecipesUrl, {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
              })
                .then(response => {
                    response.data.forEach((item) => {
                        savedRecipes.set(item._id, item.title)
                    });
                })
        } catch (err) {
            console.error(err);
        }
    }, [])
    // get current date schedule
    useEffect(() => {
        setTimeout(() => {
            try {
                axios.get(mealPlanUrl, {
                    headers: {
                      Authorization: `Bearer ${user.token}`
                    }
                  })
                    .then(response => {
                        let arrayData = response.data;
                        let mapData = new Map();
                        for (let i = 0; i < 7; i++) {
                            mapData.set(dateArray[i].getDate(), new Map())
                        }
                        let tempArray = []
                        arrayData.forEach((item) => {
                            let date = new Date(item.dateTime).getDate();
                            if (date === dateArray[select].getDate()) {
                                tempArray.push(item._id);
                            }
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
        }, 100);

    }, [tag]);
    return (<div>
        {user ? <div>
            <div className={style.meal_schedule_title}>
                <div className={style.meal_schedule_time_picker}></div>
                <ul>
                    {dateArray.map((item, index) => <li style={{color: index === select ? 'red' : 'black'}}
                                                        key={index} onClick={() => {
                        setSelect(index);
                        setTag(!tag);
                    }}>
                        <a>{index === 0 ? 'Today' : WEEKS[item.getDay()]}<br/>{item.getDate()} {MONTH[item.getMonth()]}
                        </a></li>)}
                </ul>

            </div>
            <div className={style.meal_schedule_content}>
                <div className={style.meal_schedule_content_date}>
                    <a>{dateArray[select].getDate()}</a>
                    <div
                        className={style.meal_schedule_content_date_month}>{MONTH[dateArray[select].getMonth()]}</div>
                </div>
                <div className={style.meal_schedule_button} onClick={funShopping}>Shopping List</div>
                <div className={style.meal_schedule_button} style={{top: "280px"}} onClick={funOpen}>Meal Schedule</div>
                <div className={style.meal_schedule_content_table}>
                    <div className={style.meal_schedule_items_group}>
                        <ListGroup as="ul">
                            {data.get(dateArray[select].getDate()) && Array.from(data.get(dateArray[select].getDate()).values()).map((item, index) =>
                                <ListGroupItem as="li" key={index} className={style.meal_schedule_items}>
                                    {item.title}
                                    <Button variant="outline-danger"
                                            className={style.meal_schedule_delete_button}
                                            onClick={(e) => {
                                                funDelete(item)
                                            }}>DELETE</Button>
                                </ListGroupItem>)}
                            {data.get(dateArray[select].getDate()) && Array.from(data.get(dateArray[select].getDate()).values()).length === 0 &&
                                <div className={style.meal_schedule_items_none}>Add recipes to your schedule</div>}
                        </ListGroup>
                    </div>
                    <div style={{position: "absolute", top: "10px", width: "100%"}}>
                        <div style={{position: "relative", display: "inline-block", width: "85%", left: "2%"}}>
                            <Form.Select onChange={inputValueChangeHandler.bind(this)}
                                         defaultValue="Select a recipe from saved recipes">
                                <option value="-1">Select a recipe from saved recipes</option>
                                {Array.from(savedRecipes.keys()).map((item, index) => !data.get(dateArray[select].getDate()).has(item) &&
                                    <option key={index} value={item}>{savedRecipes.get(item)}</option>)}
                            </Form.Select>
                        </div>
                        <div style={{
                            position: "relative", display: "inline-block", width: "10%", top: "-2px", left: "3%"
                        }}>
                            <Button variant="outline-secondary" style={{width: "100%"}}
                                    onClick={funAdd}>ADD</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.meal_schedule_show} ref={refObject}>
                <div className={style.meal_schedule_show_content}>
                    <div className={style.meal_schedule_show_items}>
                        {dateArray.map((item, index) => <ListGroup className={style.meal_schedule_show_items_item}
                                                                   key={index}>
                            <ListGroup.Item style={{textAlign: "center", background: "rgba(0, 0, 0, 0.15)"}}>
                                <a>{index === 0 ? 'Today' : WEEKS[item.getDay()]}<br/>{item.getDate()} {MONTH[item.getMonth()]}
                                </a>
                            </ListGroup.Item>
                            {data.get(item.getDate()) && Array.from(data.get(item.getDate()).values()).map((item, index) => item &&
                                <ListGroup.Item key={index} style={{
                                    textAlign: "center", fontSize: "12px", background: "rgba(0, 0, 0, 0.03)"
                                }}>{item.title}</ListGroup.Item>)}
                        </ListGroup>)}
                    </div>
                    <Button variant="light" className={style.meal_schedule_show_items_bottom}
                            onClick={funClose}>CLOSE</Button>
                </div>
            </div>
        </div> : <div>False</div>}
    </div>);
}

export default MealSchedule;
