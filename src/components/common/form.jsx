import React from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends React.Component {
  state = {
    // Rule of thumb: Initialize values with empty strings or load from servers to avoid any warning on the console. For controlled elements it will give warnings.
    data: {},
    errors: {},
  };

  validate = () => {
    // instead of result we can directly access the error property. Instead of passing direct prop we can assign abort early to option constant and use it in validate method.
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    // We will use the following loop to get the message and convert it into an object
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  // We will use ES6 computed properties to get the name of the element
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    // We can't use this.schema which is entire form so we will get a sub schema from the main schema and get only the field which we are validating.
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} }); // if error is null return empty object to avoid can not read property error whereever error object used

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    //data.username = e.currentTarget.value;
    data[input.name] = input.value; // We can access the state when passed as a parameter like this
    this.setState({ data, errors });
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
