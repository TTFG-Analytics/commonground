import React from 'react'
import { connect } from 'react-redux'
import Counter from './Counter'
import CommentAnalytics from '../../analytics/CommentAnalytics'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';

//Require this if you plan on doing custom css in your component!
require('./comment.css');

class Comment extends React.Component{
  render(){
    let commentId = this.props.commentId
    let comment = this.props.comments[commentId]
    let fbPic = comment.facebookpicture.replace('$2', '?')

    return (
      <Col md={11} >
        <div className='well commentDiv'>
          <Media>
            <Media.Left align="top">
              <img width={64} height={64} src={fbPic} alt="Image"/>
            </Media.Left>
            <Media.Body>
              <Media.Heading>{comment.input}
              </Media.Heading>
                <CommentAnalytics 
                  commentId={commentId}
                  upvotecounter={comment.upvotecounter}
                  downvotecounter={comment.downvotecounter}
                  className="delta">
                  {comment.delta}
                </CommentAnalytics>
              <p>{comment.fullname}</p>
              <p className="timeStyle"> - <em>{new Date(comment.createdat).toLocaleString()}</em></p>
            </Media.Body>
            <Media>
              <Counter commentId={commentId}/>
            </Media>
          </Media>
        </div>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentGet.comments
  }
}

export default connect(mapStateToProps)(Comment);


    // var deltaStyle
    // if(comment.delta && comment.delta > 0) {
    //   deltaStyle = {float: 'right', color:'green', fontSize: '16px'}
    // } else if (delta === 0) {
    //   deltaStyle = {float: 'right', color:'black', fontSize: '16px'}
    // } else {
    //   deltaStyle = {float: 'right', color:'red', fontSize: '16px'}
    // }
    // deltaStyle={deltaStyle}