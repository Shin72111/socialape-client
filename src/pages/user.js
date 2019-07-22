import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from "../utils/ScreamSkeleton";
import ProfileSkeleton from "../utils/ProfileSkeleton";

// MUI
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataAction";

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) this.setState({ screamIdParam: screamId });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => this.setState({ profile: res.data.user }))
      .catch(err => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    let screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams.length === 0 ? (
      <p>No scream for this user</p>
    ) : screamIdParam ? (
      screams.map(scream => {
        if (scream.screamId === screamIdParam)
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        else return <Scream key={scream.screamId} scream={scream} />;
      })
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  data: PropTypes.object.isRequired,
  getUserData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ data: state.data });

export default connect(
  mapStateToProps,
  { getUserData }
)(user);
