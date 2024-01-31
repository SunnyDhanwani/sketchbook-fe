"use client";

const { Provider } = require("react-redux");
const { store } = require("./store");

const DataProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
