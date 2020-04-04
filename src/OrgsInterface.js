import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Airport from './Airport'
import "./OrgsInterface.css"

class OrgsInterface extends Component {

    render(){
        return (
            <div className="OrgsInterface">
                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav nav-pills nav-stacked" id="menu">
                            <li>
                                <NavLink to="#"><span className="fa-stack fa-lg pull-left"><i className="fa fa-cloud-download fa-stack-1x "></i></span>Airport</NavLink>
                            </li>
                            <li>
                                <NavLink to="#"> <span className="fa-stack fa-lg pull-left"><i className="fa fa-cart-plus fa-stack-1x "></i></span>Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="#"><span className="fa-stack fa-lg pull-left"><i className="fa fa-youtube-play fa-stack-1x "></i></span>CCD</NavLink>
                            </li>
                            <li>
                                <NavLink to="#"><span className="fa-stack fa-lg pull-left"><i className="fa fa-wrench fa-stack-1x "></i></span>MCD</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="container-fluid xyz">
                            <div className="row">
                            <div className="col-lg-12">
                                <Airport />
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