import React, { Component } from 'react';
import $ from 'jquery';

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
            <div>
               <h1>Login PAGE</h1> 
            </div>
        );
    }
    
}

export default LoginPage;
