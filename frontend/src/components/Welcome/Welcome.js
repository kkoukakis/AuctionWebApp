import React, { Component } from 'react';
import $ from 'jquery';

class Welcome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Welcome component did mount");
       //$.ajax({
       //     url: 'http://localhost:3030/',
       //     dataType: 'json',                       
       //     type: 'GET'            
       //}).then ( data => {
       //    console.log("Updating UI");
       //    this.setState({
       //    });
       //});
    }
    
    render() {
        return (
            <div>
               <h1>Welcome Page</h1> 
               <div>
               <a href="./login">Login</a> 
               </div>
               <div>
               <a href="./logout">Logout</a> 
               </div>
               <div>
               <a href="./main">Main</a> 
               </div>
            </div>
        );
    }
    
}

export default Welcome;
