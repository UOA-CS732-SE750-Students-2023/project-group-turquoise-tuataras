import { User } from './user-schema'
import bcrypt from 'bcrypt'

// login user
async function loginUser(username, password) {

}

// signup user
async function signupUser(username, password) {
    
    const exists = await User.findOne({ username });

    if (exists){
        throw Error('Username already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hash, savedRecipes: [], ratedRecipes: [] });

    return user
}

export {
    loginUser,
    signupUser
}