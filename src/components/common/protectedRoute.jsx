import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      //   path={path} // Commented because rest will have the path prop
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            //<Redirect to="/login" />;
            // Redirect the user to the same page after login from the location prop
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
