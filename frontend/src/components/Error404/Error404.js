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
        }, 5000);
    }
    
    render() {
        return (
        <main class="bsod container">
            <h1 class="neg title"><span class="bg">Error - 404</span></h1>
            <p>An error has occured, :</p>
            <p>* We will return you to our homepage in 5 seconds<br />
            * Send us an e-mail about this error and try later.</p>
            <nav class="nav centered">
              <a href="/" class="link">homepage</a>
            </nav>
          </main>
        );
    }
    
}




export default Error404;



