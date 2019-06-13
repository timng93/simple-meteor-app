import React from "react";
import ProfileCard from "../../components/ProfileCard";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import {withTracker} from "meteor/react-meteor-data";
import {Groups} from "../../../api/groups";
import PropTypes from "prop-types";

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

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  groups: PropTypes.array.isRequired,
  currentUserId: PropTypes.string.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("groups");

  return {
    groups: Groups.find().fetch(),
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId()
  };
})(withStyles(styles)(Profile));
