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
import PropTypes from "prop-types";

const Teams = ({classes, groups}) => {
  return (
    <Fragment>
      <Typography className={classes.header}>Teams</Typography>
      {groups.map(({name, _id, selectedMembers}) => (
        <Card key={_id}>
          <Typography className={classes.teamName}>{name}</Typography>
          <Typography className={classes.teamLabel}>Members:</Typography>
          <List>
            {selectedMembers.map((selectedMember, index) => (
              <div key={index}>
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
      <TeamsUI />
    </Fragment>
  );
};

Teams.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("groups");

  return {
    groups: Groups.find({}).fetch()
  };
})(withStyles(styles)(Teams));
