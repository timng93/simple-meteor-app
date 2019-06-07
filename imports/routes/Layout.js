import React, {Fragment} from "react";
import Header from "../ui/components/Header";
import Profile from "../ui/pages/Profile";
import Welcome from "../ui/pages/Welcome";
import Teams from "../ui/pages/Teams";
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
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/home" component={Profile} />
          <Route exact path="/teams" component={Teams} />
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
