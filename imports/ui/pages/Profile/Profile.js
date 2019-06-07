import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Clients} from "../../../api/clients";
import {Meteor} from "meteor/meteor";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Profile = ({currentUser}) => {
  console.log(currentUser);
  return (
    <Fragment>
      {currentUser ? (
        <div>
          {currentUser.username} {currentUser.emails[0].address}
        </div>
      ) : null}
    </Fragment>
  );
};
export default withTracker(() => {
  return {
    currentUser: Meteor.user()
  };
})(withStyles(styles)(Profile));
