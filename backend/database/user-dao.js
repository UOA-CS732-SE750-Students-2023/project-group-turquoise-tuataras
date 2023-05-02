import { User } from './user-schema'
import bcrypt from 'bcrypt'

// login user
async function loginUser(username, password) {

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
async function signupUser(username, password) {
    
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

export {
    loginUser,
    signupUser
}