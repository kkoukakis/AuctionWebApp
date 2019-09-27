import React, { Component } from 'react';
// /import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";


//Settings
//import server from './settings.js';

//Components
import Main from './components/Main/Main.js'
import Footer from './components/Footer/Footer.js'
import Nav from './components/Nav/Nav.js'
import LoginPage from './components/Login/LoginPage.js'
import LogoutPage from './components/LogoutPage/LogoutPage.js'
import Register from './components/Register/Register.js'
import Welcome from './components/Welcome/Welcome.js'
import Error404 from './components/Error404/Error404.js'
import Items from './components/Items/Items.js'
import AdminPanel from './components/Admin/AdminPanel.js'
//import Search from './components/Nav/Search.js'
import './App.css';
import Sellitem from './components/Sell/Sellitem.js';

class App extends Component {
  constructor(props){
   super(props)
   this.state = {
     
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      type : localStorage.getItem('type')
    };
  }

 
  renderProtectedComponent(ProtectedComponent , page) {

    if(page==="main"){
      if (this.state.username !== null && this.state.username !== "0" ) {
          return (props) => <ProtectedComponent {...props} />;
      }
      else {
          return (props) => <Redirect to='/login' />;
      }
    }

    if(page==="login"){
      if (this.state.username !== null && this.state.username !== "0" ) {
          
          return (props) => <Redirect to='/main' />;
      }
      else {
        return (props) => <ProtectedComponent {...props} />;
      }
    }
  
    if(page==="register"){
      if (this.state.username !== null && this.state.username !== "0" ) {
          
          return (props) => <Redirect to='/main' />;
      }
      else {
        return (props) => <ProtectedComponent {...props} />;
      }
    }
    if(page==="sellitem"){
      if (this.state.username !== null && this.state.username !== "0" ) {
        return (props) => <ProtectedComponent {...props} />;
         
      }
      else {
        return (props) => <Redirect to='/main' />;
      }
    }

    if(page==="admin"){
      if (this.state.username !== null && this.state.username !== "0" ) {
        return (props) => <ProtectedComponent {...props} />;
         
      }
      else {
        return (props) => <Redirect to='/main' />;
      }
    }

    if(page==="main_loggedin"){
      if (this.state.username !== null && this.state.username !== "0" ) {
          
          return (props) => <Redirect to='/main' />;
      }
      else {
        return (props) => <ProtectedComponent {...props} />;
      }
    }
    if(page==="main_visitor"){
      if (this.state.username !== null && this.state.username !== "0" ) {
          
          return (props) => <Redirect to='/main' />;
          
      }
      else {
        return (props) => <ProtectedComponent {...props} />;
      }
    }

  }

// componentWillMount(){
//   //let t = localStorage.getItem('token');
//   //let u = localStorage.getItem('username');
//   //let type = localStorage.getItem('type');
// }
 
  render() {
    return (
      <div>
         <div className="nav">
         <Nav />
         </div>
           <div className='container1'> 
            <BrowserRouter>
             <Switch>
              <Route exact path="/" component={this.renderProtectedComponent(Welcome, "main_loggedin")}/>
              <Route exact path="/item/:id" component={Welcome}/>
              <Route path="/main"   component ={this.renderProtectedComponent(Main, "main")} />
              <Route path="/login"  component={this.renderProtectedComponent(LoginPage, "login")} />  
              
              <Route path="/sellitem"  component={this.renderProtectedComponent(Sellitem, "sellitem")} />  
              <Route path="/logout"  component={LogoutPage} />  
              <Route path="/items"  component={Items} />  
              <Route path="/admin" component={this.renderProtectedComponent(AdminPanel, "admin")} />
              <Route path="/register"  component={this.renderProtectedComponent(Register, "register")} />  
              <Route path="/404" component={Error404} />
              <Redirect to="/404" />
             </Switch>
           </BrowserRouter>
          </div>
          <div className='footer'>
           <Footer />
          </div>    
      </div>  
    );
  }
}

export default App;
