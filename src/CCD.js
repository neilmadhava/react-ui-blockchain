import React, { Component } from 'react';
import $ from 'jquery';
import Query from './Query';
import ccd from './static/coffee.jpg';
import './static/CCD.css';

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

    componentDidMount(){
        var background = 'url(' + ccd + ')';
        console.log("Inside component did mount")
        $('body').css('background-image', background);
        $('body').css('background-position', 'center');
        $('body').css('background-repeat', 'no-repeat');
        $('body').css('background-size', 'cover');
    }

    render(){
        const buttonStyle = "btn btn-outline-primary col mx-2 my-3 p-2";
        return (
            <div className="CCD container">
                <div className="btn-container px-5">
                    <div className="row">
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
                    </div>
                </div>

                {this.state.buttonActive==="querypvt" && <Query token={this.props.token} command="querypvt" org="ccd" />}
                {this.state.buttonActive==="querypub" && <Query token={this.props.token} command="querypub" org="ccd" />}
                <footer>Photo by Janko Ferlič on Unsplash</footer>
            </div>
        );
    }
}

export default CCD;