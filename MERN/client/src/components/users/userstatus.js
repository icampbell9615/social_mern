import React, { Component } from "react";
import PubSub from 'pubsub-js';
import { withRouter } from "react-router-dom";
import "../../style/css/userstatus.scss";
import   'whatwg-fetch';
class UserStatus extends Component {

  constructor(props) {
    super (props);
    this.state = {
        postby: window.localStorage.getItem("userid"),
        status: "I'm using react app!"
    };

    this.obj = {
        postby: window.localStorage.getItem("userid")
    };

    this.getStatus = this.getStatus.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStatusUpdate = this.handleStatusUpdate.bind(this);
    
    this.getStatus(this.obj);
  };
  


  getStatus(data){
      console.log('fetching status');

      
      fetch ('/api/getstatus', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify (data)
      }
      ).then (res => res.json ()).then (json => {
        this.handleStatusUpdate(json['user_status'])
        //console.log(this.state.status);
        //console.log(json['user_status']);
        //console.log(json['status']);
        //console.log(json);
      });
  }

  handleStatusChange(){
    this.callStatusChangeApi(this.state);
  }


  callStatusChangeApi(data) {

    fetch ('/api/statusupdate', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify (data)
    }
    ).then (res => res.json ()).then (json => {
      this.serviceStatusChangeHandler (json)
    
    });
  
  
  }
  
  serviceStatusChangeHandler(data) {
  
    if (data.status === 'success') {
        alert("Your status has been updated.");
    } else {
      alert (data.message);
    }
    
  
  }

  handleStatusUpdate(new_status) {
    const myValue = new_status;
    this.setState({
      status: myValue
    })
  }

  handleInputChange(event) {
    const myValue = event.target.value;
    this.setState({
      status: myValue
    })
  }


  render() {
    
    return (
      <div className="userstatus-container">
         <div className="form-group">
            <input type="text" name="form-status"  value ={this.state.status}  placeholder="Update your status" 
            onChange={this.handleInputChange} 
            className="form-control padding"/>
            <input type="button" onClick={this.handleStatusChange} className="btn btn-transparent padding" value="Update" />
          </div>
      </div>
      );
  }
  ;
}
;
export default withRouter(UserStatus);



