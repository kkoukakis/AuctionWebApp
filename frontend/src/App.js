import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import logo from './logo.svg';

//http://localhost:3000

//Components
import Main from './components/Main/Main.js'
import Footer from './components/Footer/Footer.js'
import Nav from './components/Nav/Nav.js'
import LoginPage from './components/Login/LoginPage.js'
import Welcome from './components/Welcome/Welcome.js'
import Error404 from './components/Error404/Error404.js'
import Search from './components/Nav/Search.js'
import { Login, Logout } from './components/Auth/Auth.js';
import './App.css';

class App extends Component {
  constructor(props){
   super(props)
   this.state = {
     
      t: localStorage.getItem("token"),
      username: localStorage.getItem("username")
    };
  }

  renderProtectedComponent(ProtectedComponent) {
    if (this.state.username !== null) {
        return (props) => <ProtectedComponent {...props} />;
    }
    else {
        return (props) => <Redirect to='/login' />;
    }
  }
componentWillMount(){
  let t = localStorage.getItem('token');
  let u = localStorage.getItem('username');
}
 
  render() {
    return (
      <div>
        
         <Nav />
           <div className='container1'> 
          
            <BrowserRouter>
             <Switch>
              <Route exact path="/" component={Welcome}/>
              <Route exact path="/item/:id" component={Welcome}/>
              <Route path="/main"   component ={this.renderProtectedComponent(Main)} />
              <Route path="/login"  component={LoginPage} />  
              <Route path="/404" component={Error404} />
              <Redirect to="/404" />
              </Switch>
            </BrowserRouter>
            </div>
            <Footer />    
      </div>  
    );
  }
}

//render() {
//  return (
//    <div style={this.state.style}>
//      <UserProvider value={this.state}>
//          <Router>
//              <div className='container'>  
//                  <Nav />
//                  <Route path="/" exact render={(props) => {
//                      return <h1>Welcome {this.state.username === null? 'Stranger' : this.state.username}</h1>;
//                  }}/>
//                  <Route path="/main" render={this.renderProtectedComponent(Main)} />
//                  <Route path="/other" render={this.renderProtectedComponent(Other)} />
//                  <Route path="/login" component={Login} />                    
//                  <Route path="/logout" render={this.renderProtectedComponent(Logout)} />                    
//                  <Footer />                    
//              </div>
//          </Router>
//      </UserProvider>
//    </div>  
//  );
//}
//}
export default App;
