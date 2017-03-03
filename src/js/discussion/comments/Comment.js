import React from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'
import CommentAnalytics from '../../analytics/CommentAnalytics'
import VoteDetail from './VoteDetail'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';

//Require this if you plan on doing custom css in your component!
require('./comment.css');

class Comment extends React.Component{
  render(){

    var dummyComment = {
      pic: "http://eventraveler.com/images/avatar.png", //Issues with facebook pic url
      // facebook: "https://scontent.xx.fbcdn.net/v/t1.0-1/c32.7.160.160/p200x200/10422293_10202393513548914_4261672171306231457_n.jpg?oh=563a76424ee558968112b2fca4391aea&oe=594454DB",
      // name: "Greg Bacus",
      // input: "Hello, my name is Greg and I am posting the greatest comment of all time. This comment should be upvoted into the stratosphere. Thanks for your support.",
      createdAt: new Date(),
    }

    var delta = 0;
    var facebookpicture = ''
    var fullname = ''
    var createdat = new Date();
    var upvotecounter = 0
    var downvotecounter = 0
    this.props.comments.forEach((comment) => {
      if(comment.id === this.props.commentId) {
        delta = comment.delta
        upvotecounter = comment.upvotecounter
        downvotecounter = comment.downvotecounter
        facebookpicture = comment.facebookpicture
        fullname = comment.fullname
        createdat = comment.createdat || new Date();
      }
    })
    var deltaStyle;

    if(delta > 0) {
      deltaStyle = {float: 'right', color:'green', fontSize: '16px'}
    } else if (delta === 0) {
      deltaStyle = {float: 'right', color:'black', fontSize: '16px'}
    } else {
      deltaStyle = {float: 'right', color:'red', fontSize: '16px'}
    }

    // <Grid>
          // <Row className="show-grid">
// <Col md={6} smOffset={1}>
// </Col>
// </Row>
        // </Grid>

    return (
      <Col md={11} >
        <div className='well commentDiv'>
          <Media>
            <Media.Left align="top">
              <img width={64} height={64} src={facebookpicture} alt="Image"/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.inputStr}
              </Media.Heading>
                <CommentAnalytics 
                  commentId={this.props.commentId}
                  upvotecounter={upvotecounter}
                  downvotecounter={downvotecounter}
                  className="delta" 
                  deltaStyle={deltaStyle} >
                  {delta}
                </CommentAnalytics>
              <p>{fullname}</p>
              <p className="timeStyle"> - <em>{new Date(createdat).toLocaleString()}</em></p>
            </Media.Body>
            <Media>
              <Counter commentId={this.props.commentId}/>
            </Media>
          </Media>
        </div>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.profileReducer,
    comments: state.commentGet.comments
  }
}

export default connect(mapStateToProps)(Comment);