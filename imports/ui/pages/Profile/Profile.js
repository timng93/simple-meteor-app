import React from "react";
import ProfileCard from "../../components/ProfileCard";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {withTracker} from "meteor/react-meteor-data";

const Profile = ({classes, currentUser}) => {
  console.log("from the profile page");
  return (
    <div className={classes.profile}>
      {currentUser ? <ProfileCard /> : null}
    </div>
  );
};

export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withStyles(styles)(Profile));
