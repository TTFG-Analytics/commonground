import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfile, postProfile} from '../actions/profileActions';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import {Button, IconButton} from 'react-toolbox/lib/button';
import FaceBookIntegration from '../../discussion/camps/FaceBookIntegration'

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

  render (){
    console.log('--------render props ************', this.props)
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
      <p>Name: </p>
      <Input type='text'  ref='name' label={this.props.profile.fullname} />
      <p>Title: </p>
      <Input type='text' ref='title' label={this.props.profile.title} />
      <p>Hometown: </p>
      <Input type='text' ref='hometown' label={this.props.profile.hometown} />
      <p>Gender: </p>
      <Input type='text' ref='gender' label={this.props.profile.gender}  />
      <p>Age: </p>
      <Input type='text' ref='age' label={this.props.profile.age}  />
      <p>Race: </p>
      <Input type='text' ref='race' label={this.props.profile.race}  />
      <p>Political Leaning: </p>
      <Input type='text' ref='politicalleaning' label={this.props.profile.politicalleaning}  />
      <p>Industry: </p>
      <Input type='text' ref='industry' label={this.props.profile.industry}  />
      <p>Religion: </p>
      <Input type='text' ref='religion' label={this.props.profile.religion}  />
      <p>Income: </p>
      <Input type='text' ref='yearlyincome' label={this.props.profile.yearlyincome} />

      <Button type='submit' label='Submit' raised primary/>
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

  // const gender = [
  //     {value: 'male', label: 'Male'},
  //     {value: 'female', label: 'Female'}
  //   ];

  //   const politicalleaning = [
  //     {value: 'pol-1', label: 'Conservative'},
  //     {value: 'pol-2', label: 'Authoritarian'},
  //     {value: 'pol-3', label: 'Centrist'},
  //     {value: 'pol-4', label: 'Libertarian'},
  //     {value: 'pol-5', label: 'Progressive'}
  //     ];
  //   const race = [
  //     {value: 'race-1', label: 'White Hispanic'},
  //     {value: 'race-2', label: 'White Non-Hispanic'},
  //     {value: 'race-3', label: 'Black or African American'},
  //     {value: 'race-4', label: 'American Indiana or Alaska Native'},
  //     {value: 'race-5', label: 'Asian'},
  //     {value: 'race-6', label: 'Native Hawaiian or Other Pacific Islander'},
  //     {value: 'race-7', label: 'Other'}
  //     ];

  //   const industry = [
  //     {value: 'industry-1', label: 'Aerospace, defence & security'},
  //     {value: 'industry-2', label: 'Asset & wealth management'},
  //     {value: 'industry-3', label: 'Automotive'},
  //     {value: 'industry-4', label: 'Banking & capital markets'},
  //     {value: 'industry-5', label: 'Capital projects & infrastructure'},
  //     {value: 'industry-6', label: 'Chemicals'},
  //     {value: 'industry-7', label: 'Communications'},
  //     {value: 'industry-8', label: 'Energy, utilities & mining'},
  //     {value: 'industry-9', label: 'Engineering & construction'},
  //     {value: 'industry-10', label: 'Entertainment & media'},
  //     {value: 'industry-11', label: 'Financial services'},
  //     {value: 'industry-12', label: 'Forest, paper & packaging'},
  //     {value: 'industry-13', label: 'Government & public services'},
  //     {value: 'industry-14', label: 'Healthcare'},
  //     {value: 'industry-15', label: 'Hospitality & leisure'},
  //     {value: 'industry-16', label: 'Industrial manufacturing'},
  //     {value: 'industry-17', label: 'Insurance'},
    //   {value: 'industry-18', label: 'Metals'},
    //   {value: 'industry-19', label: 'Pharmaceuticals & life sciences'},
    //   {value: 'industry-20', label: 'Private equity'},
    //   {value: 'industry-21', label: 'Retail & consumer'},
    //   {value: 'industry-22', label: 'Sovereign investment funds'},
    //   {value: 'industry-23', label: 'Technology'},
    //   {value: 'industry-24', label: 'Transportation & logistics'},
    //   {value: 'industry-25', label: 'Other'}]

    // const religion = [
    //   {value: 'religon-1', label: 'Protestant'},
    //   {value: 'religon-2', label: 'Catholic'},
    //   {value: 'religon-3', label: 'Mormon'},
    //   {value: 'religon-4', label: 'Other Christian'},
    //   {value: 'religon-5', label: 'Judaism'},
    //   {value: 'religon-6', label: 'Islam'},
    //   {value: 'religon-7', label: 'Buddhism'},
    //   {value: 'religon-8', label: 'Hinduism'},
    //   {value: 'religon-9', label: 'Agnostic'},
    //   {value: 'religon-10', label: 'Atheist'},
    //   {value: 'religon-11', label: 'Other'},
    //   ];

    // const income = [
    //   {value: 'income-1', label: 'Under $35,000 / year'},
    //   {value: 'income-2', label: '$35,000 - $50,000'},
    //   {value: 'income-3', label: '$50,000 - $65,000'},
    //   {value: 'income-4', label: '$65,000 - $80,000'},
    //   {value: 'income-5', label: '$80,000 - $95,000'},
    //   {value: 'income-6', label: '$95,000 - $120,000'},
    //   {value: 'income-7', label: 'Over $120,000'},
    //   ];

        // console.log('=======================props=====================', this.props)

    // console.log('this.state', this.state);
    

    //   console.log('profile reducer ........', this.props.profile)
    //   this.state.name = this.state.name || this.props.profile.name;

    //   console.log('djsakdjask', this.state);
    //   console.log('propsssss', this.props)
    //   var x = this.state.name