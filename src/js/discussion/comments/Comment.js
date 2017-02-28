import React from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'
import CommentAnalytics from './CommentAnalytics'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';

//Require this if you plan on doing custom css in your component!
require('./comment.css');

class Comment extends React.Component{
  render(){

    var dummyComment = {
      pic: "http://eventraveler.com/images/avatar.png", //Issues with facebook pic url
      facebook: "https://scontent.xx.fbcdn.net/v/t1.0-1/c32.7.160.160/p200x200/10422293_10202393513548914_4261672171306231457_n.jpg?oh=563a76424ee558968112b2fca4391aea&oe=594454DB",
      name: "Greg Bacus",
      input: "Hello, my name is Greg and I am posting the greatest comment of all time. This comment should be upvoted into the stratosphere. Thanks for your support.",
      createdAt: new Date(),
    }

    var delta = 0;
    this.props.comments.forEach((comment) => {
      if(comment.id === this.props.commentId) {
        delta = comment.delta
      }
    })
    var deltaStyle;

    if(dummyComment.delta > 0) {
      deltaStyle = {float: 'right', color:'green', fontSize: '16px'}
    } else {
      deltaStyle = {float: 'right', color:'red', fontSize: '16px'}
    }

    return (

      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <div className='well'>
                <Media>
                  <Media.Left align="top">
                    <img width={64} height={64} src={dummyComment.facebook} alt="Image"/>
                  </Media.Left>
                  <Media.Body>
                    <Media.Heading>{this.props.user.fullname}<span style={deltaStyle} >{delta}</span></Media.Heading>
                    <p>{this.props.inputStr}</p>
                    <p className="timeStyle"> - <em>{dummyComment.createdAt.toDateString() + ' at ' + dummyComment.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</em></p>
                  </Media.Body>
                  <Media>
                    <Counter commentId={this.props.commentId}/>
                  </Media>
                </Media>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>

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