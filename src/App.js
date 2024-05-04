import React from "react";
import ReactDOM from "react-dom/client";
import Body from "./Body";

const AppLayout = () => {
  return (
    <div className="font-bold text-center my-4">
      React Task Tracker
      <div className="font-normal mx-2 my-2">
        <Body />
      </div>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
