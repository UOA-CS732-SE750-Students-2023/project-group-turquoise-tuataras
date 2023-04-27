import {ButtonGroup} from "react-bootstrap";
import style from "./HomePage.module.css";
import * as basicScroll from "basicscroll";
import Button from "react-bootstrap/Button";
import HomeCardGroup from "./HomeCardGroup.jsx";
import React, {useEffect, useRef, useState} from "react";


function homePage() {
    // --check window width--
    const [windowWidth, setWindowWidth] = useState(getWindowWidth());
    useEffect(() => {
        function handleWindowResize() {
            setWindowWidth(getWindowWidth());
        }

        window.addEventListener('resize', handleWindowResize);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    function getWindowWidth() {
        return window.innerWidth;
    }

    // --generate a random number, decide the search background--
    let random = Math.floor(Math.random() * 3) + 1;
    // --search route--
    // search value
    const searchInfo = useRef('');
    // search
    const search = () => {
        let info = searchInfo.current.value;
        if (info.length === 0) {
            return;
        }
        window.location.href = "./search?value=" + info;
    }
    // advance search
    const advSearch = () => {
        let info = searchInfo.current.value
        if (info.length === 0) {
            window.location.href = "./advance_search";
        } else {
            window.location.href = "./advance_search?value=" + info;
        }
    }
    // --according to time, recommend breakfast/lunch/dinner--
    let time = new Date().getHours();
    if (time > 3) {
        if (time > 9) {
            if (time > 15) {
                time = "Dinner";
            } else {
                time = "Lunch"
            }
        } else {
            time = "Breakfast"
        }
    } else {
        time = "Dinner";
    }
    // --animation--
    // animation for search box
    basicScroll.create({
        from: '0px', to: '300px', props: {
            '--search_content_position': {
                from: "60vh", to: "10vh"
            }, '--search_height': {
                from: "100vh", to: "30vh"
            }
        }
    }).start();
    // animation for card groups
    basicScroll.create({
        from: "0px", to: "200px", props: {
            '--card_0': {
                from: "0", to: "1"
            }, '--card_title_0': {
                from: "20px", to: "35px"
            }, '--card_group_0': {
                from: "0.5", to: "1"
            }
        }
    }).start();
    basicScroll.create({
        from: "300px", to: "800px", props: {
            '--card_1': {
                from: "0", to: "1"
            }, '--card_title_1': {
                from: "20px", to: "35px"
            }, '--card_group_1': {
                from: "0.5", to: "1"
            }
        }
    }).start();
    basicScroll.create({
        from: "900px", to: "1400px", props: {
            '--card_2': {
                from: "0", to: "1"
            }, '--card_title_2': {
                from: "20px", to: "35px"
            }, '--card_group_2': {
                from: "0.5", to: "1"
            }
        }
    }).start();
    basicScroll.create({
        from: "1500px", to: "2000px", props: {
            '--card_3': {
                from: "0", to: "1"
            }, '--card_title_3': {
                from: "20px", to: "35px"
            }, '--card_group_3': {
                from: "0.5", to: "1"
            }
        }
    }).start();
    basicScroll.create({
        from: "2100px", to: "2600px", props: {
            '--card_4': {
                from: "0", to: "1"
            }, '--card_title_4': {
                from: "20px", to: "35px"
            }, '--card_group_4': {
                from: "0.5", to: "1"
            }
        }
    }).start();
    return (<div>
        <div id="Search" className={style.home_search_box}
             style={{
                 backgroundImage: "url(./src/images/homePageBackgrounds/" + random + ".png)", backgroundSize: "cover"
             }}>
            <div className={style.home_search_box_content}>
                <div className={style.navbar_form}>
                    <div className={style.home_search_icon}></div>
                    <input ref={searchInfo} type="text" placeholder="Search" className={style.navbar_input}/>
                    <ButtonGroup className={style.navbar_button_group}>
                        <Button type={"submit"} className={style.navbar_button} onClick={search}>Search</Button>
                        <Button type={"submit"} className={style.navbar_button} onClick={advSearch}>Advance</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
        <HomeCardGroup type={time} index={0}/>
        <div className={style.home_interval}></div>
        <HomeCardGroup type={"Sea Food"} index={1}/>
        <div className={style.home_interval}></div>
        <HomeCardGroup type={"Healthy"} index={2}/>
        <div className={style.home_interval}></div>
        <HomeCardGroup type={"Soup"} index={3}/>
        <div className={style.home_interval}></div>
        <HomeCardGroup type={"Salad"} index={4}/>
        <div id="Bottom" className={style.home_bottom}>
            {windowWidth > 1100 && <div className={style.home_bottom_icon}></div>}
            <div className={style.home_bottom_title}>
                <div className={style.home_bottom_title_icon}></div>
                <div className={style.home_bottom_title_text}>Contact us</div>
            </div>
            <div className={style.home_bottom_content}>
                <ul style={{listStyle: "none", padding: 0, color: "white", fontSize: "20px"}}>
                    <li>Benjamin Goh: xxx@aucklanduni.ac.nz</li>
                    <li>Cameron Nathan: xxx@aucklanduni.ac.nz</li>
                    <li>Yasith Udagedara: xxx@aucklanduni.ac.nz</li>
                    <li>Yunqi Zheng: yzhe583@aucklanduni.ac.nz</li>
                    <li>Hok Lai Frankie Yu: xxx@aucklanduni.ac.nz</li>
                    <li>Paul Lan: xxx@aucklanduni.ac.nz</li>
                </ul>
            </div>
        </div>
    </div>);
}

export default homePage;