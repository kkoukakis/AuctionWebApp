import React, { Component } from 'react';
//import $ from 'jquery';
import './Search.css';

class Search extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            messages:{}
        };
    }
    
    componentDidMount() {        
        console.log("Search component did mount");
        // updated 2019
        const input = document.getElementById("search-input");
        const searchBtn = document.getElementById("search-btn");
        const expand = () => {
          searchBtn.classList.toggle("close");
          input.classList.toggle("square");
        };
        searchBtn.addEventListener("click", expand);
    }
    
    render() {
        return (
            <div>
                <form id="content">
                    <input type="text" name="input" className="input1" id="search-input"/>
                    <button type="reset" className="search" id="search-btn"></button>
                </form>
            </div>
        );
    }
    
}




export default Search;
