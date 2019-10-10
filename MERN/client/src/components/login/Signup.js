import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import  'whatwg-fetch';
class Signup extends Component {

  constructor(props) {
    super (props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loginError: '',
      signupError: ''
    };
    this.handleSignup = this.handleSignup.bind (this);

    // for login after sign up
    this.stateLogin = {
      
      username: '',
     loginpass: ''
    };

    this.handleSignIn = this.handleSignIn.bind (this);

    //

  }

// login handle // 

handleSignIn() {

  this.stateLogin.username = this.state.email;
  this.stateLogin.loginpass = this.state.password;
  if (this.stateLogin.username !== '' && this.stateLogin.loginpass !== '') {
     this.callSignInApi (this.stateLogin);
     
  } 
}

callSignInApi(data) {

  fetch ('/api/singin', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify (data)
  }
  ).then (res => res.json ()).then (json => {
    this.serviceSignInHandler (json)
  
  });


}

serviceSignInHandler(data) {

  if (data.status === 'success') {
    PubSub.publish ('IS_LOGIN', {status: true, token: data.accesstoken, userid: data.userid,callback:()=>{
         this.props.history.push ("/main");
    }});
   
  } else {
    alert (data.message);
  }
  

}

// login handle end //


  handleSignup() {
    this.callNewUserApi (this.state);
  }

  callNewUserApi(data) {
    fetch ('/api/newuser', {method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify (data)})
      .then (res => res.json ())
      .then (json => {
        this.serviceHandler (json)
      });
  }
  ;
    serviceHandler(data) {
    if (data.status === 'success') {
      //alert ('Thank you for Registering with us!!! ');
      //this.props.statechange('singup');
      this.handleSignIn();
      //this.props.history.push ("/main");
    }

  }

  render() {
    return (
      
        <div className="col-md-12">
        
         <div className="form-top-left">
          <h3>Sign up now</h3>
          <p>Fill in the form below to get instant access:</p>
        </div>
        
          <div className="form-group">
            <input type="text" name="form-first-name"  value ={ this.state.firstName}  placeholder="First name..." 
                   onChange={(event) => {
          this.setState ({firstName: event.target.value})}} className="form-control"/>
          </div>
          <div className="form-group">
            <input type="text"  name="form-last-name" placeholder="Last name..." className="form-control"
                   value ={
            this.state.lastName} onChange={(event) => {
              this.setState ({lastName: event.target.value})}} 
                   />
          </div>
      
      
          <div className="form-group">
            <input type="text" name="form-email"  value ={
                this.state.email}  onChange={(event) => {
                  this.setState ({email: event.target.value})}} 
                   placeholder="Email..." className="form-control"/>
          </div>
          <div className="form-group">
            <input type="Password" name="form-password" value={
                    this.state.password} placeholder="Password..."
                   onChange={(event) => {
                      this.setState ({password: event.target.value})}} 
                   className="form-control"  />
          </div>
          <div>
            <input type="button" onClick={
                        this.handleSignup} className="btn btn-transparent" value="Sign me up!" />
          </div>	
          
          
           <div className="new-acount">
           <p>Already have an account? &nbsp; &nbsp; <a href="javascript:void(0)"  onClick={()=>this.props.statechange('singup')}> SIGN IN </a></p>
						</div>
      </div>);
          }

        }

        export default withRouter(Signup);



                