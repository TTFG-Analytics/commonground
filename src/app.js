import React from 'react';
import ReactDOM from "react-dom";

export default class App extends React.Component {
  render() {
    console.log('HEYYYOOO');
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World!!! Testing hot loader.</h1>
      </div>);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));