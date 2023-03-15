function User(id, login, password, age, isDeleted) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = isDeleted;
}

module.exports = User;
