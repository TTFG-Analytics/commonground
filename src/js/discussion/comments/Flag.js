import React from 'react'
import { OverlayTrigger, Tooltip, ButtonToolbar, Glyphicon, Media, ButtonGroup, Button } from 'react-bootstrap';
require('./comment.css');

class Flag extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      flagStyle: 'flagStyleInactive'
    }
  }

  handleClick() {
    if (this.state.flagStyle === 'flagStyleInactive') {
      this.setState({
        flagStyle:'flagStyleActive'
      })
    } else {
      this.setState({
        flagStyle:'flagStyleInactive'
      })
    }
  }
  
  render() {
    return (
      <ButtonToolbar className="flag">
        <ButtonGroup>
          <OverlayTrigger placement="top" overlay={
            <Tooltip id="tooltip">Flag Comment as Inappropriate</Tooltip>
          }>
            <Button onClick={this.handleClick.bind(this)}>
              <Glyphicon className={this.state.flagStyle} glyph="flag"></Glyphicon>
            </Button>
          </OverlayTrigger>
        </ButtonGroup>
      </ButtonToolbar>
    )
  }
}

export default Flag