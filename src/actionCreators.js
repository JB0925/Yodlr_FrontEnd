import {
  GET_ALL_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./actionTypes";

const getUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    payload: users,
  };
};

const addUser = (newUser) => {
  return {
    type: ADD_USER,
    payload: newUser,
  };
};

const updateUser = (updatedUser) => {
  return {
    type: UPDATE_USER,
    payload: updatedUser,
  };
};

const deleteUser = (userToDelete) => {
  return {
    type: DELETE_USER,
    payload: userToDelete,
  };
};

export { getUsers, addUser, updateUser, deleteUser };
