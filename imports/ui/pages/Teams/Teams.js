import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Teams = ({currentUser, groups}) => {
  console.log(currentUser);
  console.log(groups);
  testGroups = [{name: "Thor"}, {name: "Captain America"}];

  return (
    <Fragment>
      <Typography>Teams</Typography>
      {testGroups.map(({name}) => (
        <Typography>{name}</Typography>
      ))}
    </Fragment>
  );
};
export default withTracker(() => {
  Meteor.subscribe("groups");
  return {
    groups: Groups.find({}).fetch(),
    currentUser: Meteor.user()
  };
})(withStyles(styles)(Teams));
