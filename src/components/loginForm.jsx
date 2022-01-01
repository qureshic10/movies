import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
// import Input from "./common/input";
import Form from "./common/form";
// npm i joi-browser@13.4 // Package for validation
//import { login } from "./../services/authService";
import auth from "./../services/authService";

class LoginForm extends Form {
  state = {
    // Rule of thumb: Initialize values with empty strings or load from servers to avoid any warning on the console. For controlled elements it will give warnings.
    data: { username: "", password: "" },
    errors: {},
  };

  // Joi implementation. First step is to create an schema and initialize fields with validators
  // We can use the label property for friendly name.
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  //   validate = () => {
  //     // Call the Joi.validate method and assign abortEarly to false if you want the form to validate all fields. Otherwise it will validate the first field and abort others if there is any error
  //     // const result = Joi.validate(this.state.data, this.schema, {
  //     //   abortEarly: false,
  //     // });

  //     // instead of result we can directly access the error property. Instead of passing direct prop we can assign abort early to option constant and use it in validate method.
  //     const options = { abortEarly: false };
  //     const { error } = Joi.validate(this.state.data, this.schema, options);

  //     if (!error) return null;
  //     const errors = {};
  //     // We will use the following loop to get the message and convert it into an object
  //     for (let item of error.details) errors[item.path[0]] = item.message;
  //     return errors;

  //     // console.log(result);

  //     // const errors = {};
  //     // const { data } = this.state;
  //     // if (data.username.trim() === "")
  //     //   errors.username = "Username is required";
  //     // if (data.password.trim() === "")
  //     //   errors.password = "Password is required";

  //     // return Object.keys(errors).length === 0 ? null : errors; // if the length of object keys is 0 it will return null which means validation is successful
  //   };
  //userName = React.createRef(); // This is used to refer a field

  //LifeCycle hook to give a focus to the userName
  //   componentDidMount() {
  //     this.userName.current.focus();
  //   }

  //   handleSubmit = (e) => {
  //     e.preventDefault();

  //     const errors = this.validate();
  //     // console.log(errors);
  //     this.setState({ errors: errors || {} }); // if error is null return empty object to avoid can not read property error whereever error object used

  //     if (errors) return;
  //     // How to access a ref property value.
  //     //const userName = this.userName.current.value;
  //   };

  doSubmit = async () => {
    // Call the server
    //console.log("Submitted");
    try {
      const { data } = this.state;
      //await login(data.username, data.password);
      //const { data: jwt } = await login(data.username, data.password);
      await auth.login(data.username, data.password); // We have moved the above logic to authService of extracting the data object.
      //console.log(jwt);
      // The following line store the token on local storage. it can be checked from the browser application tab under local storage
      //localStorage.setItem("token", jwt); Moved this line to authService
      //this.props.history.push("/");
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/"; // window.location is used to reload the page and remount and in the right state. because username is not showing on first time login if we use Redirect option
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  // We will use ES6 computed properties to get the name of the element
  //   validateProperty = ({ name, value }) => {
  //     const obj = { [name]: value };
  //     // We can't use this.schema which is entire form so we will get a sub schema from the main schema and get only the field which we are validating.
  //     const schema = { [name]: this.schema[name] };
  //     const { error } = Joi.validate(obj, schema);

  //     return error ? error.details[0].message : null;
  //     // if (error) return null;
  //     // return error.details[0].message;

  //     // if (name === "username") {
  //     //   if (value.trim() === "") return "Username is required.";
  //     //   // ...
  //     // }
  //     // if (name === "password") {
  //     //   if (value.trim() === "") return "password is required";
  //     //   // ...
  //     // }
  //   };

  //   handleChange = (e) => {
  // Since we don't need any other property so we will get only currentTarget as a parameter
  //   handleChange = ({ currentTarget: input }) => {
  //     const errors = { ...this.state.errors };
  //     const errorMessage = this.validateProperty(input);
  //     if (errorMessage) errors[input.name] = errorMessage;
  //     else delete errors[input.name];
  //     const data = { ...this.state.data };
  //     //data.username = e.currentTarget.value;
  //     data[input.name] = input.value; // We can access the state when passed as a parameter like this
  //     this.setState({ data, errors });
  //   };

  render() {
    // Redirect the user to home page if the user is already login
    if (auth.getCurrentUser()) return <Redirect to="/" />;

    // const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        {/* form>(div.form-group>label+input.form-control)*2 */}
        <form onSubmit={this.handleSubmit}>
          {/* <Input
            name="username"
            value={data.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          /> */}

          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/* We have extracted the following Component to generalize the code */}
          {/* <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              //autoFocus
              //ref={this.userName} // This ref attribute is used to refer this element with userName
              value={data.username} // controlled elements
              onChange={this.handleChange}
              id="username"
              name="username"
              type="text"
              className="form-control"
            />
          </div> */}
          {/* <Input
            name="password"
            value={data.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          /> */}
          {/* <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={data.password}
              onChange={this.handleChange}
              name="password"
              id="password"
              type="text"
              className="form-control"
            />
          </div> */}
          {/* button.btn.btn-primary */}
          {/* Disable button if the form is not valid. Call the validate method */}
          {/* <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button> */}

          {/* Call the renderButton method to show button with login label */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
