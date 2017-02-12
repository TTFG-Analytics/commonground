import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store' //tie react application to redux

//7) in client.js, import all components and render using ReactDOM
const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, app);