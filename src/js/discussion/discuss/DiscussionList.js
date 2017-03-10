import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
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
    return (
      <div className='discussionsList'>
        {Object.keys(this.props.discussionsList).length > 0 && Object.keys(this.props.discussionsList).map((discussionId, index) =>
        <ButtonGroup vertical block className='buttonGroupEl'>
          <div className='topic'></div>
          <Link to={`/discuss/${discussionId}`}>
            <Button className="col-md-10 col-md-offset-1 discussButton">
              <Discussion
                key={discussionId}
                discussionId={discussionId}
                inputStr={this.props.discussionsList[discussionId].input}
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