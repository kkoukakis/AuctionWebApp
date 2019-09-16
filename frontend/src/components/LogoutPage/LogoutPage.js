import React, { Component } from 'react';
import $ from 'jquery';
import css from './LogoutPage.css';

class LogoutPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Logout component did mount");    
        var interval = 1000;
        var timer1 = setInterval(function(){
            document.getElementById("tim").innerHTML= " " + (5000-interval)/1000;
            interval += 1000;
        }, 1000);
        var timer = setTimeout(function() {
            localStorage.clear();
            window.location='/';
        }, 5000);
    }
    
    render() {
        
        return (
        <main class="centered">
            <h1 >You are going to log out in:<div id="tim">5</div> seconds</h1>
            <p>If you want to back to the home, press: <a href="/main">here</a></p>
            <p>*After logout you will return to homepage<br />
            </p>
          </main>
        );
    }
    
}




export default LogoutPage;



