import React from 'react'
import { browserHistory } from 'react-router'

class BackButton extends React.Component{
  render() {
    return (
      <button className='btn' onClick={browserHistory.goBack}>
      Back
      </button>
    )
  }
}

export default BackButton