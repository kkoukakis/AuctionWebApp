import React, { Component } from 'react';
//import $ from 'jquery';
import './Error.css';

class Error404 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Error404 component did mount");    
        setTimeout(function() {
            window.location='/'
        }, 3000);
    }
    
    render() {
        return (
        <div className="centered">
            <h1 className="neg title"><span className="bg">Error - 404</span></h1>
            <p className="centered">An error has occured, :</p>
            <p className="centered">* We will return you to our homepage in 3 seconds<br />
            * Send us an e-mail about this error and try later.</p>
            <nav className="nav centered">
              <a href="/" className="link">homepage</a>
            </nav>
          </div>
        );
    }
    
}




export default Error404;



