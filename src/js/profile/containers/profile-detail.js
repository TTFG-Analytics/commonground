import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile, postProfile} from '../actions/profileActions';
import FaceBookIntegration from '../../discussion/camps/FaceBookIntegration'
import { FormGroup, FormControl, ControlLabel, Button, Col, Panel, Alert } from 'react-bootstrap'
import raceProfile from '../dropdowns/raceProfile'
import politicalProfile from '../dropdowns/politicalProfile'
import industryProfile from '../dropdowns/industryProfile'
import religionProfile from '../dropdowns/religionProfile'
import incomeProfile from '../dropdowns/incomeProfile'
import Select from '../components/Select'
import AgeInput from '../components/AgeInput'
import UserAlert from '../components/UserAlert'

class UserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      age: null,
      hometown: null,
      race: null,
      industry: null,
      politicalleaning: null,
      religion: null,
      yearlyincome: null,
      infoUpdated: false
    }
  }

  componentDidMount() {
    let context = this
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var uid = response.authResponse.userID;
        var accessToken = response.authResponse.accessToken;
        context.props.getProfile(uid)
      } else if (response.status === 'not_authorized') {
        console.log('user is logged into Facebook but not authenticated');
      } else {
        console.log('user is not logged in to to facebook');
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault()
    var thisObj = this
    this.props.postProfile({
      id: 19, //thisObj.props.profile.id,
      age: thisObj.state.age,
      race: thisObj.state.race,
      industry: thisObj.state.industry,
      politicalleaning: thisObj.state.politicalleaning,
      religion: thisObj.state.religion,
      yearlyincome: thisObj.state.yearlyincome
    }, function(){
      console.log('profile callback started......', thisObj)
      thisObj.setState({
        infoUpdated: true
      })
      return;
    })
  }


  handleChange(propertyName, event) {
    const profile = this.state;
    profile[propertyName] = event.target.value;
    this.setState({[propertyName]: profile[propertyName]});
  }

  handleAlertDismiss() {
    this.setState({
      infoUpdated: false
    })
  }

  render (){

    var raceList = raceProfile.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

     var politicalList = politicalProfile.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    var industryList = industryProfile.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    var religionList = religionProfile.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

     var incomeList = incomeProfile.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })
    const profileHeader = (
      <h2>Profile Settings: </h2>
    );
    
    return (
      <Col md={8} mdOffset={2} style={{marginTop: '175px'}}>
      <Panel header={profileHeader} style={{backgroundColor: '#2C3340', color: '#EBF5EE'}}>

      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormGroup controlId="formControlsSelect">
          <AgeInput handleChange={this.handleChange.bind(this, 'age')} />

          <Select label='Race' demographicProperty='race' list={raceList} handleChange={this.handleChange.bind(this, 'race')} />

          <Select label='Political Leaning' demographicProperty='politicalleaning' list={politicalList} handleChange={this.handleChange.bind(this, 'politicalleaning')} />

          <Select label='Industry' demographicProperty='industry' list={industryList} handleChange={this.handleChange.bind(this, 'industry')} />
          
          <Select label='Religion' demographicProperty='religion' list={religionList} handleChange={this.handleChange.bind(this, 'religion')} />
          
          <Select label='Yearly Income' demographicProperty='yearlyincome' list={incomeList} handleChange={this.handleChange.bind(this, 'yearlyincome')} />
        </FormGroup>
        {this.state.infoUpdated && <UserAlert 
          handleAlertDismiss={this.handleAlertDismiss.bind(this)} 
          alertMessage='Your profile has been updated!'
          alertStyle='success'
          alertClose='Hide Alert' />}
        <Button type='submit' bsStyle="primary">Submit</Button>

      </form>
      </Panel>
      </Col>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fbGet: state.fbGet,
    profile: state.profileReducer
  };
}

const matchDispatchToProps = (dispatch) => {
  return {
    getProfile: (uid) => {
      dispatch(getProfile(uid))
    },
    postProfile: (profile, callback) => {
      dispatch(postProfile(profile, callback))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);