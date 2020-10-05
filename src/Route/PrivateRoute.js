import React from "react";
import { Route, useLocation, Redirect } from "react-router-dom";

function PrivateRoute({ children, user, ...rest }) {
  const location = useLocation();
  console.log("in private route");
  // console.log(...rest);
  console.log(user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
