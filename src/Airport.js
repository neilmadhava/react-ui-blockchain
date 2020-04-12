import React, { Component } from 'react';
import Query from './Query';
import $ from 'jquery';
import './static/Airport.css'
import airport from './static/airport.jpg';

class Airport extends Component {
    static defaultProps = {
        token: ""
    }

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
        var background = 'url(' + airport + ')';
        console.log("Inside component did mount")
        $('body').css('background-image', background);
        $('body').css('background-position', 'center');
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-size', 'cover');
    }

    render(){
        const qpvtStyle = "btn btn-outline-warning col mx-2 mt-4 mb-3 p-2";
        const qpubStyle = "btn btn-outline-success col mx-2 mt-4 mb-3 p-2";
        const qallStyle = "btn btn-outline-info col mx-2 mb-4 mt-3 p-2";
        const auditStyle = "btn btn-outline-primary col mx-2 mb-4 mt-3 p-2";

        return (
            <div className="Airport container">
                {/* <h1>Airport Dashboard</h1> */}
                <div className="btn-container px-5">
                    <div className="row">
                        <button 
                            type="button" 
                            onClick={() => this.handleClick("querypvt")}
                            className={
                                this.state.buttonActive==="querypvt" ?
                                qpvtStyle + " active" : qpvtStyle
                            }
                        >Query Private Data</button>

                        <button 
                            type="button" 
                            onClick={() => this.handleClick("querypub")}
                            className={
                                this.state.buttonActive==="querypub" ?
                                qpubStyle + " active" : qpubStyle
                            }
                        >Query Public Data</button>
                    </div>
                    <div className="row">
                        <button 
                            type="button" 
                            onClick={() => this.handleClick("queryall")}
                            className={
                                this.state.buttonActive==="queryall" ?
                                qallStyle + " active" : qallStyle
                            }
                        >Query All</button>

                        <button 
                            type="button" 
                            onClick={() => this.handleClick("audit")}
                            className={
                                this.state.buttonActive==="audit" ?
                                auditStyle + " active" : auditStyle
                            }
                        >Audit User</button>
                    </div>
                </div>

                {this.state.buttonActive==="querypvt" && <Query token={this.props.token} org="airport" command="querypvt"/>}
                {this.state.buttonActive==="querypub" && <Query token={this.props.token} org="airport" command="querypub"/>}
                {this.state.buttonActive==="queryall" && <Query token={this.props.token} org="airport" command="queryall"/>}
                {this.state.buttonActive==="audit" && <Query token={this.props.token} org="airport" command="audit"/>}
                <footer>Photo by Bao Menglong on Unsplash</footer>
            </div>
        );
    }
}

export default Airport;