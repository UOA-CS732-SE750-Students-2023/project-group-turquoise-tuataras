import {Carousel} from "react-bootstrap";
import React from "react";
import style from "./HomePage.module.css";


function homePage() {

    return (
        <div>
            <div id="Search" style={{width:"100%",height:"500px",background:"red"}}>
                <div style={{position:"relative",top:"230px",width:"60%",left:"0",right:"0",margin:"auto"}}>
                    <form className={style.navbar_form}>
                        <input type="text" placeholder="Search" className={style.navbar_input}/>
                        <button type="submit" className={style.navbar_button}>Search</button>
                    </form>
                </div>
            </div>
            <div id="Carousel" style={{width:"100%",height:"400px",background:"black"}}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="holder.js/800x400?text=First slide&bg=373940"
                            style={{width:"100%",height:"400px"}}
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
                            style={{width:"100%",height:"400px"}}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Introduction</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div id="Items" style={{width:"100%",height:"500px",background:"red"}}></div>
        </div>
    );
}

export default homePage;
