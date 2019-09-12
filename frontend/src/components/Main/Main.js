import React, { Component } from 'react';
import $ from 'jquery';

class Main extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    //componentDidMount() {        
    //    console.log("Main component did mount");
    //}
    
    render() {
        return (
            <div>
               <h1>MAIN PAGE</h1> 
            </div>
        );
    }
    
}

export default Main;
