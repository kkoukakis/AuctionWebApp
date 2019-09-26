import React, { Component } from 'react';
import $ from 'jquery';
import css from './LogoutPage.css';
import { isNullOrUndefined } from 'util';

//var server = 'http://192.168.1.193:3030/';
var server = 'http://localhost:3030/';

class LogoutPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
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
           logout_call();
        }, 5000);
    }
    
    render() {
        
        return (
        <main class="centered">
            <h1 className = "hed" >You are going to log out in:<div id="tim">5</div>sec</h1>
            <p>If you want to back to the home, press: <a href="/main">here</a></p>
            <p>*After logout you will return to homepage<br />
            </p>
          </main>
        );
    }
    
}

export default LogoutPage;


function logout_call(){
    var un = localStorage.getItem('username');
    var to = localStorage.getItem('token');
    var rt = localStorage.getItem('rtoken');
    $.ajax({
        url: server+'logout',
        dataType: 'json',                       
        type: 'POST'  ,
        crossDomain: true,
        data: {
            u: un,
            token: to,
            rtoken: rt
        },  
        success : function(data) {
            if(!isNullOrUndefined(data['token']) && data['token']=="loggedout"){
                     
               localStorage.clear();
               window.location = '/';
            }else{
               alert('ERROR LOGGING OUT')
            }
       },
       error : function(req,error) {
           localStorage.clear();
           window.location = '/';
           alert('Error occured:'+error);
       }

     //  beforeSend: setHeader,
   });
}


