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
require('./camp.css')

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

    let discussionObj;
    let discussionCreator;
    this.props.discussions.forEach((discussion) => {
      if(discussion.id == discussionId) {
        discussionObj = discussion;
        discussionCreator = discussion.user_id
      }
    })
    console.log('discussionObj', discussionObj.input, discussionCreator);
    
    return (
      <div>
        <Navigation />
        <h2 className="campText">{discussionObj.input}</h2>
        {this.props.user === discussionCreator && <AddCamp discussionId={discussionId} />}
        <CampList discussionId={discussionId} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    camps: state.campGet,
    discussions: state.discussionsGet.discussions,
    user: state.profileReducer.id
  }
}

export default connect(mapStateToProps)(CampParent)