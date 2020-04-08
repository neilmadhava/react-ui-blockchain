import React, {Component} from 'react';
import './Query.css';
import axios from 'axios';

class Query extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "Thank to pop me out of that button, but now i'm done so you can close this window.",
            isToggled: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
        e.preventDefault();

        // CREATE Axios instance with suitable configurations
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    this.props.token
                }`
            }
        });

        let response = await instance.post('/channels/mychannel/chaincodes/newv3', {
            'peers': ['peer0.airport.example.com'],
            'fcn':'initPerson',
            'args':[`${this.state.uid}`,`${this.state.srcStation}`,`${this.state.name}`,`${this.state.depDate}`,`${this.state.phNo}`, `${this.state.creditCard}`, `${this.state.aadhar}`, `${this.state.emailAddr}`, `${this.state.consent}`]
        });
        console.log(response);

        this.setState({
            content: response.data,
            isToggled:true
        });
    }


    render() {
        return (
            <div className="Query">
                <div className="form-container">

                    <div className="header">
                        <h1>Query</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="uid">User ID
                                    <span>*</span>
                                </label>
                                <input type="text" name="uid" value=""/>
                            </div>
                        </div>

                        {/* <a className="button" href="#popup1">Search Now</a> */}
                        <button className="button" type="submit">Search Now</button>
                    </form>
                </div>
                <div id="popup1" className={this.state.isToggled ? "overlay toggled" : "overlay"}>
                    <div className="popup">
                        <h2>Here i am</h2>
                        <span className="close" onClick={() => this.setState({isToggled: false})}>&times;</span>
                        <div className="content">
                            {this.state.content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Query;