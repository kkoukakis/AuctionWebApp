//Auction sites
import React, { Component } from 'react';
//import $ from 'jquery';
import './Items.css'
import {changebackground, server} from '../../settings.js';
import {loaditems} from './loaditems.js';

class Items extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }
   
    
    componentDidMount() {        
        console.log("Welcome component did mount");
        window.addEventListener('load', this.handleload());
        loaditems(server+'items').then(results => results.json()).then(
            results => this.setState({items : results})
        );
    }
 

    handleload(){
        changebackground('#5f5f5f');
        
    }
    
    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
      }
    
   
    render() {

        if (this.state.items === null) {
            // Render loading state ...
            return (
                <div>
                <div className="title"> 
                   <h1>Items</h1> 
                   
                </div>
                <div className="items-table">

                </div>
                </div>
            );
          } else {
              return(
            <div>
            <div className="title"> 
               <h1>Items</h1> 
               
            </div>
            <div className="items-table">

            </div>
            </div>
              );
          }
        
    }
    
}

export default Items;

