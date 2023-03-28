import React, { useState } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

//render function that says how the state should be updated based on dispatched actions
const reducer = (state = { balance: 0 }, action) => {
  switch (action.type) {
    case "DEPOSIT":
      return {
        balance: state.balance + action.payload,
      };
    case "WITHDRAW":
      return {
        balance: state.balance - action.payload,
      };
    case "ADD_INTEREST":
      return {
        balance: state.balance * 1.05,
      };
    case "CHARGES":
      return {
        balance: state.balance * 0.85,
      };
    default:
      return state;
  }
};

//created redux store
const store = configureStore({
  reducer: reducer,
});

//functions to handle the user actions
function App() {
  const [amount, setAmount] = useState(0);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  const handleDeposit = () => {
    dispatch({ type: "DEPOSIT", payload: amount });
    setAmount(0);
  };

  const handleWithdraw = () => {
    dispatch({ type: "WITHDRAW", payload: amount });
    setAmount(0);
  };

  const handleAddInterest = () => {
    dispatch({ type: "ADD_INTEREST" });
  };

  const handleCharges = () => {
    dispatch({ type: "CHARGES" });
  };

  //added a background image
  // displays current balance and allows user to perform actions
  return (
    <div
      style={{
        backgroundImage: "url('/clouds.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <h1>Cash Balance: {balance.toFixed(2)}</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => {
          const inputVal = e.target.value.trim();
          if (!isNaN(inputVal)) {
            setAmount(parseFloat(inputVal));
          }
        }}
      />
      <button onClick={handleDeposit}>Deposit</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={handleAddInterest}>Add Interest</button>
      <button onClick={handleCharges}>Charges</button>
    </div>
  );
}

//provides access to redux store
function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
// exports it
export default AppWrapper;
