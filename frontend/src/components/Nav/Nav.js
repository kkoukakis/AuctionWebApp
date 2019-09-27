import React, { Component } from 'react';
import $ from 'jquery';
import  './Nav.css';
//import Safe from "react-safe"
//
//import Search from './Search.js'

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
      if(localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== "0" && localStorage.getItem('username') !== null){
      if(localStorage.getItem('type') !== undefined && localStorage.getItem('type') !== "0" && localStorage.getItem('type') !== null && localStorage.getItem('type')==="1"){
        navrender = 
        <ul>
          <li> Admin, {localStorage.getItem('username')}</li>
          <li><a href="/allusers">All Users</a>
           <a href="/usersonline">Users Online</a>
           <a href="/requests">Users Requests</a>
           </li>
          <li><a href="/allitems">All Items</a>
          <a href="/solditems">Old Items</a>
          </li>
          <li>
            <a href="/logout">Settings</a>
          <a href="/logout">Exit</a>
          </li>
          </ul>
        ;
      }else if(localStorage.getItem('type')==="0"){
          navrender = 
          <ul>
            <li> Hello, {localStorage.getItem('username')}</li>
            <li>
                <a href="/main">Home</a>
                <a href="/profile">Profile</a>  
            </li>
            <li>
              <a href="/items">Buy Items</a>
              <a href="/mybids">My Bids</a>
            </li>
            <li>
                <a href="/sellitem">Sell Item</a>
                <a href="/myitems">My Items</a>
            </li>
            
            <li>
                <a href="/logout">Logout</a>  
            </li>
            </ul>
          ;
        }
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
          

         <div className="button_nav-container" id="toggle">
            <span className="top"></span>
            <span className="middle"></span>
            <span className="bottom"></span>
          </div>
          
          <div className="overlay" id="overlay">
            <nav className="overlay-menu">
             {navrender}
            </nav>
          </div>
          </div>
        );
    }
    
}




export default Nav;
