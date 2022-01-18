const yodlrReducer = (state, { type, payload }) => {
  switch (type) {
    case "get all users":
      return {
        ...state,
        allUsers: payload,
      };

    case "add user":
      return {
        ...state,
        allUsers: [...state.allUsers, payload],
      };

    case "delete user":
      const indexOfDeletedUser = state.allUsers.findIndex(
        (user) => user.id === payload.id
      );
      state.allUsers.splice(indexOfDeletedUser, 1);
      return {
        ...state,
        allUsers: [...state.allUsers],
      };

    case "update user":
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
