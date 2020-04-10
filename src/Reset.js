import React, { Component } from 'react';

class Reset extends Component {
    constructor(){
        super(props);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset(){
        if(this.props.command === "dashboard"){
            this.props.history.push("/");
        }
        if(this.props.command === "reset"){
            
        }
    }

    render(){
        return (
            <div className="Reset">
                <div className="form-container">
                    <div className="header">
                        <h1>Network is Up!</h1>
                    </div>
                    <form onSubmit={this.handleReset}>
                        {
                            <button className="submit" type="submit">Go to Dashboard</button>
                        }
                    </form>
                </div>
            </div>
        );
    }
}