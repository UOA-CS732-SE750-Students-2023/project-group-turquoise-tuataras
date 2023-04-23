import {useState} from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { cuisines } from './cuisines';
import { diets } from './diets';
import { mealTypes } from './mealTypes';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const animatedComponents = makeAnimated();

function AdvanceSearch() {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedDiets, setSelectedDiets] = useState([]);

  const [searchResults, setSearchResults] = useState({});

  const handleSearch = async () => {
    const inputText = document.querySelector('[aria-label="Complex Search Bar"]').value;
    const selectedMealType = document.querySelector('select').value;
    const data = {
      selectedCuisines,
      selectedDiets,
      inputText,
      selectedMealType,
    };
    console.log(data);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/complexSearch`, data);
      setSearchResults(response.data);
      console.log(searchResults);
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
    </Form>
  );
}

export default AdvanceSearch;