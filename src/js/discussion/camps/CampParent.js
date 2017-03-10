import React from 'react'
import Camp from './Camp'
import AddCamp from './AddCamp'
import CampList from './CampList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BackButton from './BackButton'
import FaceBookIntegration from './FaceBookIntegration'
import ProfileButton from './ProfileButton'
import Navigation from '../../navbar/navbar'
import { Link } from 'react-router'
import { Col, Row, Grid } from 'react-bootstrap';
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
    
    return (
      <div>
        <Navigation />
        <h2 className="col-md-offset-2 campText">{this.props.discussions[discussionId].input}</h2>
        {this.props.user === this.props.discussions[discussionId].user_id && <AddCamp discussionId={discussionId} />}
        <Col md={10} mdOffset={1}>
          <h5 id='campInstruction'>Each CommonGround is an opinion or social group that you could identify with. Click on one to expand it and see its comments.
            Feel free to add your own contribution. You can make one contribution per discussion in the form of a comment, upvote, or downvote.
          </h5>
        </Col>
        <br></br>
        <br></br>
        <CampList />
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