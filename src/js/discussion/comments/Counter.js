import React from 'react'
import { increaseUpvotesPost, increaseDownvotesPost } from '../actions/actions'
import { connect } from 'react-redux'
import { ButtonToolbar, Glyphicon, Media, ButtonGroup, Button } from 'react-bootstrap';
require('./comment.css');



class Counter extends React.Component {
  render() {
    let currentUpvote = 0;
    let currentDownvote = 0;
    let commentId = this.props.commentId
    let userId = this.props.userId

    return (
      <div>
        <ButtonToolbar className="vote">
          <ButtonGroup>
            <Button onClick={() => {
              this.props.increaseUpvotesPost({
                vote: '1',
                commentId: commentId,
                userId: userId
              })
            }}
            ><Glyphicon className="upStyle" glyph="menu-up"></Glyphicon>
            </Button>
            <Button onClick={() => {
              this.props.increaseDownvotesPost({
                vote: '0',
                commentId: commentId,
                userId: userId
              })
            }}
            ><Glyphicon className="downStyle" glyph="menu-down"></Glyphicon>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="flag">
          <ButtonGroup>
            <Button>
              <Glyphicon className="flagStyle" glyph="flag"></Glyphicon>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments,
    userId: state.profileReducer.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    increaseUpvotesPost: (vote) => {
      dispatch(increaseUpvotesPost(vote))
    },
    increaseDownvotesPost: (vote) => {
      dispatch(increaseDownvotesPost(vote))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)



// <Button
//             type='submit'
//             onClick={() => {
//               console.log('arrow just upvoted')
//               this.props.increaseUpvotesPost({
//                 vote: '1',
//                 commentId: commentId,
//                 userId: userId
//             })
//           }}>
//           <span className="glyphicon glyphicon-menu-up upStyle" aria-hidden="true"></span>
//         </Button>
//         <span
//           className="glyphicon glyphicon-menu-down downStyle"
//           aria-hidden="true"
//           type='submit'
//           bsStyle="primary"
//           onClick={() => {
//             console.log('arrow just downvoted')
//             this.props.increaseDownvotesPost({
//               vote: '0',
//               commentId: commentId,
//               userId: userId
//             })
//           }}>
//         </span>