//Auction sites
import React, { Component } from 'react';
//import $ from 'jquery';
import './Items.css'
import {changebackground, server} from '../../settings.js';
import Item from '../Item/Item.js'


class Items extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: null
        };
    }
   
    
    componentDidMount() {        
        console.log("Welcome component did mount");
        window.addEventListener('load', this.handleload());
        if(this.props.items === undefined)
        this.getStuff(server+'items')
        else{
            this.setState({items : this.props.items})
        }
      
    }

    getStuff(url){
        fetch(url).then(results => results.json()).then(
            results => this.setState({items : results})
        );
    }
    

    handleload(){
        changebackground('#96e6a1');
        
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
                   <p> LOADING ...</p>
                   <div className ='lds-ripple'><div></div><div></div></div>
                </div>
                <div className="items-table">

                </div>
                </div>
            );
          } else {
              let itemcards= null;
              let jsonObject = this.state.items;
              var num = jsonObject['results'].length;
             //alert(num);
             var i = 0;

             if(localStorage.getItem('type')==="1"){

             }


             itemcards = [
             <Item items={JSON.stringify(this.state.items)} id={0}/>];
             if(num>1)
            for(i=1; i<=num-1; i++){
             itemcards.push(<Item  items={JSON.stringify(this.state.items)} id={i}/>);
                }
              return(
            <div>
            <div className="title"> 
               <h1>Items</h1> 
            </div>
            <div className="cards">
                {itemcards}
            </div>
            </div>
              );
          }
        
    }
    
}

export default Items;

