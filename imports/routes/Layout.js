import React from "react";
import Profile from "../ui/pages/Profile";
import Welcome from "../ui/pages/Welcome";
import {Redirect, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {withTracker} from "meteor/react-meteor-data";

const Layout = ({loggedOut}) => {
  if (loggedOut) {
    return (
      <Switch>
        <Route exact path="/welcome" component={Welcome} />
        <Redirect from="*" to="/welcome" />;
      </Switch>
    );
  } else {
    return (
      <Switch>
        <Route exact path="/home" component={Profile} />
        <Redirect from="*" to="/home" />
      </Switch>
    );
  }
};

export default withRouter(
  withTracker(() => {
    return {
      loggedOut: !Meteor.user() && !Meteor.loggingIn()
    };
  })(Layout)
);
