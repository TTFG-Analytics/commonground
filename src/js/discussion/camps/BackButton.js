import React from 'react'
import { browserHistory } from 'react-router'

class BackButton extends React.Component{
  render() {
    return (
      <h4 className='btn' onClick={browserHistory.goBack}>
      Back
      </h4>
    )
  }
}

export default BackButton