import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String, required: true},
    savedRecipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
});

const User = mongoose.model('User', userSchema);

export { User };