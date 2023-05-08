import { Input } from 'antd';
import axios from 'axios';
import React, { useState, } from "react";


function InputBox({ recipe , onChangeComment , users}) {

  const [inputValue, setInputValue] = useState("");
  
  const insertComment = async (newComment) => {

    const dateTime = new Date();

    const year = dateTime.getFullYear(); 
    const month = dateTime.getMonth() + 1; 
    const day = dateTime.getDate(); // 
    const hour = dateTime.getHours(); 
    const minute = dateTime.getMinutes(); 
    const second = dateTime.getSeconds();

    const innertComment = {
        username: users[0].username,
        comment: newComment,
        date: `${year}/${month}/${day} ${hour}:${minute}:${second}`
    }
    console.log("date = ",innertComment.date);
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