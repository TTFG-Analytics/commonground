import React, {Component} from 'react';
import ProfileDetail from '../containers/profile-detail';
// import BackButton from '../../discussion/camps/BackButton'
import {fbHolding} from '../../discussion/camps/FaceBookIntegration'
import {getProfile} from '../actions/profileActions';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Navigation from '../../navbar/navbar'

ProfileDetail.need = [
  getProfile
]
class ProfileApp extends React.Component {

  render() {
   return ( <div>
    <Navigation />
    <h2>Profile Settings: </h2>
    <ProfileDetail />
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: () => {
      dispatch(getProfile())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileApp);