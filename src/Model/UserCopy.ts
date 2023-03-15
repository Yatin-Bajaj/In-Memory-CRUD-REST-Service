export interface UserSchema {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export class User implements UserSchema {
    constructor(
        public id: string,
        public login: string,
        public password: string,
        public age: number,
        public isDeleted: boolean
    ) { }
}

module.exports = {
    User
}
