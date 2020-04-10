import React, { Component } from 'react';
import AppForm from './AppForm';
import DeleteUser from './DeleteUser';
import UpdateConsent from './UpdateConsent';
import RevokeConsent from './RevokeConsent';
import Query from './Query';


class Users extends Component {
    constructor(props){
        super(props);
        this.state = {
            buttonActive: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(command){
        this.setState({
            buttonActive: command
        });
    }

    render(){
        const buttonStyle = "btn btn-outline-primary";
        return (
            <div className="Users">
                <h1>Users Dashboard</h1>
                <nav>
                    <button 
                        type="button"
                        onClick={() => this.handleClick("query")}
                        className={
                            this.state.buttonActive==="query" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Query</button>

                    <button 
                        type="button"
                        onClick={() => this.handleClick("revoke")} 
                        className={
                            this.state.buttonActive==="revoke" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Revoke Consent</button>

                    <button 
                        type="button"
                        onClick={() => this.handleClick("update")}
                        className={
                            this.state.buttonActive==="update" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Update Consent</button>

                    <button 
                        type="button"
                        onClick={() => this.handleClick("delete")}
                        className={
                            this.state.buttonActive==="delete" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Delete Data</button>

                    <button 
                        type="button"
                        onClick={() => this.handleClick("appform")}
                        className={
                            this.state.buttonActive==="appform" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Application Form</button>
                </nav>

                {this.state.buttonActive==="appform" && <AppForm token={this.props.token} />}
                {this.state.buttonActive==="delete" && <DeleteUser token={this.props.token} />}
                {this.state.buttonActive==="update" && <UpdateConsent token={this.props.token} />}
                {this.state.buttonActive==="revoke" && <RevokeConsent token={this.props.token} />}
                {this.state.buttonActive==="query" && <Query token={this.props.token} org="users" />}

            </div>
        );
    }
}

export default Users;