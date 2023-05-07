import { Input } from 'antd';
import axios from 'axios';
import React, { useState, } from "react";


function InputBox({ recipe , onChangeComment , users}) {

  const [inputValue, setInputValue] = useState("");
  
  const insertComment = async (newComment) => {

    const innertComment = {
        username: users[0].username,
        comment: newComment,
        date: new Date()
    }

    recipe.comments = [...(recipe.comments) , innertComment];

    // Save the recipe data to databse when new comment added , then call the refresh function
    const recipeData = await axios.put(
          `http://localhost:3000/api/updateComment/${recipe.spoonacularId}`, recipe)
          .then(()=> onChangeComment());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        insertComment(event.target.value);
        setInputValue("");
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Input
        type="text"
        placeholder='Commet Here !!'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default InputBox;