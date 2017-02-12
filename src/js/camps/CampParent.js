import React from 'react'
import Camp from './Camp'
import AddCamp from './AddCamp'
import CampList from './CampList'

//discussionId is used to associate which camps belong to which discussions
class CampParent extends React.Component{
  render(){
    console.log('discussionId', this.props.discussionId)
    return (<div>
      <AddCamp discussionId={this.props.discussionId} />
      <CampList discussionId={this.props.discussionId} />
    </div>)
  }
}

export default CampParent