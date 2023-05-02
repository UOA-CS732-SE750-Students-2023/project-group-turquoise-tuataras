import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    savedRecipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
    ratedRecipes: [{spoonacularId: String, rating: Number}],
    intolerances:{
        glutenFree: {type: Boolean, default: false},
        dairyFree: {type: Boolean, default: false},
        peanutAllergy: {type: Boolean, default: false},
        soyAllergy: {type: Boolean, default: false},
        eggAllergy: {type: Boolean, default: false},
        seafoodAllergy: {type: Boolean, default: false},
        sulfiteAllergy: {type: Boolean, default: false},
        sesameAllergy: {type: Boolean, default: false},
        treeNutAllergy: {type: Boolean, default: false},
        grainAllergy: {type: Boolean, default: false},
        shellfishAllergy: {type: Boolean, default: false},
        wheatAllergy: {type: Boolean, default: false}
    }
});

const User = mongoose.model('User', userSchema);

export { User };