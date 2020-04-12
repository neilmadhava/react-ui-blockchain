import React, { Component } from 'react';
import AppForm from './AppForm';
import DeleteUser from './DeleteUser';
import UpdateConsent from './UpdateConsent';
import RevokeConsent from './RevokeConsent';
import Query from './Query';
import $ from 'jquery';
import './static/Users.css';
import users from './static/users.jpg'

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

    componentDidMount(){
        var background = 'url(' + users + ')';
        console.log("Inside component did mount")
        $('body').css('background-image', background);
        $('body').css('background-position', 'center');
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-size', 'cover');
    }

    componentDidUpdate(){
        console.log("Inside component did update");
        var areaHeight = $('.area').height();
        var menuHeight = $('.main-menu').height();

        if (areaHeight > menuHeight) {
            $('.main-menu').height(areaHeight)
        } else {
            $('.main-menu').height('100%')
        }
    }

    render(){
        const queryStyle = "btn btn-outline-primary col mx-1 my-3 p-2";
        const revokeStyle = "btn btn-outline-warning col mx-1 my-3 p-2";
        const updateStyle = "btn btn-outline-info col mx-1 my-3 p-2";
        const deleteStyle = "btn btn-outline-danger col mx-1 my-3 p-2";
        const appStyle = "btn btn-outline-success col mx-1 my-3 p-2";

        return (
            <div className="Users container">
                <div className="btn-container px-5">
                    <div className="row">
                        <button 
                            type="button"
                            onClick={() => this.handleClick("query")}
                            className={
                                this.state.buttonActive==="query" ?
                                queryStyle + " active" : queryStyle
                            }
                        >Query</button>

                        <button 
                            type="button"
                            onClick={() => this.handleClick("revoke")} 
                            className={
                                this.state.buttonActive==="revoke" ?
                                revokeStyle + " active" : revokeStyle
                            }
                        >Revoke Consent</button>                        
                    </div>
                    <div className="row">
                        <button 
                            type="button"
                            onClick={() => this.handleClick("update")}
                            className={
                                this.state.buttonActive==="update" ?
                                updateStyle + " active" : updateStyle
                            }
                        >Update Consent</button>

                        <button 
                            type="button"
                            onClick={() => this.handleClick("delete")}
                            className={
                                this.state.buttonActive==="delete" ?
                                deleteStyle + " active" : deleteStyle
                            }
                        >Delete Data</button>
                    </div>
                    <div className="row">
                        <button 
                            type="button"
                            onClick={() => this.handleClick("appform")}
                            className={
                                this.state.buttonActive==="appform" ?
                                appStyle + " active" : appStyle
                            }
                        >Application Form</button>
                    </div>
                </div>

                {this.state.buttonActive==="appform" && <AppForm token={this.props.token} />}
                {this.state.buttonActive==="delete" && <DeleteUser token={this.props.token} />}
                {this.state.buttonActive==="update" && <UpdateConsent token={this.props.token} />}
                {this.state.buttonActive==="revoke" && <RevokeConsent token={this.props.token} />}
                {this.state.buttonActive==="query" && <Query token={this.props.token} org="users" command="querypub"/>}
            </div>
        );
    }
}

export default Users;