const React = require('react');
import Navigation from '../navbar/navbar'

class About extends React.Component{
  render(){
    return (
      <div>
      <Navigation />
      <h3>About Component</h3>
      <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et eleifend turpis. Morbi eleifend nisi eu ornare blandit. Nulla auctor risus id metus fermentum maximus. Nulla facilisi. Pellentesque eget finibus lectus. In eu hendrerit purus, et malesuada ante. Mauris dolor nisi, laoreet id lectus feugiat, congue consequat turpis. Donec id nunc augue.

Nunc orci nulla, iaculis a nulla vel, imperdiet rutrum nulla. Sed gravida, lectus eget mattis viverra, dui mauris suscipit dolor, quis molestie massa purus at diam. Fusce lobortis ullamcorper sem ac feugiat. Cras maximus mi bibendum, accumsan ipsum vitae, tempus nulla. Vivamus nec sodales nunc, ut porta diam. Fusce euismod, dolor et dictum tincidunt, magna est aliquam elit, ac ultrices erat quam et nibh. Suspendisse luctus posuere ante. Vivamus in orci id lacus imperdiet suscipit ac ut nisi.

Sed non rutrum ante. Nullam blandit justo id scelerisque varius. Maecenas eget hendrerit felis. Duis ultricies orci turpis. Donec euismod dui nec augue volutpat, quis ultricies elit bibendum. Duis feugiat maximus rutrum. In dignissim faucibus mattis. Sed egestas nulla vitae nulla interdum semper.</div>
      </div>
    )
  }
}

module.exports = About;