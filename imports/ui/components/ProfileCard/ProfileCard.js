import React, {Component, Fragment} from "react";
import {Meteor} from "meteor/meteor";
import {
  Typography,
  Paper,
  Chip,
  Button,
  FormControl,
  TextField
} from "@material-ui/core";
import {Form, Field} from "react-final-form";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  onSubmit = (values, err) => {
    if (this.state.isEditing) {
      Meteor.users.update(this.props.currentUserId, {
        $set: {
          username: values.username
        }
      });
      if (err) {
        console.log(err);
      }
    } else {
      null;
    }
  };

  render() {
    const {isEditing} = this.state;
    const {classes, currentUser, currentUserId} = this.props;
    const selectedGroups = this.props.groups.filter(group => {
      return group.selectedMembers.find(selectedMember => {
        return selectedMember.value === currentUserId;
      });
    });
    return (
      <div>
        {isEditing ? (
          <Form
            onSubmit={(values, err) => this.onSubmit(values, err)}
            render={({handleSubmit, submitting, pristine}) => {
              return (
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSubmit(e);
                  }}
                >
                  <FormControl fullWidth>
                    <Field
                      name="username"
                      render={({input}) => (
                        <TextField
                          {...input}
                          autoComplete="off"
                          label="Username"
                          type="username"
                          name="username"
                          margin="normal"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl>
                    <Button
                      type="submit"
                      variant="contained"
                      size="medium"
                      disabled={submitting || pristine}
                    >
                      {this.state.isEditing ? "Save" : "Edit"}
                    </Button>
                  </FormControl>
                </form>
              );
            }}
          />
        ) : (
          <Fragment>
            <Paper className={classes.profile}>
              <div className={classes.profileInfo}>
                <Typography className={classes.pageTitle}>
                  My Profile
                </Typography>
                <Chip
                  label={`Username - ${currentUser.username}`}
                  className={classes.chip}
                  variant="outlined"
                />
                <Chip
                  label={`Email - ${currentUser.emails[0].address}`}
                  className={classes.chip}
                  variant="outlined"
                />
                <Typography className={classes.pageTitle}>My Teams</Typography>
                {selectedGroups.map(selectedGroup => (
                  <Chip
                    key={selectedGroup._id}
                    label={`${selectedGroup.name}`}
                    className={classes.chip}
                    variant="outlined"
                  />
                ))}
              </div>
            </Paper>
            <Typography className={classes.button}>
              <button
                type="button"
                onClick={() => {
                  this.setState({
                    isEditing: !isEditing
                  });
                }}
              >
                {this.state.isEditing ? "Save" : "Edit"}
              </button>
            </Typography>
          </Fragment>
        )}
      </div>
    );
  }
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  groups: PropTypes.array.isRequired,
  currentUserId: PropTypes.string.isRequired
};

export default withStyles(styles)(ProfileCard);
