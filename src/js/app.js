import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import App from './discussion/discuss/App'
import CampParent from './discussion/camps/CampParent'
import store from './store' //tie react application to redux
//import ProfileApp from './profile/components/profileApp'

//7) in client.js, import all components and render using ReactDOM
const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/discuss/:discussionId' component={CampParent} />
      
    </Router>
  </Provider>, app);

//      <Route path='*' component={NoMatch} /> add this to routing eventually for 404 page

