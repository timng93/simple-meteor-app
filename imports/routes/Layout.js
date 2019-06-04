import React from "react";
import Profile from "../ui/pages/Profile";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

const Layout = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Profile} />
      </div>
    </Router>
  );
};

export default Layout;
