import React, { PropTypes } from 'react'
import Camp from './Camp'
import { connect } from 'react-redux'

class CampList extends React.Component{
  render(){
    var currCamps = this.props.camps.filter(camp => {
      return camp.discussionId === this.props.discussionId
    });

    return (
      <ul>
        {currCamps.map(currCamp =>
          <Camp 
            key={currCamp.campId}
            campId={currCamp.campId}
            {...currCamp}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    camps: state.camps
  }
}

export default connect(mapStateToProps)(CampList)
//exports into CampParent which is a parent component containing the list of camps and the form to add a new camp