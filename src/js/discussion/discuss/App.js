import React from 'react'
import Discussion from './Discussion'
import AddDiscussion from './AddDiscussion'
import DiscussionList from './DiscussionList'
import { getDiscussions } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

//import ProfileButton from '../camps/ProfileButton'
//import { AppBar } from 'react-toolbox/lib/app_bar'
import { Link } from 'react-router'
import Navigation from '../../navbar/navbar'



DiscussionList.need = [
  getDiscussions
]

class App extends React.Component{

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
const mapStateToProps = (state) => {
  return {
    discussionsList: state.discussionsGet
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(getDiscussions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)