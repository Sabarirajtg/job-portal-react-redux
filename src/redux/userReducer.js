import * as actions from "./actionType";

export default function userReducer(state = [], action) {
  if (action.type === actions.USER) {
    return [
      ...state,
      {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        password: action.payload.password,
        role: 0, //0 for admin, 1 for user
      },
    ];
  } else if (action.type === actions.ROLE) {
    const newState = [...state];
    const index = state.findIndex((user) => user.id === action.payload.id);
    if (index !== -1) {
      newState[index].role = action.payload.role;
    }
    return newState;
  } else {
    return state;
  }
}
