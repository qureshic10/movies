import React from "react";

// const Input = ({ type, name, label, value, error, onChange }) => {
// we use rest property to get the other props from rest.
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        //autoFocus
        //ref={this.userName} // This ref attribute is used to refer this element with userName
        // value={value} // controlled elements
        // onChange={onChange}
        // type={type}
        {...rest} // This is exactly equivalent to the code written up if the value and key are same. Rest includes the properties other than name, value and error
        name={name}
        id={name}
        className="form-control"
      />
      {/* if error is true then this div will show. This is conditional rendering */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
