import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import TeamsUI from "../../components/TeamsUI";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Teams = ({classes, currentUser, users, groups}) => {
  console.log(currentUser);
  console.log(groups);
  console.log(users);
  return (
    <Fragment>
      <Typography>Teams</Typography>
      {groups.map(({name, _id}) => (
        <Typography key={_id}>{name}</Typography>
      ))}
      <Typography className={classes.header}>
        Let's create a new team
      </Typography>
      <TeamsUI users={users} />
    </Fragment>
  );
};
export default withTracker(() => {
  Meteor.subscribe("groups");
  Meteor.subscribe("users");
  return {
    groups: Groups.find({}).fetch(),
    currentUser: Meteor.user(),
    users: Meteor.users.find({}).fetch()
  };
})(withStyles(styles)(Teams));
