import React from "react";
import {Button, FormControl, Typography, TextField} from "@material-ui/core";
import {Form, Field} from "react-final-form";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import Select from "react-select";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import PropTypes from "prop-types";

const TeamsUI = ({users, classes, groups}) => {
  onSubmit = ({name, options}) => {
    Groups.insert({
      name,
      selectedMembers: options
    });
  };

  allUsers = users.map(user => ({
    label: user.username,
    value: user._id
  }));

  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Team name is required";
    }
    if (!values.options) {
      errors.options = "At least one member is required";
    }
    return errors;
  };

  return (
    <div>
      <Form
        onSubmit={(values, err) => this.onSubmit(values, err)}
        validate={this.validate}
        render={({handleSubmit, submitting, pristine, hasValidationErrors}) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormControl fullWidth margin="normal">
                <Field
                  name="name"
                  render={({input, meta}) => (
                    <div>
                      <TextField
                        {...input}
                        autoComplete="off"
                        label="Team Name"
                        type="name"
                        name="name"
                        margin="normal"
                        variant="outlined"
                      />
                      {meta.touched && meta.invalid && (
                        <Typography className={classes.errorMessage}>
                          {meta.error}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="normal">
                <Field
                  name="options"
                  render={({input, meta}) => (
                    <div>
                      <Select isMulti {...input} options={allUsers} />
                      {meta.touched && meta.invalid && (
                        <Typography
                          align="left"
                          className={classes.errorMessage}
                        >
                          {meta.error}
                        </Typography>
                      )}
                    </div>
                  )}
                />
              </FormControl>
              <FormControl margin="normal">
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  disabled={submitting || pristine || hasValidationErrors}
                >
                  Submit
                </Button>
              </FormControl>
            </form>
          );
        }}
      />
    </div>
  );
};

TeamsUI.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
};

export default withTracker(() => {
  Meteor.subscribe("groups");
  Meteor.subscribe("users");
  return {
    groups: Groups.find({}).fetch(),
    users: Meteor.users.find({}).fetch()
  };
})(withStyles(styles)(TeamsUI));
