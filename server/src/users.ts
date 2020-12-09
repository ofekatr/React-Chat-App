import { IUser } from "./interfaces/userInterfaces";

const users: IUser[] = [];

const addUser = (newUser: IUser) => {
    let { username, room } = newUser;
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    if (users.find((user: IUser) => user.room === room && user.username === username)) {
        return { error: 'Username is taken.' }
    }

    users.push(newUser);
    return { newUser };
};

const removeUser = (id) => {
    const index = users.findIndex((user: IUser) => user.id === id);

    if (index !== -1) {
        const user = users[index];
        users.splice(index, 1)
        return { user };
    }
    return { error: 'Username does not exist' }
};

const getUser = (id) => {
    const user = users.find((user: IUser) => user.id === id);
    return user ? { user } : { error: 'Username does not exist' };
};

const getUsersInRoom = (room) => {
    return users.filter((user: IUser) => user.room === room);
};

export {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}