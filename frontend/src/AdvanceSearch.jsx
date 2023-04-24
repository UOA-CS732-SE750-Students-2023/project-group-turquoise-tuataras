import {useState,useEffect} from 'react';
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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const animatedComponents = makeAnimated();

function AdvanceSearch() {
  const [cardComponents, setCardComponents] = useState([]);

  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const [searchResults, setSearchResults] = useState({});

  useEffect(() => {
    if (Array.isArray(searchResults.results)) {
      const recipeCards = searchResults.results.map((recipe)=>(
        <Col key={recipe.id}>
        <Card style={{ width: '18rem'}} key={recipe.id}>
          <Card.Img variant="top" src={recipe.image} height="160rem"/>
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Button variant="primary" href={`/recipe/${recipe.id}`}>View</Button>
          </Card.Body>
        </Card>
        </Col>
      ));
      setCardComponents(recipeCards);
    }
  }, [searchResults]);

  const handleSearch = async () => {
    const inputText = document.querySelector('[aria-label="Complex Search Bar"]').value;
    const selectedMealType = document.querySelector('select').value;
    const data = {
      selectedCuisines,
      selectedDiets,
      inputText,
      selectedMealType,
    };
    // console.log(data);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/complexSearch`, data);
      // const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=1414f1ede1c14cc3b2f498b8cfad8239&query=chicken');
      setSearchResults(response.data);
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
        <Form.Control aria-label="Complex Search Bar" />
        <Button variant="outline-secondary" id="button-addon2" onClick={handleSearch}>
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