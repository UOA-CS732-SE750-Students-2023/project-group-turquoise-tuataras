export function getIntolerances(userId) {
    User.findById(userId, (err, user) => {
        if (err) {
            return err;
        }
        return user.intolerances;
    });
}