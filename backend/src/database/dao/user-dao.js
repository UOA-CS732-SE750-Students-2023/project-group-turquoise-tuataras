import {User} from "../schema/user-schema.js";
import bcrypt from 'bcrypt';

export async function getIntolerances(userName) {
    const user = await User.findOne({username: userName});
    return user.intolerances;

}

export async function setUserIntolerances(userId, intolerances) {
    const user = await User.findById(userId);
    if (user) {
        user.intolerances = intolerances;
        user.save().then((user) => {
            return Promise.resolve();
        }).catch((err) => {
            return Promise.reject(err);
        });
    } else {
        return Promise.reject("User with userId " + userId + " not found");
    }
}

// login user
export async function loginUser(username, password) {

    // validation
    if (!username || !password) {
        throw Error('All fields must be filled');
    }

    const user = await User.findOne({ username });

    if (!user) {
        throw Error('Invalid login credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Invalid login credentials');
    }

    return user;
}

// signup user
export async function signupUser(username, password) {
    
    // validation
    if (!username || !password) {
        throw Error('All fields must be filled');
    }

    const exists = await User.findOne({ username });

    if (exists){
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hash, savedRecipes: [], ratedRecipes: [] });

    return user;
}

export async function userData(userName) {
    const user = await User.findOne({username: userName}).populate('savedRecipes');
    return user;
}

// reset user credentials
export async function resetUserCredentials(userId, username, password) {

    if (!username && !password) {
        throw Error('Username and/or password must be provided')
    }

    const user = await User.findById(userId);

    if (!user) {
        throw Error('User not found')
    }

    const filter = { _id: userId };
    const update = {};

    if (username && username !== user.username) {
        const exists = await User.findOne({ username });
        if (exists){
            throw Error('Username already in use');
        }
        
        update.username = username
    }

    if (password) {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        update.password = hash
    }

    const updatedUser = await User.findOneAndUpdate(filter, update, {new: true});

    return updatedUser
}

export async function getSavedRecipes(userId) {
    const user = await User.findById(userId).populate('savedRecipes');
    return user.savedRecipes;
}

export async function saveRecipe(userId, recipe) {
    const user = await User.findById(userId);
    user.savedRecipes.addToSet(recipe);
    await user.save();
    return user;
}

export async function deleteSavedRecipe(userId, recipe) {
    const user = await User.findById(userId);
    user.savedRecipes.pull(recipe);
    await user.save();
    return user;
}

export async function rateRecipe(userId, spoonacularId, rating) {
    const user = await User.findById(userId);
    if(!user){
        return false;
    }
    const usersRatings = user.ratedRecipes;

    for (var i = 0; i < usersRatings.length; i++){
        if(usersRatings[i].spoonacularId == spoonacularId){
            return false;
        }
    }
    user.ratedRecipes.push({spoonacularId, rating: rating});
    await user.save();
    return true;
}