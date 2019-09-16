import React, { Component } from 'react';
import $ from 'jquery';
import css from './Register.css'
import  '../../settings.js';

var server = 'http://192.168.137.1:3030/';
//var server = 'http://localhost:3030/';

class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            result:{}
        };
      
    
    }
    handleClick = function() {
        communicate(server +'user');
      }
   
    
     
    componentDidMount() {        
        console.log("Register component did mount");
  
    }
    
    render() {
        return (
         <div className="center-screen">
            <h2 className="hi_there">Hello stranger!</h2>
            <h5>Please register to our platform through this form.</h5>
            <br></br>
            <h6 className="labelslog">Username</h6>
            <input className="input2" id="username" type="text" title="username" />
            <h6 className="labelslog">Password</h6>
            <input className="input2" id="password" type="password" title="password" />
            <p><a className="forgot" href="/forgot-password">Forgot password?</a>
            </p><p>
            <a href="/register">Check our terms and conditions. Click here.</a>
            </p>
            <div className="container2">
            <button type="submit" className="btn" onClick={this.handleClick} >Log In</button>
            </div>
        </div>
        );
    }
   // render() {
   //     return (
   //      <div className="center-screen">
   //         <h2 className="hi_there">Hi there!</h2>
   //         <h5>Please fill out the following form so we can remember who you are.</h5>
   //         <h6 className="labelslog">Username</h6>
   //         <input className="input2" id="username" type="text" title="username" />
   //         <h6 className="labelslog">Password</h6>
   //         <input className="input2" id="password" type="password" title="password" />
   //         <a className="forgot" href="/forgot-password">Forgot password?</a>
   //         <a href="/register">Dont have an account? Click here.</a>
   //         <div className="container2">
   //         <a className="homeback" href="#">Back to homepage.</a>
   //         <button type="submit" className="btn" onClick={this.handleClick} >Log In</button>
   //         </div>
   //     </div>
   //     );
   // }
    
}



export default Register;

function getval_fromid(id){

   return document.getElementById(id).value;

}

function setval_to_localstorage(name,input){

   localStorage.setItem(name,input);
    
}

function communicate(url){
    var u = getval_fromid('username');
    var p = getval_fromid('password');
    alert(u +"|"+ p);
    alert(server +"user");
    $.ajax({
         url: url,
         dataType: 'json',                       
         type: 'GET'  ,
         crossDomain: true,
        // data: {
        //     username: u,
        //     password: p
        // },  
         success : function(data) {
            alert( data['response'][0].UserID);

            setval_to_localstorage('username', data['response'][0].UserID)
            
            window.location.reload(false);
        },
        error : function(req,error) {
            alert('Error occured:req['+req+"]["+error+"]");
        }
      //  beforeSend: setHeader,
    });
}