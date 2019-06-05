import React from "react";
import AccountsUI from "../../components/AccountsUI";
// import { Typography } from "@material-ui/core";
const Welcome = props => {
  console.log("from the welcome page");
  return (
    <div>
      <AccountsUI />
    </div>
  );
};

export default Welcome;
