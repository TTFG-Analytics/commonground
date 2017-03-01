import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import axios from 'axios'
import { getDiscussions } from '../actions/actions'
import { Col, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router'
require('./styles.css')

class DiscussionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ages:null
    }
  }

  render() {
    let thisObj = this;
    return (
      <div>
        {thisObj.props.discussionsList.length > 0 && thisObj.props.discussionsList.map((discussionX, index) =>
        <ButtonGroup vertical block >
          <Link to={`/discuss/${discussionX.id}`}>
            <Button className="col-md-10 col-md-offset-1">
              <Discussion
                key={discussionX.id}
                discussionId={discussionX.id}
                inputStr={discussionX.input}
              />
            </Button>
          </Link>
        </ButtonGroup>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    discussionsList: state.discussionsGet.discussions
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

export default connect(mapStateToProps)(DiscussionList)