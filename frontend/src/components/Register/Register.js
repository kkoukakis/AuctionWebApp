import React, { Component } from 'react';
import $ from 'jquery';
import css from './Register.css'
import  '../../settings.js';
import {changebackground, server} from '../../settings.js';



class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            result:{}
        };
      
    
    }
    handleClick = function() {
        communicate(server +'register');
      }
   
    
     
    componentDidMount() {        
        console.log("RegisterPage component did mount");
        window.addEventListener('load', this.handleload());
    }
  
    handleload(){
        changebackground('#c38d9d');
    }

 render() {
     return (
         <div>
         <div className='title'>
             <h1>Register</h1>
         </div>
      <div className="center-screen">
         <h2 className="hi_there">Hello stranger!</h2>
         <h5>Please register to our platform through this form.</h5>
         <br></br>
         <div className="box">
         <h6 className="labelslog">Username</h6>
         <input className="input2" id="username" type="text" title="username" />
         <h6 className="labelslog">Password</h6>
         <input className="input2" id="password" type="password" title="password" />
         <h6 className="labelslog">Repeat Password</h6>
         <input className="input2" id="rpassword" type="password" title="Repeat password" />
         <h6 className="labelslog">First Name</h6>
         <input className="input2" id="firstname" type="text" title="First Name" />
         <h6 className="labelslog">Last Name</h6>
         <input className="input2" id="lastname" type="text" title="Last Name" />
         <p><a className="forgot" href="#">Forgot password?</a>
         </p><p>
         <a href="#">Check our terms and conditions. Click here.</a>
         </p>
         <div className="container2">
         <button type="submit" className="button-register" onClick={this.handleClick} >Register</button>
         </div>
         </div>
     </div>
     </div>
     );
 }

   
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
    var p = getval_fromid('password');
    var p = getval_fromid('password');
    var p = getval_fromid('password');
    alert(u +"|"+ p);
    alert(server +"user");
    $.ajax({
         url: url,
         dataType: 'json',                       
         type: 'POST'  ,
         crossDomain: true,
         data: {
             username: u,
             password: p
         },  
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