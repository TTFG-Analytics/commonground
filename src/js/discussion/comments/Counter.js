import React from 'react'
import { votesPost } from './commentActions'
import { connect } from 'react-redux'
import Flag from './Flag'
import { OverlayTrigger, Tooltip, ButtonToolbar, Glyphicon, Media, ButtonGroup, Button } from 'react-bootstrap';
require('./comment.css');


class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flagStyle: 'flagStyleInactive'
    }
  }

  handleUpvote(e) {
    this.props.votesPost({
      vote: '1',
      commentId: this.props.commentId,
      userId: this.props.user.id
    })
  }

  handleDownvote(e) {
    this.props.votesPost({
      vote: '0',
      commentId: this.props.commentId,
      userId: this.props.user.id
    })
  }

  stopUser(e) {
    e.preventDefault()
  }

  render() {
    let notLoggedIn = false
    if(!this.props.user.id){
      notLoggedIn = true
    }

    return (
      <div>
        <ButtonToolbar className="vote">
          <ButtonGroup>
            <Button 
              disabled={notLoggedIn}
              onClick={this.handleUpvote.bind(this)}
            ><Glyphicon className="upStyle" glyph="menu-up"></Glyphicon>
            </Button>
            <Button
              disabled={notLoggedIn}
              onClick={this.handleDownvote.bind(this)}
            ><Glyphicon className="downStyle" glyph="menu-down"></Glyphicon>
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Flag />

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments,
    user: state.profileReducer,
    contributed: state.campGet.contributed
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    votesPost: (vote) => {
      dispatch(votesPost(vote))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)

// import Constraint from '../camps/Constraint'
// <Constraint showModal={this.state.showModal} /> <---- removing constraints for testing
// this.state{showModal: false}
// this.setState({
//   showModal: true
// }) <---this.setState belongs in the stopUser function. Since we're not using the constraint modal for now, we can leave this out of the function

// onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleUpvote.bind(this)} <-- allowing for multiple upvotes/downvotes for testing
// onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleDownvote.bind(this)}