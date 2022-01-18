import {
  GET_ALL_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
} from "./actionTypes";

/**
 * yodlrReducer
 *
 * Reducer function passed into useReducer and manages the global state
 * of users who are shown on and can be updated from the Admin page.
 *
 * TODO: The delete method is there, but is not currently implemented
 * any further.
 */
const yodlrReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };

    case ADD_USER:
      return {
        ...state,
        allUsers: [...state.allUsers, payload],
      };

    case DELETE_USER:
      const indexOfDeletedUser = state.allUsers.findIndex(
        (user) => user.id === payload.id
      );
      state.allUsers.splice(indexOfDeletedUser, 1);
      return {
        ...state,
        allUsers: [...state.allUsers],
      };

    case UPDATE_USER:
      const indexOfUpdatedUser = state.allUsers.findIndex(
        (user) => user.id === payload.id
      );

      state.allUsers[indexOfUpdatedUser] = payload;

      return {
        ...state,
        allUsers: [...state.allUsers],
      };

    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

export default yodlrReducer;
