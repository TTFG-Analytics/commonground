import React, { PropTypes } from 'react'
import Camp from './Camp'
import { connect } from 'react-redux'
import UserAlert from '../../profile/components/UserAlert'
import { Col, Row, Grid } from 'react-bootstrap';

require('./camp.css')

class CampList extends React.Component{
  render(){
    /*if(Object.keys(this.props.camps).length === 0){
      return (
        <Col md={10} mdOffset={1}>
          <UserAlert 
            alertMessage='The creator of this discussion never specified any CommonGrounds.'
            alertStyle='info' />
        </Col>
      )
    }*/
    return (
      <div className='campground'>
        {Object.keys(this.props.camps).map(campId =>
          <Camp
            key={campId}
            campId={campId}
            inputStr={this.props.camps[campId].input}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camps: state.campGet.commongrounds
  }
}

export default connect(mapStateToProps)(CampList)
//exports into CampParent which is a parent component containing the list of camps and the form to add a new camp