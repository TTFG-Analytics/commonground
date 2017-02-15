import React, { PropTypes } from 'react'
import Camp from './Camp'
import { connect } from 'react-redux'

class CampList extends React.Component{
  render(){
    console.log('this camplist props', this.props)
    var currCamps = this.props.camps.filter(camp => {
      return camp.discussion_id == this.props.discussionId
    });
    console.log('currCamps', currCamps, this.props.camps)

    return (
      <ul>
        {currCamps.map(currCamp =>
          <Camp 
            key={currCamp.id}
            campId={currCamp.id}
            inputStr={currCamp.input}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('state', state);
  return {
    camps: state.campGet.commongrounds
  }
}

export default connect(mapStateToProps)(CampList)
//exports into CampParent which is a parent component containing the list of camps and the form to add a new camp