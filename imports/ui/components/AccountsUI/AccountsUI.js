import React, {Component, Fragment} from "react";
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Button, FormControl, Typography, TextField} from "@material-ui/core";
import ReactDOM from "react-dom";
import {Form, Field} from "react-final-form";
import {FORM_ERROR} from "final-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles";

class AccountsUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginToggle: true
    };
  }

  facebookLogin = () => {
    Meteor.loginWithFacebook(
      {
        requestPermissions: ["user_friends", "public_profile", "email"]
      },
      err => {
        if (err) {
          // handle error
        } else {
          // successful login!
        }
      }
    );
  };

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
              [FORM_ERROR]: "Username or email is already registered"
            };
          }
        }
      );
    }
  };

  validate = (values, isLogin) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!isLogin && !values.email) {
      errors.email = "Email is required";
    } else if (!isLogin && /.*@.*\..*/.test(values.email) === false) {
      errors.email = "Please enter a valid email";
    }
    return errors;
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <div onClick={this.facebookLogin}>
          <FontAwesomeIcon icon={["fab", "facebook"]} />
          <div>Sign in With Facebook</div>
        </div>
        <Form
          onSubmit={(values, err) => this.onSubmit(values, err)}
          validate={values => {
            return this.validate(values, this.state.loginToggle);
          }}
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
                          {meta.touched && meta.invalid && (
                            <Typography className={classes.errorMessage}>
                              {meta.error}
                            </Typography>
                          )}
                        </div>
                      )}
                    />
                  </FormControl>
                )}
                <FormControl fullWidth>
                  <Field
                    name="username"
                    render={({input, meta}) => (
                      <div>
                        <TextField
                          {...input}
                          autoComplete="off"
                          label="Username"
                          type="username"
                          name="username"
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
                <FormControl fullWidth>
                  <Field
                    name="password"
                    render={({input, meta}) => (
                      <div>
                        <TextField
                          {...input}
                          autoComplete="off"
                          label="Password"
                          type="password"
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
                {hasSubmitErrors && (
                  <Typography className={classes.errorMessage}>
                    {submitError}
                  </Typography>
                )}
              </form>
            );
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(AccountsUI);
