import React, { Component } from 'react';
import $ from 'jquery';

import {changebackground, server} from '../../settings.js';

class Welcome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Welcome component did mount");
        window.addEventListener('load', this.handleload());
    }

    handleload(){
        changebackground('#ffbf55');
    }
    
    render() {
        return (
            <div className="title"> 
               <h1>Welcome Page</h1> 
               <h3>Try to login first ^_^</h3> 
            
            </div>
        );
    }
    
}

export default Welcome;
