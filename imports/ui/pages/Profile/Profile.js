import React from "react";
import ProfileCard from "../../components/ProfileCard";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {withTracker} from "meteor/react-meteor-data";
import {Groups} from "../../../api/groups";

const Profile = ({classes, currentUser, currentUserId, groups}) => {
  return (
    <div className={classes.profile}>
      {currentUser ? (
        <ProfileCard
          groups={groups}
          currentUser={currentUser}
          currentUserId={currentUserId}
        />
      ) : null}
    </div>
  );
};

export default withTracker(() => {
  Meteor.subscribe("groups");

  return {
    groups: Groups.find().fetch(),
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
  };
})(withStyles(styles)(Profile));
