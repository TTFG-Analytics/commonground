import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'
// import { bindActionCreators } from 'redux';

class DiscussionList extends React.Component{

  render() {
    let thisObj = this
    // let discussionsListArr = []
    // console.log('state discussions', this.props.discussionsList)
    // for(let i in thisObj.props.discussionsList){
    //   discussionsListArr.push(thisObj.props.discussionsList[i])
    // }

    // console.log('discussions in DiscussionList', discussionsListArr)
    return (
      <div>
      <ul>
        {thisObj.props.discussions.map(discussion =>
          <Discussion 
            key={discussion.id}
            discussionId={discussion.id}
            {...discussion}
          />  
        )}
      </ul>
      <ul>
        {thisObj.props.discussionsList.length > 0 && thisObj.props.discussionsList.map((discussionX, index) =>
          <h3 key={index}>{discussionX.input}</h3>
        )}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussions: state.discussions,
    discussionsList: state.discussionsGet.discussions
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

export default connect(mapStateToProps)(DiscussionList)

    // var commongrounds = []
    // console.log('state commongrounds', this.props.commongrounds)
    // for(let i in thisObj.props.commongrounds){
    //   commongrounds.push(thisObj.props.commongrounds[i])
    // }

// //{commongrounds.length > 0 && commongrounds.map((commongroundX, index) =>
//           <h3 key={index}>{commongroundX.input}</h3>
//         )}