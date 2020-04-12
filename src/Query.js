import React, {Component} from 'react';
import axios from 'axios';
import './static/Query.css';
import './static/Loaders.css';
import uuid from 'uuid/v4';


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
                        <h1>
                            {
                                (this.props.command === "querypub" && "Query Public Data") ||
                                (this.props.command === "querypvt" && "Query Private Data") ||
                                (this.props.command === "queryall" && "Query All") ||
                                (this.props.command === "audit" && "Audit User")
                            }
                        </h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group" style={this.props.command==="queryall" ? {display: "none"}: {boxSizing: "border-box"}}>
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
                    <div 
                        className="popup" 
                        style={
                            (this.props.command === "querypub" && {"--width": "25%"}) ||
                            (this.props.command === "querypvt" && {"--width": "25%"}) ||
                            (this.props.command === "queryall" && {"--width": "45%"}) ||
                            (this.props.command === "audit" && {"--width": "75%"})
                            }>
                        <h2>
                            {
                                (this.props.command === "querypub" && "Public Data") ||
                                (this.props.command === "querypvt" && "Private Data") ||
                                (this.props.command === "queryall" && "Query Result") ||
                                (this.props.command === "audit" && "User History")
                            }
                        </h2>
                        <span className="close" onClick={() => this.setState({isToggled: false, uid: ""})}>&times;</span>
                        <div className="content">
                            {
                                ((typeof this.state.content !== 'string') &&
                                ((this.props.command === "querypvt")||(this.props.command === "querypub")) &&
                                (
                                    <table>
                                        <thead>
                                            <tr key={uuid()}>
                                                <th style={{backgroundColor: "white", border: "0px"}}></th>
                                                <th>Keys</th>
                                                <th>Values</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Object.keys(this.state.content).map( (key, idx) => {
                                                    return (
                                                        <tr key={uuid()}>
                                                            <td style={{backgroundColor: "#d6d4d4"}}>{idx+1}</td>
                                                            <td>{key}</td>
                                                            <td>{this.state.content[key]}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )) ||
                                ((typeof this.state.content !== 'string') &&
                                (this.props.command === "queryall") &&
                                (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{backgroundColor: "white", border: "0px"}}></th>
                                                {
                                                    Object.keys(this.state.content[0].Record).map( key => {
                                                        return (
                                                            <th key={key}>{key}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.content.map( (key, idx) => {
                                                    return (
                                                        <tr key={uuid()}>
                                                            <td style={{backgroundColor: "#d6d4d4"}}>{idx+1}</td>
                                                            {
                                                                Object.keys(key.Record).map( k => {
                                                                    return (
                                                                        <td>{key.Record[k]}</td>
                                                                    );
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                })
                                                
                                            }
                                        </tbody>
                                    </table>
                                )) || 
                                ((typeof this.state.content !== 'string') &&
                                (this.props.command === "audit") &&
                                (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{backgroundColor: "white", border: "0px"}}></th>
                                                <th>TxId</th>
                                                {
                                                    Object.keys(this.state.content[0].Value).map(key => {
                                                        return <th key={uuid()}> {key} </th>
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.content.map( (key, idx) => {
                                                    return (
                                                        <tr key={uuid()}>
                                                            <td style={{backgroundColor: "#d6d4d4"}}>{idx+1}</td>
                                                            <td>{key.TxId}</td>
                                                            {
                                                                Object.keys(key.Value).map( k => {
                                                                    return (
                                                                        <td key={uuid()}>{key.Value[k]}</td>
                                                                    );
                                                                })
                                                            }
                                                        </tr>
                                                    )
                                                })
                                                
                                            }
                                        </tbody>
                                    </table>
                                )) || 
                                ((typeof this.state.content === 'string') && this.state.content)
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Query;