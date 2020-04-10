import React, { Component } from 'react';
import Query from './Query';

class CCD extends Component {
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

    render(){
        const buttonStyle = "btn btn-outline-primary";
        return (
            <div className="CCD">
                <h1>Cafe Coffee Day Dashboard</h1>
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
                </nav>

                {this.state.buttonActive==="querypvt" && <Query token={this.props.token} command="querypvt" org="ccd" />}
                {this.state.buttonActive==="querypub" && <Query token={this.props.token} command="querypub" org="ccd" />}
            </div>
        );
    }
}

export default CCD;