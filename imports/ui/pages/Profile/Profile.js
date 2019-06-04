import React from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Users} from "../../../../imports/api/users";
import {Meteor} from "meteor/meteor";
// import { Typography } from "@material-ui/core";
const Profile = props => {
  console.log("from the profile page");
  return <div>This is the Profile page for</div>;
};

export default withTracker(() => {
  Meteor.subscribe("users"); // NEW!
  return {
    users: Users.find({}).fetch()
  };
})(Profile);
