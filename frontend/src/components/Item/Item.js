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
        const ItemID = jsonObject['results'][id].ItemID;
        const bid = "BID"
        const Description = jsonObject['results'][id].Description;
             //alert(jsonObject['results'][id].Name)
        let blabla ;
             if(localStorage.getItem('type')==="0"){
                blabla =<div>
                                <input id="bid" className="inputbid"></input> 
                             <button className="thebutton" onClick={buyitem()}>{bid}</button>
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
                <p id={ItemID} >ID:{ItemID}</p>
                <img src={imagesource} alt="Sample"/>
                <div class="text">
                <h3>{title}</h3>
                <p>Category:{category}</p>
                <p>Buy Price:{Buy_Price}€</p>
                <p>Seller:{SellerID}</p>
                <p>Description:{Description}</p>
                <p>Started:{Date.now}</p>
                {blabla}
            </div>
            </article>
            </div>);
          
        
    }
    
}

export default Item;

function buyitem(){

    


}