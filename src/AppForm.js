import React, {Component} from 'react';
import './AppForm.css';
import axios from 'axios';

class AppForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            uid: "",
            name: "",
            srcStation: "",
            depDate: "",
            phNo: "",
            creditCard: "",
            aadhar: "",
            emailAddr: "",
            consent: "high",
            isToggled: false,
            content: "",
            isLoading: false
        }
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

        // CREATE Axios instance with suitable configurations
        // const instance = axios.create({
        //     baseURL: 'http://localhost:4000',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${
        //             this.props.token
        //         }`
        //     }
        // });

        // let response = await instance.post('/channels/mychannel/chaincodes/newv3', {
        //     'peers': ['peer0.airport.example.com'],
        //     'fcn':'initPerson',
        //     'args':[`${this.state.uid}`,`${this.state.srcStation}`,`${this.state.name}`,`${this.state.depDate}`,`${this.state.phNo}`, `${this.state.creditCard}`, `${this.state.aadhar}`, `${this.state.emailAddr}`, `${this.state.consent}`]
        // });
        // console.log(response);
        setTimeout(() => this.setState({
            content: "testing",
            isToggled:true,
            isLoading: false,
            uid: "",
            name: "",
            srcStation: "",
            depDate: "",
            phNo: "",
            creditCard: "",
            aadhar: "",
            emailAddr: "",
            consent: "high"
        }), 5000);     
    }

    render() {
        return (
            <div className="AppForm">
                <div className="form-container">

                    <div className="header">
                        <h1>Application form</h1>
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
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="name">Name
                                    <span>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="srcStation">Source Station
                                    <span>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="srcStation"
                                    value={this.state.srcStation}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="depDate">Departure Date<span>*</span>
                                </label>
                                <input 
                                    type="date" 
                                    name="depDate"
                                    value={this.state.depDate}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="phNo">Phone Number
                                    <span>*</span>
                                </label>
                                <input 
                                    type="number" 
                                    name="phNo"
                                    value={this.state.phNo}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="creditCard">Credit Card
                                    <span>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="creditCard"
                                    value={this.state.creditCard}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="aadhar">AADHAR ID
                                    <span>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    name="aadhar"
                                    value={this.state.aadhar}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <label htmlFor="emailAddr">Email Address
                                    <span>*</span>
                                </label>
                                <input 
                                    type="email" 
                                    name="emailAddr"
                                    value={this.state.emailAddr}
                                    onChange={this.handleChange}
                                />
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
                        {/* <div class="loader-39"></div> */}
                        {this.state.isLoading ?  <div class="loader-39" /> : <button className="button" type="submit">Apply Now</button>}
                        
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

export default AppForm;
