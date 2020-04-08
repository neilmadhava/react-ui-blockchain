import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import Airport from './Airport';
import Users from './Users';
import CCD from './CCD';
import MCD from './MCD';
import './OrgsUI.css';
// import './OrgsUI-test.css';

class OrgsUI extends Component {
    render() {
        return (
            <div className="OrgsUI">
                <div className="area">
                    {
                    this.props.match.params.org === "airport" && <Airport />
                    // && <Airport token={this.props.location.state['airport']} />
                }
                    {
                    this.props.match.params.org === "users" && <Users/>
                    // && <Users token={this.props.location.state['users']} />
                }
                    {
                    this.props.match.params.org === "ccd"&& <CCD/>
                    // && <CCD token={this.props.location.state['ccd']} />
                }
                    {
                    this.props.match.params.org === "mcd" && <MCD/>
                    // && <MCD token={this.props.location.state['mcd']} />
                } </div>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <NavLink to="/">
                                <i className="fa fa-home fa-2x"></i>
                                <span className="nav-text">
                                    Dashboard
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink to="/orgs/airport">
                                <i className="fa fa-plane fa-2x"></i>
                                <span className="nav-text">
                                    Airport
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink to={{pathname:"/orgs/users",state:this.props.location.state}}>
                                <i className="fa fa-user fa-2x"></i>
                                <span className="nav-text">
                                    Users
                                </span>
                            </NavLink>

                        </li>
                        <li className="has-subnav">
                            <NavLink to="/orgs/ccd">
                                <i className="fa fa-coffee fa-2x"></i>
                                <span className="nav-text">
                                    Cafe Coffee Day
                                </span>
                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/orgs/mcd">
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
