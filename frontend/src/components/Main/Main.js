import React, { Component } from 'react';
import './Main.css'
//import $ from 'jquery';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Main component did mount");
        if(localStorage.getItem('username').length > 0){
            document.all.style = "background: red";
        }
    }
    
    

    render() {
        return (
            <div className='title'>
               <h1>My Items And My Bids</h1> 
            </div>
        );
    }
    
}

export default Main;
