import React from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import FaceBookIntegration from '../discussion/camps/FaceBookIntegration'
import store from '../store'

class Splash extends React.Component{
  render() {
    return (
      <Card style={{width: '33%', textAlign: 'center', margin: '0 auto', paddingBottom: '35px'}}>
        <CardTitle title='Welcome to CommonGround' />
        <CardText>Question and Answer app, debate app, demographic data collector...
          whatever you want to call this app, it's purpose is to help you find a 
          common ground with the groups you identify with and even the ones that you don't.
        </CardText>
        <CardText>
          Login with your Facebook by clicking the button below to get started.
        </CardText>
        <FaceBookIntegration store={store} />
      </Card>
    )
  }
}

export default Splash