//Every Auction




//Auction sites
import React, { Component } from 'react';
//import $ from 'jquery';
import './Item.css'
import {changebackground} from '../../settings.js';


class Item extends Component {
    
    constructor(props) {
        super(props);
    }
   
    render() {
        //alert(this.props.items)
        let jsonObject = JSON.parse(this.props.items);
        //const id = this.props.id;
        const imagesource = "image1";
        const title =jsonObject['results'][0].Name;
        const category = jsonObject['results'][0].Category;
        const bid = "BID"
        const moredetails = "more details"
             
            return (
            <div>
                <article className="card">
                <img src={imagesource} alt="Sample photo"/>
                <div class="text">
                <h3>{title}</h3>
                <p>{category}</p>
                <button>{bid}</button>
                <button>{moredetails}</button>
            </div>
            </article>
            </div>);
          
        
    }
    
}

export default Item;

