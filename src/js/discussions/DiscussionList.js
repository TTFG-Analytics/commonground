import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'
// import { bindActionCreators } from 'redux';

class DiscussionList extends React.Component{

  render() {
    let thisObj = this
    var articles = []
    for(let article in thisObj.props.articles){
      articles.push(article)
    }
    console.log('articles in DiscussionList', articles)
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
        {articles.length > 0 && articles.map((articleX, index) =>
          <li key={index}>{articleX}</li>
        )}
      </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    discussions: state.discussions,
    articles: state.articleGet.articles
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

export default connect(mapStateToProps)(DiscussionList)