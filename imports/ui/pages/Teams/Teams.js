import React, {Fragment} from "react";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import TeamsUI from "../../components/TeamsUI";
import FaceIcon from "@material-ui/icons/Face";
import {
  Typography,
  Card,
  List,
  ListItemText,
  ListItemIcon,
  ListItem
} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

const Teams = ({classes, currentUser, users, groups}) => {
  console.log(currentUser);
  console.log(groups);
  console.log(users);
  return (
    <Fragment>
      <Typography className={classes.header}>Teams</Typography>
      {groups.map(({name, _id, selectedMembers}) => (
        <Card key={_id}>
          <Typography className={classes.teamName}>{name}</Typography>
          <Typography className={classes.teamLabel}>Members:</Typography>
          <List>
            {selectedMembers.map(selectedMember => (
              <div>
                <ListItem>
                  <ListItemIcon>
                    <FaceIcon />
                  </ListItemIcon>
                  <ListItemText>{selectedMember.label}</ListItemText>
                </ListItem>
              </div>
            ))}
          </List>
        </Card>
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
