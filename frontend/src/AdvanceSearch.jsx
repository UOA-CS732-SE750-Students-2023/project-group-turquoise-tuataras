import React, {useState,useEffect} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';


import { cuisines } from './cuisines';
import { diets } from './diets';
import { mealTypes } from './mealTypes';
import style from "./HomeCardGroup.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const animatedComponents = makeAnimated();

function AdvanceSearch() {

  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('query');
    setQuery(queryParam);
  }, []);


  const [cardComponents, setCardComponents] = useState([]);

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    if (Array.isArray(searchResults)) {
      const recipeCards = searchResults.map((recipe)=>(
        <Col key={recipe.id}>
        <a href={`/recipes/${recipe.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <Card className={style.card_group_card} key={recipe.id}>
          <Card.Img variant="top" src={recipe.image} height="160rem"/>
          <Card.Body>
            <Card.Title style={{position:"relative",top:"5px",fontSize: "16px", textAlign: "left"}}>
              <div className={style.card_group_content_fix}>
                {recipe.title}
                <div className={style.card_group_content}>
                  <div style={{position: "absolute", width: "fit-content"}}>
                    <div className={style.card_group_content_animation}>
                      {recipe.title}&emsp;&emsp;{recipe.title}</div>
                  </div>
                </div>
              </div>
            </Card.Title>
          </Card.Body>
        </Card>
        </a>
        </Col>
      ));
      setCardComponents(recipeCards);
    }
  }, [searchResults]);

  const handleSearch = async () => {
    const inputText = document.querySelector('[aria-label="Complex Search Bar"]').value;
    const selectedMealType = document.querySelector('select').value;
    const user = JSON.parse(localStorage.getItem("user"));

    const data = {
      recipeQuery: inputText,
      cuisines: selectedCuisines,
      diet: selectedDiets,
      type: selectedMealType,
    }

    if (user) {
      data.userName = user.username
    }

    console.log(data);
    try {
      const response = await axios.get(`${API_BASE_URL}/recipes/search`, {
        params: data,
      });
      setSearchResults(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };



  return (
    <Form>
      <div style={{paddingTop: '5%'}}/>
      <InputGroup className="mb-3 container">
        <div style={{width: '20%'}}>
          <Form.Select aria-label="Default select example">
            {mealTypes.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </Form.Select>
        </div>
        <Form.Control style={{marginLeft:"20px",borderRadius:"5px 0 0 5px"}} aria-label="Complex Search Bar" defaultValue={query}/>
        <Button style={{width:"10%"}} variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      <div className="mb-3 container">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={cuisines}
          onChange={(selectedOptions) => {
            const values = selectedOptions.map((option) => option.value);
            setSelectedCuisines(values);
          }}
          placeholder="Select Cuisines"
          value={cuisines.filter((option) => selectedCuisines.includes(option.value))}
        />
      </div>

      <div className="mb-3 container">
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={diets}
          onChange={(selectedOptions) => {
            const values = selectedOptions.map((option) => option.value);
            setSelectedDiets(values);
          }}
          placeholder="Select Diets"
          value={diets.filter((option) => selectedDiets.includes(option.value))}
        />
      </div>
      <div className='container'>
        <Row xs={1} md={4} className="g-4">
          {cardComponents}
        </Row>
      </div>
    </Form>
  );
}

export default AdvanceSearch;