import React, {Component} from 'react';
import axios from 'axios';
import './Query.css';
import './Loaders.css';


class Query extends Component {
    static defaultProps = {
        token: "",
        org: "airport"
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
        if(this.props.org === "airport") {
            url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPrivatePerson&args=%5B%22${this.state.uid}%22%5D`;
        } 
        if (this.props.org === "ccd" || this.props.org === "mcd"){
            url = `/channels/mychannel/chaincodes/newv3?peer=peer0.airport.example.com&fcn=readPerson&args=%5B%22${this.state.uid}%22%2C%20%22${this.props.org}%22%5D`;
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
            content: "response.data",
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