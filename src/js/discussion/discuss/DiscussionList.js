import React, { PropTypes } from 'react'
import Discussion from './Discussion'
import { connect } from 'react-redux'
import { Col, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router'
import { getCamps } from '../camps/campActions'
require('./styles.css')

class DiscussionList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      ages:null
    }
  }

  fetchCamps(discussionId, fullname) {
    this.props.getCamps(discussionId, fullname)
  }

  render() {
    return (
      <div className='discussionsList'>
        {Object.keys(this.props.discussionsList).length > 0 && Object.keys(this.props.discussionsList).map((discussionId, index) =>
        <ButtonGroup vertical block className='buttonGroupEl'
          onClick={()=> this.fetchCamps(discussionId, this.props.fullname)}
        >
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
    fullname: state.profileReducer.fullname,
    discussionsList: state.discussionsGet.discussions
  }
} //we need the state.discussions array to pass into the DiscussionList as props
//we'd also need the articles retrieved from the get request
//DiscussionList then displays the discussions //

const mapDispatchToProps = (dispatch) => {
  return {
    getCamps: (discussionId, fullname) => {
      dispatch(getCamps(discussionId, fullname))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionList)