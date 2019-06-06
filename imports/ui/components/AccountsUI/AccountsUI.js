import React, {Component, Fragment} from "react";
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Button, FormControl, Typography, TextField} from "@material-ui/core";
import ReactDOM from "react-dom";
import {Form, Field} from "react-final-form";
import {FORM_ERROR} from "final-form";
import "./styles.css";

class AccountsUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToggle: true
    };
  }

  onSubmit = values => {
    if (this.state.loginToggle) {
      Meteor.loginWithPassword(values.username, values.password, err => {
        if (err) {
          return {
            [FORM_ERROR]:
              "Username/ Password is incorrect/ invalid please try again"
          };
        }
      });
    } else {
      Accounts.createUser(
        {
          username: values.username,
          email: values.email,
          password: values.password
        },
        err => {
          if (err) {
            return {
              [FORM_ERROR]: "Usernam or email is already registered"
            };
          }
        }
      );
    }
  };

  render() {
    const {classes} = this.props;
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
                {!this.state.loginToggle && (
                  <FormControl>
                    <Field
                      name="email"
                      render={({input, meta}) => (
                        <div>
                          <TextField
                            {...input}
                            autoComplete="off"
                            label="Email"
                            type="email"
                            name="email"
                            margin="normal"
                            variant="outlined"
                          />
                        </div>
                      )}
                    />
                  </FormControl>
                )}
                <FormControl fullWidth>
                  <Field
                    name="username"
                    render={({input, meta}) => (
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
                <FormControl fullWidth>
                  <Field
                    name="password"
                    render={({input, meta}) => (
                      <TextField
                        {...input}
                        autoComplete="off"
                        label="Password"
                        type="password"
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  />
                  <Typography>
                    <button
                      type="button"
                      onClick={() => {
                        form.reset();
                        this.setState({
                          loginToggle: !this.state.loginToggle
                        });
                      }}
                    >
                      {this.state.loginToggle ? "Create an account" : "Login"}
                    </button>
                  </Typography>
                </FormControl>
                <FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    disabled={submitting || pristine || hasValidationErrors}
                  >
                    {this.state.loginToggle ? "Login" : "Register"}
                  </Button>
                </FormControl>
              </form>
            );
          }}
        />
      </div>
    );
  }
}

export default AccountsUI;
