import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'
// import { bindActionCreators } from 'redux';

class DiscussionList extends React.Component{
  // componentWillMount() {
  //   axios.get('https://chicagowepapp.firebaseio.com/articles.json')
  //     .then((result) => {
  //       console.log('get request successful')
  //       getDiscussions(result)
  //     })
  // }

  render() {
    let thisObj = this
    var articles = []
    for(let article in thisObj.props.articles){
      articles.push(article)
    }
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
        {articles.length > 0 && articles.map(articleX =>
          <li>{articleX}</li>
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
} //all we need is the state.discussions array to pass into the DiscussionList as props
//DiscussionList then displays the discussions //

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(getDiscussions, dispatch)
// } thisObj.props.articles && thisObj.props.articles.map((article) => {
        //   <li>{article}
        //   </li>
        // })

export default connect(mapStateToProps)(DiscussionList)