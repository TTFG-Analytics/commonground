import React from 'react'
import Camp from './Camp'
import AddCamp from './AddCamp'
import CampList from './CampList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCamps } from '../actions/actions'
import BackButton from './BackButton'
import FaceBookIntegration from './FaceBookIntegration'
import ProfileButton from './ProfileButton'
import Analytics from '../discuss/Analytics'
import { AppBar } from 'react-toolbox/lib/app_bar'
import { Link } from 'react-router'

//discussionId is used to associate which camps belong to which discussions
class CampParent extends React.Component{
  componentDidMount() {
  //   var discussionId = this.props.params.discussionId
  //   this.props.getCamps(discussionId)
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        // console.log('user is logged in and authenticated');
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        // console.log('user is logged into Facebook but not authenticated');

        // the user is logged in to Facebook,
        // but has not authenticated your app
      } else {
        // console.log('user is not logged in to to facebook');
        // the user isn't logged in to Facebook.
      }
    });
  }

  render(){
    var discussionId = this.props.params.discussionId
    var discussionName = this.props.discussions[discussionId-1].input
    return (
      <div>
        <AppBar>
          <BackButton />
          <ProfileButton />
          <Link to={`/logout`} style={{marginLeft: '45px'}}><h4>Logout</h4></Link>
        </AppBar>
        <h2>{discussionName}</h2>
        <AddCamp discussionId={discussionId} />
        <CampList discussionId={discussionId} />
        <Analytics />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    camps: state.campGet,
    discussions: state.discussionsGet.discussions
  }
}

export default connect(mapStateToProps)(CampParent)