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
        const id = this.props.id;
       // alert(id);
        const imagesource = "image1";
        const title =jsonObject['results'][id].Name;
        const category = jsonObject['results'][id].Category;
        const bid = "BID"
        const moredetails = "more details"
             //alert(jsonObject['results'][id].Name)
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

