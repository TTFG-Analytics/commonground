import React from 'react'
import {connect} from 'react-redux'
import {cachingFbData} from '../actions/actions'
import {sendingFbData} from '../actions/actions'

class FaceBookIntegration extends React.Component{
    componentDidMount() {
    // facebook signin  button render
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1791758217766999',
        cookie     : true,  // enable cookies to allow the server to access
        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
      const context = this;
      // login callback implementation goes inside the function() { ... } block
      FB.Event.subscribe('auth.statusChange', function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', 'GET', {fields: 'name, id, gender, locale, age_range, email, picture.width(150).height(150)'}, function(response) {
            console.log('Good to see you, ' + response.name + '.');
            console.log('Response', response);
            console.log('Response.email', response.email)
            console.log('CONTEXT', context)
            context.getFbData(response)

            context.props.sendingFbData(response)
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
          window.location.href = "http://localhost:4040"
        }
      },
      {scope: 'email'}
      );
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // (FB.Event.subscribe('auth.logout', (response) => console.log('*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*$*LOGOUT')))
  getFbData(fbUserData){
    this.props.cachingFbData(fbUserData)
  }

  render(){
    return (
    <div>
      <div className="fb-login-button" data-max-row="1" data-size="xlarge" data-show-faces="false"
      data-auto-logout-link="true" data-scope="public_profile, email"
      href="javascript:void(0)">Login</div>
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    fbName: state.fbGet.fbName,
    fbId: state.fbGet.fbId,
    fbGender: state.fbGet.fbGender,
    fbLocale: state.fbGet.fbLocale,
    fbEmail: state.fbGet.fbEmail,
    fbPicture: state.fbGet.fbPicture
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cachingFbData: (fbUserData) => {
      dispatch(cachingFbData(fbUserData))
    },
    sendingFbData: (response) => {
      dispatch(sendingFbData(response))
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(FaceBookIntegration)