import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Airport from './Airport';
import Users from './Users';
import CCD from './CCD';
import MCD from './MCD';
import "./OrgsInterface.css";

class OrgsInterface extends Component {
    constructor(props){
        super(props);
        this.state = {
            isToggled1: false,
            isToggled2:false
        }
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle(toggleClass){
        toggleClass === "toggled" && (
            this.setState(st => {
                return {isToggled1: !st.isToggled1}
            })
        )
        toggleClass === "toggled-2" && (
            this.setState(st => {
                return {isToggled2: !st.isToggled2}
            })
        )
    }

    render(){
        return (
            <div className="OrgsInterface">
                <nav className="navbar navbar-default no-margin">
                    {/*  Brand and toggle get grouped for better mobile display  */}
                    <div className="navbar-header fixed-brand">
                        <button onClick={() => this.handleToggle("toggled")} type="button" className="navbar-toggle collapsed" data-toggle="collapse" id="menu-toggle">
                            <i className="fa fa-bars" aria-hidden="true"></i>
                        </button>
                        <a className="navbar-brand" href="#"><i className="fa fa-rocket fa-4"></i>Consent Management</a>
                    </div>
                    {/*  navbar-header */}
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active">
                            <button onClick={() => this.handleToggle("toggled-2")} className="navbar-toggle collapse in" data-toggle="collapse" id="menu-toggle-2"> <i className="fa fa-bars" aria-hidden="true"></i>
                            </button>
                            </li>
                        </ul>
                    </div>
                     {/* bs-example-navbar-collapse-1  */}
                </nav>
                <div id="wrapper" className={this.state.isToggled?"toggled":""}>
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
                            <li>
                                <NavLink to="/orgs/airport" activeClassName="currentOrg"><span className="fa-stack fa-lg pull-left"><i className="fa fa fa-plane fa-stack-1x "></i></span>Airport</NavLink>
                            </li>
                            <li>
                                <NavLink to="/orgs/users" activeClassName="currentOrg"> <span className="fa-stack fa-lg pull-left"><i className="fa fa-user fa-stack-1x "></i></span>Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/orgs/ccd" activeClassName="currentOrg"><span className="fa-stack fa-lg pull-left"><i className="fa fa-coffee fa-stack-1x "></i></span>CCD</NavLink>
                            </li>
                            <li>
                                <NavLink to="mcd" activeClassName="currentOrg"><span className="fa-stack fa-lg pull-left"><i className="fa fa-cutlery fa-stack-1x "></i></span>MCD</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row">
                            <div className="col-lg-12">
                                {this.props.match.params.org === "airport" && <Airport /> }
                                {this.props.match.params.org === "users" && <Users /> }
                                {this.props.match.params.org === "ccd" && <CCD /> }
                                {this.props.match.params.org === "mcd" && <MCD /> }
                                {/* <h1> {this.props.match.params.org} </h1> */}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
} 

export default OrgsInterface;