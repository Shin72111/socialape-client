import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

AuthRoute.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = state => {
  return { authenticated: state.user.authenticated };
};

export default connect(mapStateToProps)(AuthRoute);
