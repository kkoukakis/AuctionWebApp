//Auction sites
import React, { Component } from 'react';
//import $ from 'jquery';

import {changebackground, server} from '../../settings.js';



class AdminPanel extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            users: null
        };
    }
   
    
    componentDidMount() {        
        console.log("Welcome component did mount");
        
        window.addEventListener('load', this.handleload());
        this.getStuff(server+'items')
        this.getStuff(server+'admin/users')
      
    }

    getStuff(url){
        fetch(url).then(results => results.json()).then(
            results => this.setState({items : results})
        );
    }
    

    handleload(){
        changebackground('pink');
        
    }
    
    componentWillUnmount() {
        if (this._asyncRequest) {
          this._asyncRequest.cancel();
        }
      }
    
   
    render() {
        

        if (this.state.items === null || this.state.users ===null) {
            // Render loading state ...
            return (
                <div>
                <div className="title"> 
                   <h1>Users to approve and all items</h1> 
                   <p> LOADING ...</p>
                   <div className ='lds-ripple'><div></div><div></div></div>
                </div>
                <div className="items-table">

                </div>
                </div>
            );
          } else {
              let list1= null;
              let list2= null;
              let jsonObject1 = this.state.items;
              let jsonObject2 = this.state.users;
              var num1 = jsonObject1['results'].length;
              var num2 = jsonObject2['results'].length;
             var i = 0;
             var j = 0;

            for(i=0; i<num1; i++){
                
            }
            for(j=0; j<num2; j++){
                
            }
            
              return(
            <div>
            <div className="title"> 
               <h1>Users to approve</h1> 
            </div>
            {list1}
            <div className="title"> 
               <h1>List of items</h1> 
            </div>
            {list2}

            </div>
              );
          }
        
    }
    
}

export default AdminPanel;

