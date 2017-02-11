import React from 'react';
import ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Hello World!!! Testing hot loader.</h1>
      </div>);
  }
}
// export default class App extends React.Component {
//   render() {
//     console.log('HEYYYOOO');
//     return (
//      <div style={{textAlign: 'center'}}>
//         <h1>Hello World!!! Testing hot loader.</h1>
//       </div>);
//   }
// }

ReactDOM.render(<App />, document.getElementById('app'));