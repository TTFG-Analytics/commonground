import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './discussion/discuss/App'
import CampParent from './discussion/camps/CampParent'
import store from './store' //tie react application to redux
import { Router, Route, browserHistory } from 'react-router'

//7) in client.js, import all components and render using ReactDOM
const app = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} />
      <Route path='/discussion/:discussionId' component={CampParent} />
    </Router>
  </Provider>, app);