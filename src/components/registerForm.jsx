import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
//import { register } from "./../services/userService"; // import register only
import * as userService from "./../services/userService"; // import all objects
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      //console.log(response);
      // to store the token on local storage. This token can be seen in the application tab of the browser console.
      // https://jwt.io/ // This website can be used to verify the tocken. go to the debugger page and paste the token and see the payload section
      //localStorage.setItem("token", response.headers["x-auth-token"]);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      window.location = "/"; // Full reload because username is not showing on first time registration
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
