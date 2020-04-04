import React, { Component } from 'react';
import './Airport.css'

class Airport extends Component {
    static defaultProps = {
        token: ""
    }

    constructor(props){
        super(props);
        this.state = {
            isInputVisible: false
        }
    }

    render(){
        return (
            <div className="Airport">
                <nav>
                    <button>Query Private Data</button>
                    <button>Query Public Data</button>
                    <button>Query All</button>
                    <button>Audit User</button>
                </nav>
            </div>
        );
    }
}

export default Airport;