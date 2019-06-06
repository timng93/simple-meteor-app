import React, {Fragment} from "react";
import Profile from "../ui/pages/Profile";
import Welcome from "../ui/pages/Welcome";
import {Redirect, Route, Switch} from "react-router-dom";
import {withRouter} from "react-router";
import {withTracker} from "meteor/react-meteor-data";
import Header from "../ui/components/Header";

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
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/home" component={Profile} />
          <Redirect from="*" to="/home" />
        </Switch>
      </Fragment>
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
