import React, {Component} from 'react';
import axios from 'axios';
import './Query.css';
import './Loaders.css';
import uuid from 'uuid/v4'


class Query extends Component {
    static defaultProps = {
        token: "",
        org: "airport",
        command: ""
    }

    constructor(props){
        super(props);
        this.state = {
            content: "",
            uid: "",
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

        let url;
        if(this.props.org === "airport" || this.props.org === "users") {
            if(this.props.command === "querypvt") {
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPrivatePerson&args=%5B%22${this.state.uid}%22%5D`;
            } else if (this.props.command === "querypub"){
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPersonPublic&args=%5B%22${this.state.uid}%22%5D`;
            } else if (this.props.command === "queryall"){
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=getPersonsByRange&args=%5B%22%22%2C%20%22%22%5D`;
            }else if (this.props.command === "audit"){
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=getHistoryForPerson&args=%5B%22${this.state.uid}%22%5D`;
            } else {
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPrivatePerson&args=%5B%22${this.state.uid}%22%5D`;
            }
        } 
        if (this.props.org === "ccd" || this.props.org === "mcd"){
            if(this.props.command === "querypvt"){
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPerson&args=%5B%22${this.state.uid}%22%2C%20%22${this.props.org}%22%5D`;
            } else {
                url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPersonPublic&args=%5B%22${this.state.uid}%22%5D`;
            }
        }

        const instance = axios.create({
            baseURL: 'http://localhost:4000',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${
                    this.props.token
                }`
            }
        });

        let response = await instance.get(url);
        console.log(response);

        this.setState({
            content: response.data,
            isToggled:true,
            isLoading:false
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
                                <input 
                                    type="text" 
                                    name="uid" 
                                    value={this.state.uid}
                                    onChange={this.handleChange}/>
                            </div>
                        </div>

                        {this.state.isLoading ?  <div className="loader-39" /> : <button className="button" type="submit">Search Now</button>}
                    </form>
                </div>
                <div id="popup1" className={this.state.isToggled ? "overlay toggled" : "overlay"}>
                    <div className="popup">
                        <h2>Query Result</h2>
                        <span className="close" onClick={() => this.setState({isToggled: false})}>&times;</span>
                        <div className="content">
                            {
                                typeof this.state.content !== 'string' ?
                                (
                                    <table>
                                        <thead>
                                            <tr key={uuid()}>
                                                <th>Keys</th>
                                                <th>Values</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.keys(this.state.content).map( key => {
                                                    return (
                                                        <tr key={uuid()}>
                                                            <td>{key}</td>
                                                            <td>{this.state.content[key]}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                ) :
                                this.state.content
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Query;