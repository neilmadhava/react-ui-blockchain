import React, {Component} from 'react';
import './RevokeConsent.css';

class RevokeConsent extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "Thank to pop me out of that button, but now i'm done so you can close this window.",
            isToggled: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        setTimeout(()=>this.setState({
            content: "Testing",
            isToggled:true
        }), 1000);

    }

    render() {
        return (
            <div className="RevokeConsent">
                <div className="form-container">

                    <div className="header">
                        <h1>Revoke Consent</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="uid">User ID
                                    <span>*</span>
                                </label>
                                <input type="text" name="uid" value=""/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="org">Choose an organization:</label>
                                <select id="org">
                                    <option value="ccd">Cafe Coffee Day</option>
                                    <option value="mcd">McDonalds</option>
                                </select>
                            </div>
                        </div>

                        {/* <span class="button">Revoke Now</span> */}
                        <button className="button" type="submit">Revoke Now</button>
                    </form>
                </div>
                <div id="popup1" className={this.state.isToggled ? "overlay toggled" : "overlay"}>
                    <div className="popup">
                        <h2>Here i am</h2>
                        <span className="close" onClick={() => this.setState({isToggled: false})}>&times;</span>
                        <div className="content">
                            {this.state.content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RevokeConsent;