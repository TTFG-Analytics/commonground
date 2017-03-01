import React from 'react'
import AddDiscussion from './AddDiscussion'
import DiscussionList from './DiscussionList'
import { getDiscussions } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import FaceBookIntegration from '../camps/FaceBookIntegration'

//import ProfileButton from '../camps/ProfileButton'
import { Link } from 'react-router'
import Navigation from '../../navbar/navbar'

DiscussionList.need = [
  getDiscussions
]

class App extends React.Component{
  // componentDidMount() {
  //   FB.getLoginStatus(function(response) {
  //     if (response.status === 'connected') {
  //       var uid = response.authResponse.userID;
  //       var accessToken = response.authResponse.accessToken;
  //     } else if (response.status === 'not_authorized') {
  //       console.log('user is logged into Facebook but not authenticated');
  //     } else {
  //       console.log('user is not logged in to to facebook');
  //     }
  //   });
  // }

  render(){
    return (
    <div>
      <Navigation />
      <AddDiscussion />
      <DiscussionList />
    </div>
    )
  }
}

//the section below is used (along side the .need above) to have the App
//component dispatch the getDiscussions axios call before rendering DiscussionList
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(getDiscussions, dispatch)
}

export default connect(null, mapDispatchToProps)(App)