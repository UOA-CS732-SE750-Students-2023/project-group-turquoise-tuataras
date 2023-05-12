import { useState, useEffect } from "react";
import StarsRating from "react-star-rate";
import { useAuthContext } from '../../hooks/useAuthContext.js';

export default function Rating({ handleRating, spoonacularId }) {
  const { user } = useAuthContext()
  const [rating, setRating] = useState(() => {
    const storedValue = localStorage.getItem(`${user.username}-rating-${spoonacularId}`);
    return storedValue !== null ? Number(storedValue) : 0;
  });

  useEffect(() => {
    localStorage.setItem(`${user.username}-rating-${spoonacularId}`, rating);
  }, [rating, spoonacularId]);

  const handleChange = (value) => {
    setRating(value);
    handleRating(value, spoonacularId);
  };

  return (
    <div>
      <StarsRating value={rating} onChange={handleChange} />
    </div>
  );
}
