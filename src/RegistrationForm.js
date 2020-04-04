import React, { Component } from 'react';
import axios from 'axios';

class RegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            airport: "", 
            users: "", 
            ccd: "", 
            mcd: "",
            airportToken: "",
            usersToken: "",
            ccdToken: "",
            mcdToken: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);    
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleSubmit(e){
        e.preventDefault();
        let orgs = ["airport", "users", "ccd", "mcd"];
        let tokens = [];
        orgs.forEach(async (org) => {
                let response = await axios.post('http://localhost:4000/users', {
                username: `${this.state[org]}`,
                orgName: org
            });
            console.log(response);
            tokens.push(response.data.token);
        });
        this.setState({
            airportToken: tokens[0],
            usersToken: tokens[1],
            ccdToken: tokens[2],
            mcdToken: tokens[3]
        });
    }

    render(){
        return (
            <div>
                <h1>Registration Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="airport">Airport</label>
                    <input
                        id="airport"
                        name="airport"
                        placeholder="Airport User"
                        value={this.state.airport}
                        onChange={this.handleChange} /><br/>
                    
                    <label htmlFor="ccd">CCD</label>
                    <input
                        id="ccd"
                        name="ccd"
                        placeholder="CCD User"
                        value={this.state.ccd}
                        onChange={this.handleChange} /><br/>

                    <label htmlFor="mcd">MCD</label>
                    <input
                        id="mcd"
                        name="mcd"
                        placeholder="MCD User"
                        value={this.state.mcd}
                        onChange={this.handleChange} /><br/>

                    <label htmlFor="users">Users</label>
                    <input
                        id="users"
                        name="users"
                        placeholder="Users User"
                        value={this.state.users}
                        onChange={this.handleChange} /><br/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;