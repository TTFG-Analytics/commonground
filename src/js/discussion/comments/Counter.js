import React from 'react'
import { votesPost } from './commentActions'
import { connect } from 'react-redux'
import Constraint from '../camps/Constraint'
import Flag from './Flag'
import { contributedOnce } from './commentActions'
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
      userId: this.props.user.id
    })
    this.props.contributedOnce()
  }

  handleDownvote(e) {
    this.props.votesPost({
      vote: '0',
      commentId: this.props.commentId,
      userId: this.props.user.id
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
    // let currentUpvote = 0;
    // let currentDownvote = 0;
    let notLoggedIn = false
    // if(!this.props.user.id){
    //   notLoggedIn = true
    // }

            // <Constraint showModal={this.state.showModal} /> <---- removing constraints for testing

    return (
      <div>
        <ButtonToolbar className="vote">
          <ButtonGroup>
            <Button 
              disabled={notLoggedIn}
              onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleUpvote.bind(this)}
            ><Glyphicon className="upStyle" glyph="menu-up"></Glyphicon>
            </Button>
            <Button
              disabled={notLoggedIn}
              onClick={this.props.contributed ? this.stopUser.bind(this) : this.handleDownvote.bind(this)}
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
    },
    contributedOnce: () => {
      dispatch(contributedOnce())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)