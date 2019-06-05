import React from "react";
import Profile from "../ui/pages/Profile";
import Welcome from "../ui/pages/Welcome";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

const Layout = () => {
  return (
    <Router>
      <div>
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </Router>
  );
};

export default Layout;
