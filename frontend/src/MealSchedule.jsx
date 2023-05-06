import React, {useEffect, useState} from 'react';
import style from "./MealSchedule.module.css"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
import {ListGroup} from "react-bootstrap";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function MealSchedule({isLoggedIn, user}) {
    // JUST FOR TEST
    isLoggedIn = true;
    user = '643e631893f3ed7ee9a445df';
    // constants
    const WEEKS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    const url = 'http://localhost:3000/api/meal-plan/';
    useEffect(() => {
        try {
            axios.get(url + user)
                .then(response => {
                    let arrayData = response.data;
                    let mapData = new Map();
                    for (let i = 0; i < 7; i++) {
                        mapData.set(dateArray[i].getDate(), new Array())
                    }
                    arrayData.forEach((item) => {
                        let date = new Date(item.dateTime).getDate();
                        if (mapData.has(date)) {
                            mapData.get(date).push(item)
                        }
                    })
                    setData(mapData);
                    console.log(mapData)
                });
        } catch (err) {
            console.error(err);
        }
    }, []);
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
                            }}><a>{WEEKS[item.getDay()]}<br/>{item.getDate()} {MONTH[item.getMonth()]}</a></li>)
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
                        <div style={{position: "absolute", top: "60px", width: "96%", left: "2%"}}>
                                {
                                    data.get(dateArray[select].getDate()) &&
                                    data.get(dateArray[select].getDate()).map((item,index) =>
                                        {
                                            console.log(item)
                                        }
                                        // <p key={index}>item</p>
                                    )
                                }
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
                                <Button variant="outline-secondary" style={{width: "100%"}}>ADD</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div>False</div>}
        </div>
    );
}

export default MealSchedule;
