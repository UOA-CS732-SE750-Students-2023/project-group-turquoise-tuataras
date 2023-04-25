import {ButtonGroup, Carousel} from "react-bootstrap";
import React, {useEffect, useRef} from "react";
import style from "./HomePage.module.css";
import * as basicScroll from "basicscroll";
import Button from "react-bootstrap/Button";
import HomeCardGroup from "./HomeCardGroup.jsx";


function homePage() {
    const instance = basicScroll.create({
        from: '0px',
        to: '300px',
        props: {
            '--search_content_position': {
                from: "45vh",
                to: "10vh"
            },
            '--search_height': {
                from: "100vh",
                to: "30vh"
            }
        }
    });
    instance.start();
    return (
        <div>
            <div id="Search" className={style.home_search_box}>
                <div className={style.home_search_box_content}>
                    <form className={style.navbar_form}>
                        <input type="text" placeholder="Search" className={style.navbar_input}/>
                        <ButtonGroup className={style.navbar_button_group}>
                            <Button type={"submit"} className={style.navbar_button}>Search</Button>
                            <Button type={"submit"} className={style.navbar_button}>Advance</Button>
                        </ButtonGroup>
                    </form>
                </div>
            </div>
            <div id="Carousel" className={style.home_carousel}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            style={{width: "100%", height: "500px"}}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Introduction</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            style={{width: "100%", height: "500px"}}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Introduction</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <HomeCardGroup type = {"breakfast"}/>
            <HomeCardGroup type = {"soup"}/>
            <HomeCardGroup type = {"chicken"}/>
            <div id="Bottom" style={{height:"200px",marginTop:"100px",background:"#EC6E70"}}></div>
        </div>
    );
}

export default homePage;
