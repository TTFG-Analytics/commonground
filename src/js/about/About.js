const React = require('react');
import Navigation from '../navbar/navbar'

class About extends React.Component{
  render(){
    return (
      <div>
      <Navigation />
      <h1>About</h1>

        <div>
          <h3>What this app is about</h3>
          <p>
            This is a social app designed to facilitate comunication between different viewpoints.
          </p>
          <h3>How to use this app</h3>
          <p>
            By signing in through facebook, you will be able to create a discussion, create a comment, or vote on a post.
            However you are not required to be signed in to browse content. If there are multiple users on your computer,
            there is an ability to logout and login with a different facebook ID. Please note that this will also log you
            out of facebook proper.
          </p>
          <h3>Rules</h3>
          <p>
            <ul>
              <li>No ad hominem attacks</li>
              <li>Be nice and civil</li>
            </ul>
          </p>
          <h3>How we use your data</h3>
          <p>
            Nunc orci nulla, iaculis a nulla vel, imperdiet rutrum nulla. Sed gravida, 
            lectus eget mattis viverra, dui mauris suscipit dolor, quis molestie massa 
            purus at diam. Fusce lobortis ullamcorper sem ac feugiat. Cras maximus mi 
            bibendum, accumsan ipsum vitae, tempus nulla. Vivamus nec sodales nunc, ut 
            porta diam. Fusce euismod, dolor et dictum tincidunt, magna est aliquam 
            elit, ac ultrices erat quam et nibh. Suspendisse luctus posuere ante. 
            Vivamus in orci id lacus imperdiet suscipit ac ut nisi.
          </p>
          <h3>About Us</h3>
          <p>
            TTFG are a group of like minded software engineers hoping to make the world a better place, one app at a time.
          </p>

        </div>
      </div>
    )
  }
}

module.exports = About;