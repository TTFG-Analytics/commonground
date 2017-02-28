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
import Navigation from '../../navbar/navbar'
import { Link } from 'react-router'
require('applicationStyles')

//discussionId is used to associate which camps belong to which discussions
class CampParent extends React.Component{
  componentDidMount() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
      } else if (response.status === 'not_authorized') {
        console.log('user is logged into Facebook but not authenticated');
      } else {
        console.log('user is not logged in to to facebook');
      }
    });
  }

  render(){
    var discussionId = this.props.params.discussionId
    console.log("THIS", this);

    let arrayIndex;
    this.props.discussions.forEach((index) => {
      if(index.id == discussionId) {
        arrayIndex = index;
      }
    })
    console.log('arrayIndex', arrayIndex.input);
    
    return (
      <div>
        <Navigation />
        <h2 className="test">{arrayIndex.input}</h2>
        <AddCamp discussionId={discussionId} />
        <CampList discussionId={discussionId} />
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