import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './discussion/discuss/App'
import Analytics from './discussion/discuss/Analytics'
import CampParent from './discussion/camps/CampParent'
import store from './store' //tie react application to redux
import FaceBookIntegration from './discussion/camps/FaceBookIntegration'
import ProfileApp from './profile/components/profileApp'

//7) in client.js, import all components and render using ReactDOM
const app = document.getElementById('app')

ReactDOM.render(
  <div>
  <FaceBookIntegration store={store} />
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/discuss/:discussionId' component={CampParent} />
      <Route path='/userprofile' component={ProfileApp} />
    </Router>
  </Provider> </div>, app
  );

//      <Route path='*' component={NoMatch} /> add this to routing eventually for 404 page

