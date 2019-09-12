import React, { Component } from 'react';
import $ from 'jquery';
import css from './Error.css';

class Error404 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Error404 component did mount");    
        var timer = setTimeout(function() {
            window.location='/'
        }, 3000);
    }
    
    render() {
        return (
        <div className="error">
            <h1 className="centered error-text error-text3">ERROR 404: take me back to homepage</h1>
        </div>
        );
    }
    
}




export default Error404;



