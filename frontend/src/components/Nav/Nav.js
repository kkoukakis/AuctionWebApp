import React, { Component } from 'react';
import $ from 'jquery';
import css from './Nav.css';
import Safe from "react-safe"

import Search from './Search.js'

class Nav extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Nav component did mount");
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
 
       $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
       });     
      
    
    }
    
    render() {
        return (
        <div>
          

         <div class="button_nav-container" id="toggle">
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
          </div>
          
          <div class="overlay" id="overlay">
            <nav class="overlay-menu">
              <ul>
                <li>Hello, User</li>
                <li ><a href="/">Home</a></li>
                <li><a href="/login">Login</a></li>
                <li><a href="/">Register</a></li>
                <li><a href="/">Items</a></li>
              </ul>
            </nav>
          </div>
          </div>
        );
    }
    
}




export default Nav;
