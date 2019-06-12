import React, {Component, Fragment} from "react";
import {Meteor} from "meteor/meteor";
import {Groups} from "../../../api/groups";
import {withTracker} from "meteor/react-meteor-data";
import {Button, FormControl, Typography, TextField} from "@material-ui/core";
import {Form, Field} from "react-final-form";
import styles from "./styles";
import {withStyles} from "@material-ui/core/styles";
import Select from "react-select";

const TeamsUI = ({users, classes}) => {
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

  return (
    <div>
      <Form
        onSubmit={(values, err) => this.onSubmit(values, err)}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          hasValidationErrors,
          hasSubmitErrors,
          submitError
        }) => {
          return (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <FormControl fullWidth>
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
                    </div>
                  )}
                />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  name="options"
                  render={({input, meta}) => (
                    <div>
                      <Select isMulti {...input} options={allUsers} />
                    </div>
                  )}
                />
              </FormControl>
              <FormControl>
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

export default withTracker(() => {
  Meteor.subscribe("groups");

  return {
    groups: Groups.find().fetch()
  };
})(withStyles(styles)(TeamsUI));
