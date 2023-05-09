import { Input } from 'antd';
import axios from 'axios';
import React, { useState, } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function InputBox({ recipe, users, setCommentStatus}) {

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

    recipe.comments = [...(recipe.comments) , innertComment];

    // Save the recipe data to databse when new comment added , then call the refresh function
    const recipeData = await axios.put(
          `${API_BASE_URL}/recipes/${recipe.spoonacularId}/comment`, innertComment)
          .then(setCommentStatus(true));

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