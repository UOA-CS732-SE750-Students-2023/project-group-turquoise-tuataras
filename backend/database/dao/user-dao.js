import {User} from "../schema/user-schema.js";

export function getIntolerances(userId) {
    User.findById(userId, (err, user) => {
        if (err) {
            return err;
        }
        return user.intolerances;
    });
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