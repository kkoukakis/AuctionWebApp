//Every Auction
import React, { Component } from 'react';
import $ from 'jquery';
import './Item.css'
import {server}from '../../settings'

class Item extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items:null,
            bid:null
        }
    }
    handleChange(event) {  this.setState({bid: event.target.value});
localStorage.setItem('bid', this.state.bid)}
    render() {
        //alert(this.props.items)
        let jsonObject = JSON.parse(this.props.items);
        const id = this.props.id;
       // alert(id);
        const imagesource = "image1";
        const title =jsonObject['results'][id].Name;
        const category = jsonObject['results'][id].Category;
        const Buy_Price = jsonObject['results'][id].Buy_Price;
        const SellerID = jsonObject['results'][id].SellerID;
        const ItemID = jsonObject['results'][id].Item_ID;
        const Started = jsonObject['results'][id].Started;
        const bid = "BID"
        const Description = jsonObject['results'][id].Description;
             //alert(jsonObject['results'][id].Name)
        let blabla ;
             if(localStorage.getItem('type')==="0"){
                blabla =<div>
                             
                            <input type="text" id='bid1' className='inputbid' value={this.state.bid} onChange={this.handleChange.bind(this)}/>
                             <button className="thebutton" onClick={buyitem}>{bid}</button>
                </div>
                ;
             }else{
                blabla =<div><a href='/login'> <button  className="thebutton">Log in</button></a>
                              <a href='/register'><button  className="thebutton">Register</button></a>
                </div>
             }

            return (
                
            <div>
                <article className="card">
                <p id='item' value={ItemID}>ID:{ItemID}</p>
                <img src={imagesource} alt="Sample"/>
                <div class="text">
                <h3>{title}</h3>
                <p>Category:{category}</p>
                <p>Buy Price:{Buy_Price}€</p>
                <p>Seller:{SellerID}</p>
                <p>Description:{Description}</p>
                <p>Started:{Started}</p>
                {blabla}
            </div>
            </article>
            </div>);
          
        
    }
    
}

export default Item;

function buyitem(){
    var url = server+'addbid'
   //var bid = document.getElementById('bid').value;
   var bid = localStorage.getItem('bid');
   localStorage.removeItem('bid');

   alert(bid);
   var itemid = document.getElementById('item').value;
   var u = localStorage.getItem('username')

   $.ajax({
    url: url,
    dataType: 'json',                       
    type: 'POST'  ,
    crossDomain: true,
    data: {
        UserID: u,
        Bid: bid,
        ItemId: itemid,
        token: localStorage.getItem('token')
    },  
    success : function(data) {
        if(data['response'] === "exists") alert('ItemID already exists');
        else{
       alert(data['response'] );
       window.location = '/items';
        }
       
   },
   error : function(req,error) {
       alert('Error occured:req['+req+"]["+error+"]");
   }
});


}