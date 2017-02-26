import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { createDiscussionPost, createDiscussionSuccess } from '../actions/actions'
import Input from 'react-toolbox/lib/input'
//import { IconButton} from 'react-toolbox/lib/button'
import io from 'socket.io-client'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';
import Navigation from '../../navbar/navbar'

// import styles from "../../../styles.css"
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.css';


class AddDiscussion extends React.Component{

  constructor(props){
    super(props)

    this.state = {
      discussionValue: ''
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    console.log('HANDLE CHANGE THIS', this);
    this.setState({ discussionValue: e.target.value });
  }

  componentDidMount(){
    window.discussionSocket = io();
    discussionSocket.on('connect', function() {
      console.log('AddDiscussion hit');
    });
    discussionSocket.on('discussion', (data) => {
      console.log('FRONT END DATA', data);
        this.props.createDiscussionSuccess(data)
    })
  }

  componentWillUnmount() {
    console.log('started unmounting')
    if(window.discussionSocket) {
      console.log('unmounting window discussionSocket', window.discussionSocket)
      window.discussionSocket.disconnect()
      console.log('unmounted window discussionSocket', window.discussionSocket)
    }
  }

  render() {
    var dummyComment = {
      pic: "http://eventraveler.com/images/avatar.png", //Issues with facebook pic url
      facebook: "https://scontent.xx.fbcdn.net/v/t1.0-1/c32.7.160.160/p200x200/10422293_10202393513548914_4261672171306231457_n.jpg?oh=563a76424ee558968112b2fca4391aea&oe=594454DB",
      name: "Greg Bacus",
      input: "Hello, my name is Greg and I am posting the greatest comment of all time. This comment should be upvoted into the stratosphere. Thanks for your support.",
      createdAt: new Date(),
      delta: -102
    }

    var upStyle = {
      fontSize: '25px',
      color: 'green',
      float: 'right'
    }

    var downStyle = {
      fontSize: '25px',
      color: 'red',
      float: 'right'
    }

    var flagStyle = {
      fontSize: '20px',
      color: 'red',
      float: 'left',
      align: 'left'
    }

    var timeStyle = {
      float: 'right',
      fontSize: '14px'
    }

    var deltaStyle;

    if(dummyComment.delta > 0) {
      deltaStyle = {float: 'right', color:'green', fontSize: '16px'}
    } else {
      deltaStyle = {float: 'right', color:'red', fontSize: '16px'}
    }

    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          let newDiscussion = {topic: this.state.discussionValue}

          if(window.discussionSocket){
            console.log('window discussionSocket', window, window.discussionSocket)
            console.log('New Discussion', newDiscussion);
            window.discussionSocket.emit('discussion', newDiscussion)
          }
          // this.props.createDiscussionSuccess(newDiscussion)
          this.refs.discussion.value = '';
        }}>


          <FormGroup controlId="formBasicText">
            <ControlLabel>Create a New Discussion</ControlLabel>
            <FormControl
              type="text"
              value={this.state.discussionValue}
              placeholder="Enter text"
              ref='discussion'
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback />
            <HelpBlock>Character limit: </HelpBlock>
          </FormGroup>
          <Button type='submit' bsStyle="primary">Submit</Button>

        </form>

        <br></br>



          <Grid>
            <Row className="show-grid">
              <Col md={6} mdPush={6}>
                <div className='well'>
                  <Media>
                    <Media.Left align="top">
                      <img width={64} height={64} src={dummyComment.facebook} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>{dummyComment.name}<span style={deltaStyle} >{dummyComment.delta}</span></Media.Heading>
                      <p>{dummyComment.input}</p>
                      <p style={timeStyle}> - <em>{dummyComment.createdAt.toDateString() + ' at ' + dummyComment.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</em></p>
                    </Media.Body>
                    <Media>
                      <span className="glyphicon glyphicon-menu-up" aria-hidden="true" style={upStyle}></span>
                      <span className="glyphicon glyphicon-menu-down" aria-hidden="true" style={downStyle}></span>
                      <span className="glyphicon glyphicon-flag" aria-hidden="true" style={flagStyle}></span>
                    </Media>
                  </Media>
                </div>
              </Col>
              <Col md={6} mdPull={6}>
              <div className='well'>
                  <Media>
                    <Media.Left align="top">
                      <img width={64} height={64} src={dummyComment.facebook} alt="Image"/>
                    </Media.Left>
                    <Media.Body>
                      <Media.Heading>{dummyComment.name}<span style={deltaStyle} >{dummyComment.delta}</span></Media.Heading>
                      <p>{dummyComment.input}</p>
                      <p style={timeStyle}> - <em>{dummyComment.createdAt.toDateString() + ' at ' + dummyComment.createdAt.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</em></p>
                    </Media.Body>
                    <Media>
                      <span className="glyphicon glyphicon-menu-up" aria-hidden="true" style={upStyle}></span>
                      <span className="glyphicon glyphicon-menu-down" aria-hidden="true" style={downStyle}></span>
                      <span className="glyphicon glyphicon-flag" aria-hidden="true" style={flagStyle}></span>
                    </Media>
                  </Media>
                </div>
              </Col>
            </Row>
          </Grid>

        <br></br>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDiscussionSuccess: (discussion) => {
      dispatch(createDiscussionSuccess(discussion))
    }
  }
}

AddDiscussion = connect(null, mapDispatchToProps)(AddDiscussion)

export default AddDiscussion


