import React, {Component} from 'react';
import './UpdateConsent.css';
import './Loaders.css';
import axios from 'axios';

class UpdateConsent extends Component {
    static defaultProps = {
        token: ""
    }

    constructor(props){
        super(props);
        this.state = {
            content: "",
            uid: "",
            org: "ccd",
            consent: "high",
            isToggled: false,
            isLoading: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        this.setState({[evt.target.name]: evt.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();

        this.setState({
            isLoading: true
        });

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
            'fcn':'giveConsent',
            'args':[`${this.state.uid}`,`${this.state.consent}`,`${this.state.org}`]
        });
        console.log(response);

        this.setState({
            content: response.data.message,
            isToggled:true,
            isLoading: false
        });

    }

    render() {
        return (
            <div className="UpdateConsent">
                <div className="form-container">

                    <div className="header">
                        <h1>Update Consent</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="uid">User ID
                                    <span>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="uid" 
                                    value={this.state.uid}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="org">Choose an organization:</label>
                                <select name="org" onChange={this.handleChange}>
                                    <option value="ccd">Cafe Coffee Day</option>
                                    <option value="mcd">McDonalds</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            <label htmlFor="consent">Choose a consent type:</label>
                                <select name="consent" onChange={this.handleChange}>
                                    <option value="high">High [exclude credit card details]</option>
                                    <option value="medium">Medium [exclude phone number, credit card details]</option>
                                    <option value="low">Low [include name, src station, departure date]</option>
                                </select>
                            </div>
                        </div>

                        {this.state.isLoading ?  <div className="loader-39" /> : <button className="button" type="submit">Update Now</button>}
                    </form>
                </div>
                <div id="popup1" className={this.state.isToggled ? "overlay toggled" : "overlay"}>
                    <div className="popup">
                        <h2>Result</h2>
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

export default UpdateConsent;