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
            tokens: {}
        };
        this.tokensArr = {};
        this.orgs = ["airport", "users", "ccd", "mcd"];
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleSetup = this.handleSetup.bind(this);  
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async handleRegister(e){
        e.preventDefault();
        this.orgs.forEach(async (org) => {
                let response = await axios.post('http://localhost:4000/users', {
                username: `${this.state[org]}`,
                orgName: org
            });
            console.log(response);
            this.tokensArr[org]=response.data.token;
        });

        console.log(this.tokensArr);
    }

    async joinChannel(instance){
        for(let i=0; i<this.orgs.length; i++){
            let response = await instance.post('/channels/mychannel/peers', {
                'peers': [`peer0.${this.orgs[i]}.example.com`,`peer1.${this.orgs[i]}.example.com`]
            }, {
                headers: {
                    Authorization: `Bearer ${this.tokensArr[this.orgs[i]]}`
                }
            });
            console.log(response);
        }
        return true;
    }

    async updateAnchorPeers(instance){
        for(let i=0; i<this.orgs.length; i++){
            let response = await instance.post('/channels/mychannel/anchorpeers', {
                'configUpdatePath':`../../channel-artifacts/${this.orgs[i]}anchors.tx`
            }, {
                headers: {
                    Authorization: `Bearer ${this.tokensArr[this.orgs[i]]}`
                }
            });
            console.log(response);
        }
        return true;
    }

    async installChaincode(instance){
        for(let i=0; i<this.orgs.length; i++){
            let response = await instance.post('/chaincodes', {
                'peers': [`peer0.${this.orgs[i]}.example.com`,`peer1.${this.orgs[i]}.example.com`],
                'chaincodeName':'newv3',
                'chaincodePath':'./chaincode/chain_person',
                'chaincodeType': 'node',
                'chaincodeVersion':'1.0'
            }, {
                headers: {
                    Authorization: `Bearer ${this.tokensArr[this.orgs[i]]}`
                }
            });
            console.log(response);
        }
        return true;
    }

    async handleSetup(e){
        e.preventDefault();
        this.setState({
            tokens: this.tokensArr
        });

        // CREATE Axios instance with suitable configurations
        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.tokensArr['airport']}`
            }
        });

        // Creating Channel
        let response = await instance.post('/channels', {
            "channelName":"mychannel",
	        "channelConfigPath":"../../channel-artifacts/channel.tx"
        });
        console.log(response);

        // Join peers to channel
        let result = await this.joinChannel(instance);
        console.log(result);

        //Update anchor peers
        result = await this.updateAnchorPeers(instance);
        console.log(result);

        // Install chaincode on all organizations
        result = await this.installChaincode(instance);
        console.log(result);

                
    }

    render(){
        return (
            <div>
                <h1>Registration Form</h1>
                <form onSubmit={this.handleRegister}>
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
                <button onClick={this.handleSetup}>Setup Network</button>
            </div>
        );
    }
}

export default RegistrationForm;