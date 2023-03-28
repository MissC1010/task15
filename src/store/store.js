import { configureStore } from "@reduxjs/toolkit";

//defines render function to manage application state
const reducer = (state = { balance: 0 }, action) => {
  //switch statements handle different action types
  switch (action.type) {
    //updates balance in state object based on action payload
    case "DEPOSIT":
      return {
        balance: state.balance + action.payload,
      };
    case "WITHDRAW":
      return {
        balance: state.balance - action.payload,
      };
    //updates balace by adding interest
    case "ADD_INTEREST":
      return {
        balance: state.balance * 1.05,
      };
    //updates balance by adding charges
    case "CHARGES":
      return {
        balance: state.balance * 0.85,
      };
    //if action not defined this will return current state
    default:
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

export default store;
