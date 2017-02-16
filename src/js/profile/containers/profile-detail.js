import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile} from '../actions/profileActions';


class UserProfile extends Component {

  componentDidMount() {
    this.props.getProfile();

  }

  render () {

    return (
      <div>
        <h4>This is from Profile-Detail</h4>

        <ul>
          <h4>Name's this: {this.props.profile.name}</h4>
          <li>Title: {this.props.profile.title}</li>
          <li>Hometown: {this.props.profile.hometown}</li>
          <li>Gender: {this.props.profile.gender}</li>
          <li>Race: {this.props.profile.race}</li>
          <li>Industry: {this.props.profile.industry}</li>
          <li>Political Leaning: {this.props.profile.politicalleaning}</li>
          <li>Religion: {this.props.profile.religion}</li>
          <li>Yearly Income: {this.props.profile.yearlyincome}</li>
        </ul>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({getProfile: getProfile}, dispatch)
}



export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);