import React, { Component } from 'react';
import $ from 'jquery';
import './LoginPage.css'
import {changebackground, server} from '../../settings.js';


class LoginPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            result:{}
        };
      
    
    }
    handleClick = function() {
        communicate(server +'login');
      }
   
    
     
    componentDidMount() {        
        console.log("LoginPage component did mount");
        window.addEventListener('load', this.handleload());
  
    }
  
    handleload(){
        changebackground('#b29bc7');
    }

    render() {
        return (
            <div>
            <div className="title">
                <h1>Login</h1>
            </div>
         <div className="center-screen">
            <h2 className="hi_there">Hi there!</h2>
            <h5>Please fill out the following form so we can remember who you are.</h5>
            <br></br>
            <h6 className="labelslog">Username</h6>
            <input className="input2" id="username" type="text" title="username" />
            <h6 className="labelslog">Password</h6>
            <input className="input2" id="password" type="password" title="password" />
            <p><a className="forgot" href="/forgot-password">Forgot password?</a>
            </p><p>
            <a href="/register">Dont have an account? Click here.</a>
            </p>
            <div className="container2">
            <button className="btn button-login" onClick={this.handleClick} >Log In</button>
            </div>
        </div>
        </div>
        );
    }
      
}



export default LoginPage;

function getval_fromid(id){

   return document.getElementById(id).value;

}

function setval_to_localstorage(name,input){

   localStorage.setItem(name,input);
    
}

function communicate(url){
    var un = getval_fromid('username');
    var pa = getval_fromid('password');
    //alert(u +"|"+ p);
   // alert(server +"user");
    $.ajax({
         url: url,
         dataType: 'json',                       
         type: 'POST'  ,
         crossDomain: true,
         data: {
             u: un,
             p: pa
         },  
         success : function(data) {
             if(data['token'] !== null && data['token'] !== "" && data['token']!=="wrong"){
        
                alert('Welcome back, '+ data['username']);
                setval_to_localstorage('username', data['username'])
                setval_to_localstorage('token', data['token'])
                setval_to_localstorage('type', data['type'])
                setval_to_localstorage('rtoken', data['rtoken'])
             
                window.location.reload(false);
             }else if(data['token'] === "wrong"){
                alert('ERROR CREDENTIALS')
             }
        },
        error : function(req,error) {
            alert('ERROR OCCURED:'+error);
        }

      //  beforeSend: setHeader,
    });
}