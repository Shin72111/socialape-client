import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Scream from "../components/scream/Scream";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import Profile from "../components/profile/Profile";

// Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataAction";

export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }
  render() {
    const { screams, loading } = this.props.data;
    let recentScreamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  data: PropTypes.object.isRequired,
  getScreams: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ data: state.data });

export default connect(
  mapStateToProps,
  { getScreams }
)(home);
