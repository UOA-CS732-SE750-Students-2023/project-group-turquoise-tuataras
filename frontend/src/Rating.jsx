import StarsRating from "react-star-rate";

export default function Rating({handleRating, value, spoonacularId}) {
    return (
        <div>
        <StarsRating value={value} onChange={value=>{handleRating(value, spoonacularId)}} />
        </div>
    );
}