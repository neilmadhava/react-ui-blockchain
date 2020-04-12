import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Airport from './Airport';
import Users from './Users';
import CCD from './CCD';
import MCD from './MCD';
import './static/OrgsUI.css';

class OrgsUI extends Component {
    static defaultProps = {
        tokens: JSON.parse(window.localStorage.getItem("tokens")) || {
            airport: "",
            ccd: "",
            users: "",
            mcd: ""
        }
    }

    render() {
        return (
            <div className="OrgsUI">
                <div className="area">
                    {
                    this.props.match.params.org === "airport"
                    // && <Airport token={this.props.location.state['airport']} />
                    && <Airport token={this.props.tokens['airport']} />
                }
                    {
                    this.props.match.params.org === "users"
                    // && <Users token={this.props.location.state['users']} />
                    && <Users token={this.props.tokens['users']} />
                }
                    {
                    this.props.match.params.org === "ccd"
                    // && <CCD token={this.props.location.state['ccd']} 
                    && <CCD token={this.props.tokens['ccd']} />
                }
                    {
                    this.props.match.params.org === "mcd"
                    // && <MCD token={this.props.location.state['mcd']} 
                    && <MCD token={this.props.tokens['mcd']} />
                } </div>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <NavLink exact to="/" activeClassName="activeOrg">
                                <i className="fa fa-home fa-2x"></i>
                                <span className="nav-text">
                                    Dashboard
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink exact to="/orgs/airport" activeClassName="activeOrg">
                                <i className="fa fa-plane fa-2x"></i>
                                <span className="nav-text">
                                    Airport
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink exact to="/orgs/users" activeClassName="activeOrg">
                                <i className="fa fa-user fa-2x"></i>
                                <span className="nav-text">
                                    Users
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink exact to="/orgs/ccd" activeClassName="activeOrg">
                                <i className="fa fa-coffee fa-2x"></i>
                                <span className="nav-text">
                                    Cafe Coffee Day
                                </span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink exact to="/orgs/mcd" activeClassName="activeOrg">
                                <i className="fa fa-cutlery fa-2x"></i>
                                <span className="nav-text">
                                    McDonalds
                                </span>
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="logout">
                        <li>
                            <NavLink to="#">
                                <i className="fa fa-power-off fa-2x"></i>
                                <span className="nav-text">
                                    Logout
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default OrgsUI;
