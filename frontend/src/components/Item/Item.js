//Every Auction
import React, { Component } from 'react';
//import $ from 'jquery';
import './Item.css'


class Item extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items:null
        }
    }
   
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
        const bid = "BID"
        const moredetails = "more details"
             //alert(jsonObject['results'][id].Name)
        let blabla ;
             if(localStorage.getItem('type')==="0"){
                blabla =<div> <button className="thebutton">{bid}</button>
                              <button className="thebutton">{moredetails}</button>
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
                <img src={imagesource} alt="Sample"/>
                <div class="text">
                <h3>{title}</h3>
                <p>Category:{category}</p>
                <p>Buy Price:{Buy_Price}€</p>
                <p>Seller:{SellerID}</p>
                <p>Started:{Date.now}</p>
                {blabla}
            </div>
            </article>
            </div>);
          
        
    }
    
}

export default Item;

