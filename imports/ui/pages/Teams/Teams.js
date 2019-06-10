import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import TeamsUI from "../../components/TeamsUI";
import SelectMemberForm from "../../components/SelectMemberForm";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Teams = ({classes, currentUser, groups}) => {
  console.log(currentUser);
  console.log(groups);
  return (
    <Fragment>
      <Typography>Teams</Typography>
      {groups.map(({name, _id}) => (
        <Typography key={_id}>{name}</Typography>
      ))}
      <Typography className={classes.header}>
        Let's create a new team
      </Typography>
      <TeamsUI />
      <SelectMemberForm groups={groups} />
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
