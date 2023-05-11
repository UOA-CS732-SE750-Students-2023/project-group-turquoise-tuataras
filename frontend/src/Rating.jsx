import StarsRating from "react-star-rate";

function Rating({handleRating, value, recipeId}) {
    return (
        <div>
        <StarsRating value={value} onChange={value=>{handleRating(value, recipeId)}} />
        </div>
    );
}

export default Rating;