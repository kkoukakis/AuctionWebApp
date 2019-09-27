import React, { Component } from 'react';
import $ from 'jquery';
import  './Register.css'
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
        if(getval_fromid("password")===getval_fromid("rpassword"))
        communicate(server +'register');
        else{
            alert("Please: check password and repeat password correctly!");
        }
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
         <h6 className="labelslog">Email</h6>
         <input className="input2" id="email" type="text" title="Email" />
         <h6 className="labelslog">Phone</h6>
         <input className="input2" id="phone" type="text" title="Phone" />
         <h6 className="labelslog">Address</h6>
         <input className="input2" id="address" type="text" title="Address" />
         <h6 className="labelslog">Location</h6>
         <input className="input2" id="location" type="text" title="Location" />
         <h6 className="labelslog">VAT</h6>
         <input className="input2" id="vat" type="text" title="VAT" />
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



function communicate(url){
    var u = getval_fromid('username');
    var p = getval_fromid('password');
    var fn = getval_fromid('firstname');
    var ln = getval_fromid('lastname');
    var e = getval_fromid('email');
    var ph = getval_fromid('phone');
    var a = getval_fromid('address');
    var l = getval_fromid('location');
    var v = getval_fromid('vat');
    //alert(u +"|"+ p);
    //alert(u + '~'+p + '~'+fn+ '~'+ln+ '~'+e + '~'+ph+ '~'+a + '~'+l + '~'+v );
    $.ajax({
         url: url,
         dataType: 'json',                       
         type: 'POST'  ,
         crossDomain: true,
         data: {
             username: u,
             password: p,
             fname:fn,
             lname:ln,
             email:e,
             phone: ph,
             address:a,
             location:l,
             vat:v
         },  
         success : function(data) {
            alert("Registration was : " + data['response'] +'ful');
            window.location = '/login';
            
        },
        error : function(req,error) {
            alert('Error occured:req['+req+"]["+error+"]");
        }
    });
}