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
    <form className="myForm">

    <div className="row">
      <div className="column">
                 <div className="input-group">
                   <label for="customer_name">Name </label>
                   <input id="customer_name"/>
                 </div>
                 <div className="input-group">
                   <label for="phone_number">Phone </label>
                   <input type="tel" id="phone_number"/>
                 </div>
                  <div className="input-group">
                    <label for="email_address">Email </label>
                    <input type="email" id="email_address"/>
                  </div>
        <div className="input-group">
          <label for="pickup_time">Pickup Date/Time</label>
          <input type="datetime-local" id="pickup_time"/>
        </div>
        <div className="input-group">
          <label for="pickup_place">Pickup Place</label>
          <select id="pickup_place">
            <option value="" selected="selected">Select One</option>
            <option value="office" >Taxi Office</option>
            <option value="town_hall" >Town Hall</option>
            <option value="telepathy" >We'll Guess!</option>
          </select>
        </div>
        <div className="input-group">
          <label for="dropoff_place">Dropoff Place</label>
          <input type="text" id="dropoff_place" list="destinations"/>
  
          <datalist id="destinations">
            <option value="Airport"/>
            <option value="Beach"/>
            <option value="Fred Flinstone's House"/>
          </datalist>
        </div>
      </div>
      <div className="column">
        <fieldset className="taxi">
          <legend>Which taxi do you require?</legend>
          <label> <input type="radio" id="taxi_car" value="car"/> Car </label>
          <label> <input type="radio" id="taxi_van" value="van"/> Van </label>
          <label> <input type="radio" id="taxi_tuk" value="tuktuk"/> Tuk Tuk </label>
        </fieldset>
  
        <fieldset className="extras">
          <legend>Extras</legend>
          <label> <input type="checkbox" id="extras_baby" value="baby"/> Baby Seat </label>
          <label> <input type="checkbox" id="extras_wheel" value="wheelchair"/> Wheelchair Access </label>
          <label> <input type="checkbox" id="extras_tip" value="tip"/> Stock Tip </label>
        </fieldset>
      </div>
    </div>
    
    <div className="row">
      
      <button id="submit">Submit Booking</button>
      
    </div>
  </form>
  </div>
  );
}
    
}

//
// render() {
//     return (
//         <div>
//         <div classNameName='title'>
//             <h1>Register</h1>
//         </div>
//      <div classNameName="center-screen">
//         <h2 classNameName="hi_there">Hello stranger!</h2>
//         <h5>Please register to our platform through this form.</h5>
//         <br></br>
//         <h6 classNameName="labelslog">Username</h6>
//         <input classNameName="input2" id="username" type="text" title="username" />
//         <h6 classNameName="labelslog">Password</h6>
//         <input classNameName="input2" id="password" type="password" title="password" />
//         <p><a classNameName="forgot" href="/forgot-password">Forgot password?</a>
//         </p><p>
//         <a href="/register">Check our terms and conditions. Click here.</a>
//         </p>
//         <div classNameName="container2">
//         <button type="submit" classNameName="button-register" onClick={this.handleClick} >Log In</button>
//         </div>
//     </div>
//     </div>
//     );
// }
//

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