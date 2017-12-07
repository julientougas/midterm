require("./main.scss");

import React, {Component} from "react";
import ReactDOM from "react-dom";
//import ContactList from "./components/ContactList";
//import ContactDetails from "./components/ContactDetails";
import contacts from "./data";

let state = {};

function calculateAge(dob = "1900-01-01 00:00:01"){
    let date = new Date(Date.now() - new Date(dob).getTime());
    return Math.abs(date.getUTCFullYear() - 1970);
}

class ContactList extends Component {
    render() {
         return ( 
            <div>
                <li className="contact">
                    <a href={"#/contact/" + this.props.id}>
                        <img src={this.props.picture.thumbnail} alt=""/>
                        <p>{this.props.name.first} {this.props.name.last}</p>
                    </a>
                </li>
            </div>
         ); 
    }
}

class ContactDetails extends Component {
    render() {
        if (!this.props.item) {
            return (
                <div className="contactDetails">
                    <p>Click on a contact to view details</p>
                </div>
            );
        } else {
            return (
                <div className="contactDetails">
                    <h1>{this.props.item.name.first} {this.props.item.name.last}</h1>
                    <img src={this.props.item.picture.large} alt=""/>
                    <p>{calculateAge(this.props.item.dob)} years old ({this.props.item.dob.substring(0,10)})</p>
                    <p>{this.props.item.email}</p>
                    <p>Home: {this.props.item.phone}</p>
                    <p>Cell: {this.props.item.cell}</p>
                </div>
            );
        }
    }
}




function setState(changes){
    state = Object.assign({}, state, changes);
    
    let item;
    let location = state.location.replace(/^#\/?|\/$/g, "").split("/");
    
    //Routing
    if (location[0] === "contact" ){
        item = state.items.find(item => item.id == location[1] ? true : false);
    }
    
    const wrapDiv = (
        <div className='wrap'>
            <h1 className="header">Contact List</h1>
            <div className='contactList'>
                <ul>{state.items.map (item => <ContactList {...item}/>)}</ul>
            </div>
            <ContactDetails item={item} />
        </div>
    ); 
    
    ReactDOM.render(wrapDiv, document.getElementById("react-app"));
}

//On hash change
window.addEventListener("hashchange", ()=>setState({location: location.hash}));

//Initial State
setState({
    items: contacts,
    location: location.hash
});