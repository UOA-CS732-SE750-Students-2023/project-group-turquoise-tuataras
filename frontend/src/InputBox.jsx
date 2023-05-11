import { Input } from 'antd';
import axios from 'axios';
import React, { useState, } from "react";
import { useAuthContext } from './hooks/useAuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function InputBox({ recipe, setCommentStatus, setRecipeData}) {
  const { user, loading } = useAuthContext()

  const [inputValue, setInputValue] = useState("");

  const insertComment = async (newComment) => {

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const month = ("0" + (dateTime.getMonth() + 1)).slice(-2);
    const day = ("0" + dateTime.getDate()).slice(-2);
    const hours = ("0" + dateTime.getHours()).slice(-2);
    const minutes = ("0" + dateTime.getMinutes()).slice(-2);
    const seconds = ("0" + dateTime.getSeconds()).slice(-2);
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    try {
      const response = await axios.post(`${API_BASE_URL}/recipes/${recipe.spoonacularId}/comment`, {
        comment: newComment,
        date: dateString,
        username: user.username
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      const newCommentData = response.data;
      setCommentStatus(true); // This will trigger a re-fetch of the recipe data
      setRecipeData(prevData => {
        return {
          ...prevData,
          comments: [...prevData.comments || [], newCommentData]
        }
      });
    } catch (err) {
      console.error(err);
    }
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
        placeholder='Comment Here !!'
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default InputBox;