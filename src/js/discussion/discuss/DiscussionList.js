import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'

class DiscussionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ages:null
    }
  }

  render() {
    let thisObj = this;
    return (
      <ul>
        {thisObj.props.discussionsList.length > 0 && thisObj.props.discussionsList.map((discussionX, index) =>
          <Discussion
            key={discussionX.id}
            discussionId={discussionX.id}
            inputStr={discussionX.input}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    discussionsList: state.discussionsGet.discussions
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

export default connect(mapStateToProps)(DiscussionList)