const customSorter = (user1, user2) => {
    if (user1.login < user2.login) {
        return 1;
    }
    if (user1.login > user2.login) {
        return -1;
    }
    return 0;
};

const sortUserByLogin = (users) => {
    return users.sort(customSorter);
};

module.exports = sortUserByLogin;
