import React from 'react'
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import FaceBookIntegration from '../discussion/camps/FaceBookIntegration'
import store from '../store'
import { AppBar } from 'react-toolbox/lib/app_bar'
import BackButton from '../discussion/camps/BackButton'
import ProfileButton from '../discussion/camps/ProfileButton'
import { Link } from 'react-router'

class Logout extends React.Component{
  render() {
    return (
      <div>
        <AppBar>
          <BackButton />
          <ProfileButton />
        </AppBar>
        <Card style={{width: '33%', textAlign: 'center', margin: '0 auto', paddingBottom: '35px'}}>
          <CardTitle title='See you soon...' />
          <CardText>
            Note: This will log you out of your Facebook.
          </CardText>
          <FaceBookIntegration store={store} />
        </Card>
      </div>
    )
  }
}

export default Logout