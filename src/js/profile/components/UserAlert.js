import React from 'react'
import { Alert, Button } from 'react-bootstrap'

class UserAlert extends React.Component{
  render() {
    return (
      <Alert bsStyle={this.props.alertStyle} onDismiss={this.props.handleAlertDismiss}>
        <h4>{this.props.alertMessage}</h4>
        <p>
          {this.props.handleAlertDismiss && <Button onClick={this.props.handleAlertDismiss}>{this.props.alertClose}</Button>}
        </p>
      </Alert>
    )
  }
}

export default UserAlert