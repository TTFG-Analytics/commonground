import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile, postProfile} from '../actions/profileActions';
import Input from 'react-toolbox/lib/input';
// import Dropdown from 'react-toolbox/lib/dropdown';
// import {Button, IconButton} from 'react-toolbox/lib/button';
import FaceBookIntegration from '../../discussion/camps/FaceBookIntegration'
import { Button, FormControl, HelpBlock, FormGroup, ControlLabel, Grid, Row, Col, Media } from 'react-bootstrap';


class UserProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: null,
      gender: null
    }
  }

  componentDidMount() {
    let context = this
    console.log('profile context', context)
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('user is logged in and authenticated', response);
        console.log('profile details props', context.props);
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
    console.log('this', this)
    var thisObj = this
    console.log('thisObj', thisObj)
    this.props.postProfile({
      id: thisObj.props.profile.id,
      title: thisObj.refs.title.refs.wrappedInstance.inputNode.value,
      age: thisObj.refs.age.refs.wrappedInstance.inputNode.value,
      hometown: thisObj.refs.hometown.refs.wrappedInstance.inputNode.value,
      race: thisObj.refs.race.refs.wrappedInstance.inputNode.value,
      industry: thisObj.refs.industry.refs.wrappedInstance.inputNode.value,
      politicalleaning: thisObj.refs.politicalleaning.refs.wrappedInstance.inputNode.value,
      religion: thisObj.refs.religion.refs.wrappedInstance.inputNode.value,
      yearlyincome: thisObj.refs.yearlyincome.refs.wrappedInstance.inputNode.value
    })
  }

  handleChange(e) {
    this.setState({ cgValue: e.target.value });
  }

  render (){

    const gender = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'Male'},
      {value: 2, label: 'Female'},
      {value: 3, label: 'Other'},
    ];

    var genderList = gender.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    const race = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'White Hispanic'},
      {value: 2, label: 'White Non-Hispanic'},
      {value: 3, label: 'Black or African American'},
      {value: 4, label: 'American Indiana or Alaska Native'},
      {value: 5, label: 'Asian'},
      {value: 6, label: 'Native Hawaiian or Other Pacific Islander'},
      {value: 7, label: 'Other'}
    ];

    var raceList = race.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    const politicalleaning = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'Conservative'},
      {value: 2, label: 'Authoritarian'},
      {value: 3, label: 'Centrist'},
      {value: 4, label: 'Libertarian'},
      {value: 5, label: 'Progressive'}
    ];

     var politicalleaningList = politicalleaning.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    const industry = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'Aerospace, defence & security'},
      {value: 2, label: 'Asset & wealth management'},
      {value: 3, label: 'Automotive'},
      {value: 4, label: 'Banking & capital markets'},
      {value: 5, label: 'Capital projects & infrastructure'},
      {value: 6, label: 'Chemicals'},
      {value: 7, label: 'Communications'},
      {value: 8, label: 'Energy, utilities & mining'},
      {value: 9, label: 'Engineering & construction'},
      {value: 10, label: 'Entertainment & media'},
      {value: 11, label: 'Financial services'},
      {value: 12, label: 'Forest, paper & packaging'},
      {value: 13, label: 'Government & public services'},
      {value: 14, label: 'Healthcare'},
      {value: 15, label: 'Hospitality & leisure'},
      {value: 16, label: 'Industrial manufacturing'},
      {value: 17, label: 'Insurance'},
      {value: 18, label: 'Metals'},
      {value: 19, label: 'Pharmaceuticals & life sciences'},
      {value: 20, label: 'Private equity'},
      {value: 21, label: 'Retail & consumer'},
      {value: 22, label: 'Sovereign investment funds'},
      {value: 23, label: 'Technology'},
      {value: 24, label: 'Transportation & logistics'},
      {value: 25, label: 'Other'}
    ]

    var industryList = industry.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    const religion = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'Protestant'},
      {value: 2, label: 'Catholic'},
      {value: 3, label: 'Mormon'},
      {value: 4, label: 'Other Christian'},
      {value: 5, label: 'Judaism'},
      {value: 6, label: 'Islam'},
      {value: 7, label: 'Buddhism'},
      {value: 8, label: 'Hinduism'},
      {value: 9, label: 'Agnostic'},
      {value: 10, label: 'Atheist'},
      {value: 11, label: 'Other'},
    ];

    var religionList = religion.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })

    const income = [
      {value: 0, label: 'Select'},
      {value: 1, label: 'Under $35,000 / year'},
      {value: 2, label: '$35,000 - $50,000'},
      {value: 3, label: '$50,000 - $65,000'},
      {value: 4, label: '$65,000 - $80,000'},
      {value: 5, label: '$80,000 - $95,000'},
      {value: 6, label: '$95,000 - $120,000'},
      {value: 7, label: 'Over $120,000'},
    ];

     var incomeList = income.map((item) => {
      return (
        <option value={item.value}>{item.label}</option>
      )
    })



    console.log('--------render props ************', this.props)
    return (


      <form onSubmit={(e) => this.handleSubmit(e)}>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Gender: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{genderList}</FormControl>

          <FormGroup controlId="formBasicText">
            <ControlLabel>Age:</ControlLabel>
            <FormControl
              type="text"
              value={this.state.discussionValue}
              placeholder="Enter your age"
              ref='age'
            />
            <FormControl.Feedback />
          </FormGroup>
          <ControlLabel>Race: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{raceList}</FormControl>
          <ControlLabel>Political Leaning: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{politicalleaningList}</FormControl>
          <ControlLabel>Industry: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{industryList}</FormControl>
          <ControlLabel>Religion: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{religionList}</FormControl>
          <ControlLabel>Income: </ControlLabel>
          <FormControl componentClass="select" placeholder="select" ref="select">{incomeList}</FormControl>
        </FormGroup>

        <Button type='submit' bsStyle="primary">Submit</Button>

      </form>
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
    postProfile: (profile) => {
      dispatch(postProfile(profile))
    }
  }
}



export default connect(mapStateToProps, matchDispatchToProps)(UserProfile);

  // componentWillMount() {
  //   this.props.getProfile();
  //   console.log('los propos ----', this.props)
  // }

  // componentDidMount() {
  //   console.log('thissss', this.props.profile.fbName)
  //   this.setState({
  //     name: this.props.profile.fbName,
  //     gender: this.props.profile.fbGender
  //   })
  // }

  // handleChange(value) {
  //   // this.setState({gender: value});

  //   this.setState({
  //     gender: value
  //   })
  // }

 // componentWillMount() {
  //   this.props.getProfile();
  //   console.log('los propos ----', this.props)
  // }

//   console.log('props:', props);
  //   this.state = {
  //     ref: 'Tin',
  //     title: '',
  //     hometown: 'Indiana',
  //     gender: {value: 'male'},
  //     race: {value: 'race-1'},
  //     industry: {value: 'industry-1'},
  //     politicalLeaning: {},
  //     religion: {value: 'religion-1'},
  //     yearlyIncome: {}
  //     // title: this.props.profile.title,
  //     // hometown: this.props.profile.hometown,
  //     // gender: this.props.profile.gender,
  //     // race: this.props.profile.race,
  //     // industry: this.props.profile.industry,
  //     // politicalLeaning: this.props.profile.politicalleaning,
  //     // religion: this.props.profile.religion,
  //     // yearlyIncome: this.props.profile.yearlyincome
  //   };

  //   this.handleChange = this.handleChange.bind(this);
  // }

  // state {
  //   name: 'Tin'

    //   //if(this.props.profileReducer){
  // //   //}
  //   console.log('state changed', this.state)
  //temp just to see if name can be changeable
  // handleName() {
  //   // console.log('this handleName', this)
  //   // console.log('name val', this.refs.name.refs.wrappedInstance.inputNode.value)
  //   // this.setState({
  //   //   name: this.refs.name.refs.wrappedInstance.inputNode.value
  //   // })
  // }












        // console.log('=======================props=====================', this.props)

    // console.log('this.state', this.state);


    //   console.log('profile reducer ........', this.props.profile)
    //   this.state.name = this.state.name || this.props.profile.name;

    //   console.log('djsakdjask', this.state);
    //   console.log('propsssss', this.props)
    //   var x = this.state.name


    // old react toolbox code
    //       <p>Name: </p>
    //     <Input type='text'  ref='name' label={this.props.profile.fullname} />
    //     <p>Title: </p>
    //     <Input type='text' ref='title' label={this.props.profile.title} />
    //     <p>Hometown: </p>
    //     <Input type='text' ref='hometown' label={this.props.profile.hometown} />
    //     <p>Gender: </p>
    //     <Input type='text' ref='gender' label={this.props.profile.gender}  />
    //     <p>Age: </p>
    //     <Input type='text' ref='age' label={this.props.profile.age}  />
    //     <p>Race: </p>
    //     <Input type='text' ref='race' label={this.props.profile.race}  />
    //     <p>Political Leaning: </p>
    //     <Input type='text' ref='politicalleaning' label={this.props.profile.politicalleaning}  />
    //     <p>Industry: </p>
    //     <Input type='text' ref='industry' label={this.props.profile.industry}  />
    //     <p>Religion: </p>
    //     <Input type='text' ref='religion' label={this.props.profile.religion}  />
    //     <p>Income: </p>
    //     <Input type='text' ref='yearlyincome' label={this.props.profile.yearlyincome} />