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
 
 
       $('#toggle').click(function() {
        $(this).toggleClass('active');
        $('#overlay').toggleClass('open');
       });     
      
    
    }
    
    




    render() {
      let navrender = null;
      if(localStorage.getItem('username') != undefined && localStorage.getItem('username') != "0" && localStorage.getItem('username') != null){
        navrender = 
        <ul>
          <li> Hello, {localStorage.getItem('username')}</li>
          <li><a href="/main">Home</a></li>
          <li><a href="/logout">Logout</a></li>
          <li><a href="/setitem">Set an auction</a></li>
          <li><a href="/items">Items</a></li>
          </ul>
        ;
      }
      else
      {
        navrender = 
         <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/items">Items</a></li>
          </ul>
       ;
      }


        return (
        <div>
          

         <div class="button_nav-container" id="toggle">
            <span class="top"></span>
            <span class="middle"></span>
            <span class="bottom"></span>
          </div>
          
          <div class="overlay" id="overlay">
            <nav class="overlay-menu">
             {navrender}
            </nav>
          </div>
          </div>
        );
    }
    
}




export default Nav;
