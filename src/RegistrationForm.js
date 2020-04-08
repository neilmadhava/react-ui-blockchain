import React, {Component} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import './Loaders.css'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            airport: "",
            users: "",
            ccd: "",
            mcd: "",
            tokens: {}
        };
        this.tokensObj = {};
        this.orgs = ["airport", "users", "ccd", "mcd"];
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSetup = this.handleSetup.bind(this);
        this.handleShit = this.handleShit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    async handleRegister(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });

        for (let i = 0; i < this.orgs.length; i++) {
            let response = await axios.post('http://localhost:4000/users', {
                username: `${
                    this.state[this.orgs[i]]
                }`,
                orgName: this.orgs[i]
            });
            console.log(response);
            this.tokensObj[this.orgs[i]] = response.data.token;
        }

        console.log(this.tokensObj);
        this.setState({
            tokens: this.tokensObj,
            isLoading: false
        })
        this.props.addTokens(this.tokensObj);
    }

    async handleSetup(e) {
        e.preventDefault();

        this.setState({
            isLoading: true
        });

        // CREATE Axios instance with suitable configurations
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    this.tokensObj['airport']
                }`
            }
        });

        // Creating Channel
        let response = await instance.post('/channels', {
            "channelName": "mychannel",
            "channelConfigPath": "../../channel-artifacts/channel.tx"
        });
        console.log(response);

        // Join peers to channel
        let result = await this.joinChannel(instance);
        console.log(result);

        // Update anchor peers
        result = await this.updateAnchorPeers(instance);
        console.log(result);

        // Install chaincode on all organizations
        result = await this.installChaincode(instance);
        console.log(result);

        // Instantiating chaincode on channel
        response = await instance.post('/channels/mychannel/chaincodes', {
            'peers': ['peer0.airport.example.com'],
            'chaincodeName': 'newv3',
            'chaincodeVersion': '1.0',
            'chaincodeType': 'node',
            'args': ['init'],
            'collectionsConfig': './chaincode/chain_person/collections_config.json'
        }, {
            header: {
                Authorization: `Bearer ${
                    this.tokensObj['airport']
                }`
            }
        });
        console.log(response);
        this.props.history.push({
            pathname: '/orgs',
            state: this.state.tokens
          });
    }

    async joinChannel(instance) {
        for (let i = 0; i < this.orgs.length; i++) {
            let response = await instance.post('/channels/mychannel/peers', {
                'peers': [`peer0.${
                        this.orgs[i]
                    }.example.com`]
            }, {
                headers: {
                    Authorization: `Bearer ${
                        this.tokensObj[this.orgs[i]]
                    }`
                }
            });
            console.log(response);
        }
        return true;
    }

    async updateAnchorPeers(instance) {
        for (let i = 0; i < this.orgs.length; i++) {
            let response = await instance.post('/channels/mychannel/anchorpeers', {
                'configUpdatePath': `../../channel-artifacts/${this.orgs[i]}anchors.tx`
            }, {
                headers: {
                    Authorization: `Bearer ${this.tokensObj[this.orgs[i]]}`
                }
            });
            console.log(response);
        }
        return true;
    }

    async installChaincode(instance) {
        for (let i = 0; i < this.orgs.length; i++) {
            let response = await instance.post('/chaincodes', {
                'peers': [`peer0.${
                        this.orgs[i]
                    }.example.com`],
                'chaincodeName': 'newv3',
                'chaincodePath': './chaincode/chain_person',
                'chaincodeType': 'node',
                'chaincodeVersion': '1.0'
            }, {
                headers: {
                    Authorization: `Bearer ${
                        this.tokensObj[this.orgs[i]]
                    }`
                }
            });
            console.log(response);
        }
        return true;
    }

    handleShit(){
        this.props.history.push({
            pathname: '/orgs',
            state: this.state.tokens
          })
    }

    render() {
        const regForm = (
            <div className="RegistrationForm">
                <div className="form-container">
                    <div className="header">
                        <h1>Registration Form</h1>
                    </div>

                    <form onSubmit={this.handleRegister}>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="airport">Airport
                                    <span>*</span>
                                </label>
                                <input id="airport" name="airport" placeholder="Airport User"
                                    value={
                                        this.state.airport
                                    }
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="users">Users
                                    <span>*</span>
                                </label>
                                <input id="users" name="users" placeholder="Users User"
                                    value={this.state.users}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="airpccdort">CCD
                                    <span>*</span>
                                </label>
                                <input id="ccd" name="ccd" placeholder="CCD User"
                                    value={this.state.ccd}
                                    onChange={this.handleChange}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="mcd">MCD
                                    <span>*</span>
                                </label>
                                <input id="mcd" name="mcd" placeholder="MCD User"
                                    value={this.state.mcd}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>
                        {this.state.isLoading ?  <div className="loader-39" /> : <button className="submit" type="submit">Register Now</button>}
                        
                    </form>
                </div>
            </div>
        );

        const setup = (
            <div className="RegistrationForm">
                <div className="form-container">
                    <div className="header">
                        <h1>Set Up Network</h1>
                    </div>
                    <form onSubmit={this.handleSetup}>
                        {this.state.isLoading ?  <div className="loader-39" /> : <button className="submit" type="submit">Set Up Network</button>}
                    </form>
                </div>
            </div>
        );

        return (
            <div> 
                {/* {setup} */}
                {this.props.tokens.airport === undefined ? regForm : setup} 
            </div>
        );
    }
}

export default RegistrationForm;
