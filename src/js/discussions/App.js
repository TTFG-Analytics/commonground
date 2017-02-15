import React from 'react'
import Discussion from './Discussion'
import AddDiscussion from './AddDiscussion'
import DiscussionList from './DiscussionList'
import { getCamps } from '../actions/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

DiscussionList.need = [
  getCamps
]

class App extends React.Component{
  render(){
    return (<div>
      <AddDiscussion />
      <DiscussionList />
    </div>)
  }
}

//the section below is used (along side the .need above) to have the App
//component dispatch the getDiscussions axios call before rendering DiscussionList
const mapStateToProps = (state) => {
  return {
    commongrounds: state.campGet.commongrounds
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(getCamps, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)