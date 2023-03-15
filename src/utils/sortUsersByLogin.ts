import {User,UserSchema} from "../Model/UserCopy"

const customSorter = (user1:UserSchema, user2:UserSchema) => {
    if (user1.login < user2.login) {
        return 1;
    }
    if (user1.login > user2.login) {
        return -1;
    }
    return 0;
};

const sortUserByLogin = (users:UserSchema[]) => {
    return users.sort(customSorter);
};

module.exports = sortUserByLogin;
