import React, { Component } from 'react';
import Query from './Query';

class Airport extends Component {
    // static defaultProps = {
    //     token: JSON.parse(window.localStorage.getItem("tokens") || "[]")
    // }

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
            <div className="Airport">
                <h1>Airport Dashboard</h1>
                <nav>
                    <button 
                        type="button" 
                        onClick={() => this.handleClick("querypvt")}
                        className={
                            this.state.buttonActive==="querypvt" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Query Private Data</button>

                    <button 
                        type="button" 
                        onClick={() => this.handleClick("querypub")}
                        className={
                            this.state.buttonActive==="querypub" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Query Public Data</button>

                    <button 
                        type="button" 
                        onClick={() => this.handleClick("queryall")}
                        className={
                            this.state.buttonActive==="queryall" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Query All</button>

                    <button 
                        type="button" 
                        onClick={() => this.handleClick("audit")}
                        className={
                            this.state.buttonActive==="audit" ?
                            buttonStyle + " active" : buttonStyle
                        }
                    >Audit User</button>
                </nav>

                {this.state.buttonActive==="querypvt" && <Query token={this.props.token} org="airport" command="querypvt"/>}
                {this.state.buttonActive==="querypub" && <Query token={this.props.token} org="airport" command="querypub"/>}
                {this.state.buttonActive==="queryall" && <Query token={this.props.token} org="airport" command="queryall"/>}
                {this.state.buttonActive==="audit" && <Query token={this.props.token} org="airport" command="audit"/>}

            </div>
        );
    }
}

export default Airport;