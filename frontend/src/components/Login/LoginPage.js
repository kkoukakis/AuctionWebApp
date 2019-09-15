import React, { Component } from 'react';
import $ from 'jquery';
import css from './LoginPage.css'

class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("LoginPage component did mount");
       //$.ajax({
       //     url: 'http://localhost:3030/texts.json',
       //     dataType: 'json',                       
       //     type: 'GET'            
       //}).then ( data => {
       //    console.log("Updating UI");
       //    this.setState({
       //        messages: data
       //    });
       //});
    }
    
    render() {
        return (
            

            <div className="center-screen">
            <h2 className="hi_there">Hi there!</h2>
            
            <h5>Please fill out the following form so we can remember who you are.</h5>
            
            <h6 className="labelslog">Username</h6>
            <input className="input2" id="user1" type="text" title="username" />
            
            
            <h6 className="labelslog">Password</h6>
            <input className="input2" id="password1" type="password" title="password" />
            
            <a className="forgot" href="/forgot-password">Forgot password?</a>
            
            <a href="/register">Dont have an account? Click here.</a>
            <div className="container2">
            <a className="homeback" href="#">Back to homepage.</a>
            <button type="submit" className="btn">Log In</button>
            </div>
          </div>
        );
    }
    
}

export default LoginPage;
