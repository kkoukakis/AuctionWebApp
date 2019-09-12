import React, { Component } from 'react';
//import { UserContext } from './UserContext';
import $ from 'jquery';

export class Login extends Component {        
    
    //static contextType = UserContext;
    
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(event) {
        console.log('ref to username: ', this.username.current);
        
        const u = this.username.current.value;
        const p = this.password.current.value;
        console.log('Submitting...', u, p);
        
        $.ajax({
            url: 'http://localhost:3030/WebApp/api/login',
            dataType: 'json',                       
            type: 'POST',         
            data: {
                username: u,
                password: p
            }
        }).then(json => {   
            
            console.log(json);
            
            //store the user's data in local storage
            //to make them available for the next
            //user's visit
            localStorage.setItem('token', json.token);
            localStorage.setItem('username', u);
            
            //use the setUserData function available
            //through the UserContext
            this.context.setUserData(json.token, u);
            
            //use the history prop available through
            //the Route to programmatically navigate
            //to another route            
            this.props.history.push('/main');
        });
        
        event.preventDefault();
    }
    
    render() {        
        return (                                    
            <form onSubmit={this.handleSubmit}>

                <label htmlFor="username">Username</label>
                <input id="username" type="text" ref={this.username} />

                <label htmlFor="password">Password</label>
                <input id="password" type="password" ref={this.password} />                

                <button className="btn btn-primary" type="submit">
                    Login
                </button>
            </form>
        );        
    }    
}

export class Logout extends Component {
    
   // static contextType = UserContext;
    
    doLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
                    
        this.context.setUserData(null, null);
        
        this.props.history.push('/');
    }
    
    componentDidMount() {
        //perform an ajax call to logout
        //and then clean up local storage and
        //context state.

        //testing
        setTimeout(this.doLogout.bind(this), 1000);
    }
    
    render() {
        return (<h2>Loggin out...</h2>);
    }
}