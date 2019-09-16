import React, { Component } from 'react';
import $ from 'jquery';
import html from './Main.css'

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
            <div style={html}>
               <h1>MAIN PAGE</h1> 
            </div>
        );
    }
    
}

export default Main;
