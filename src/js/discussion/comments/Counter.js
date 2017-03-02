import React from 'react'
import { votesPost } from '../actions/actions'
import { connect } from 'react-redux'
import Constraint from '../camps/Constraint'
import { contributedOnce } from '../actions/actions'
import { OverlayTrigger, Tooltip, ButtonToolbar, Glyphicon, Media, ButtonGroup, Button } from 'react-bootstrap';
require('./comment.css');


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flagStyle: 'flagStyleInactive',
      showModal: false
    }
  }

  handleUpvote(e) {
    this.props.votesPost({
      vote: '1',
      commentId: this.props.commentId,
      userId: this.props.userId
    })
    this.props.contributedOnce()
  }

  handleDownvote(e) {
    this.props.votesPost({
      vote: '0',
      commentId: this.props.commentId,
      userId: this.props.userId
    })
    this.props.contributedOnce()
  }

  stopUser(e) {
    e.preventDefault()
    this.setState({
      showModal: true
    })
    console.log('user stopped', this.state)
    this.forceUpdate()
  }

  render() {
    let currentUpvote = 0;
    let currentDownvote = 0;

    return (
      <div>
        <ButtonToolbar className="vote">
          <ButtonGroup>
            <Button onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleUpvote.bind(this)}
            ><Glyphicon className="upStyle" glyph="menu-up"></Glyphicon>
            </Button>
            <Button onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleDownvote.bind(this)}
            ><Glyphicon className="downStyle" glyph="menu-down"></Glyphicon>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="flag">
          <ButtonGroup>
             <OverlayTrigger placement="top" overlay={
                <Tooltip id="tooltip">Flag Comment as Inappropriate</Tooltip>
              }>
              <Button onClick={()=> {
                if (this.state.flagStyle === 'flagStyleInactive') {
                  this.setState({
                    flagStyle:'flagStyleActive'
                  })
                } else {
                  this.setState({
                    flagStyle:'flagStyleInactive'
                  })
                }
              }}>
                <Glyphicon className={this.state.flagStyle} glyph="flag"></Glyphicon>
              </Button>
            </OverlayTrigger>
          </ButtonGroup>
        </ButtonToolbar>
        <Constraint showModal={this.state.showModal} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments,
    userId: state.profileReducer.id,
    contributed: state.campGet.contributed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    votesPost: (vote) => {
      dispatch(votesPost(vote))
    },
    contributedOnce: () => {
      dispatch(contributedOnce())
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