import React, { Component } from 'react';
import $ from 'jquery';
import  './Sellitem.css'
import  '../../settings.js';
import {changebackground, server} from '../../settings.js';



class Sellitem extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            result:{}
        };
    }

    handleClick = function() {
        var a = communicate(server +'additem');
        console.log(a);
      }
   
    
     
    componentDidMount() {        
        console.log("Sell item component did mount");
        window.addEventListener('load', this.handleload());
    }
  
    handleload(){
        changebackground('lightblue');
    }

 render() {
     return (
         <div>
         <div className='title'>
             <h1>Sell an item</h1>
         </div>
      <div className="center-screen">
         <h2 className="hi_there">Lets Sell!</h2>
         <h5>Please sell an item through this form.</h5>
         <br></br>
         <div className="box">
         <h6 className="labelslog">Title</h6>
         <input className="input2" id="name" type="text" title="username" />
         <h6 className="labelslog">Category</h6>
         <input className="input2" id="Category" type="text" title="password" />
         <h6 className="labelslog">Buy Price</h6>
         <input className="input2" id="Buy_Price" type="text" title="Repeat password" />
         <h6 className="labelslog">Location</h6>
         <input className="input2" id="Location" type="text" title="First Name" />
         <h6 className="labelslog">Country</h6>
         <input className="input2" id="Country" type="text" title="Last Name" />
         <h6 className="labelslog">Ends</h6>
         <input className="input2" id="Ends" type="text" title="Phone" />
         <div className="container2">
         <button type="submit" className="button-sell" onClick={this.handleClick} >Sell Item</button>
         </div>
         </div>
     </div>
     </div>
     );
 }

   
}



export default Sellitem;

function getval_fromid(id){

   return document.getElementById(id).value;

}



function communicate(url){
    var ti   = getval_fromid('name');
    var Ca = getval_fromid('Category');
    var BP    = getval_fromid('Buy_Price');
    var Lo    = getval_fromid('Location');
    var Co   = getval_fromid('Country');
    var En    = getval_fromid('Ends');
    
    if(!isNumber(BP)) {alert('Check input Buy Price'); return;}
    if(En.trim()==="") {
        alert('Check input Ends'); 
        return "error"
    }
    if(Co.trim()===""){
        alert('Check input Country'); 
        return "error"
    }
    if(Lo.trim()===""){
        alert('Check input Location'); 
        return "error"
    }
    if((ti.trim()==="")){
        alert('Check input Title'); 
        return "error"
    }
    if(Ca.trim()===""){
        alert('Check input Category');
     return "error"
    }

     $.ajax({
         url: url,
         dataType: 'json',                       
         type: 'POST'  ,
         crossDomain: true,
         data: {
             UserID: localStorage.getItem('username'),
             name: ti,
             Category: Ca,
             Buy_Price:BP,
             Location:Lo,
             Country: Co,
             Ends:En,
             token: localStorage.getItem('token')
         },  
         success : function(data) {
            window.location = '/items';
             }
            
        });

}
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }