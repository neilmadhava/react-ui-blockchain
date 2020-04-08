import React, {Component} from 'react';
import './UpdateConsent.css';

class UpdateConsent extends Component {
    constructor(props){
        super(props);
        this.state = {
            content: "",
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
            <div className="UpdateConsent">
                <div className="form-container">

                    <div className="header">
                        <h1>Update Consent</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label htmlFor="uid">User ID
                                    <span>*</span>
                                </label>
                                <input type="text" name="uid" value=""/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="org">Choose an organization:</label>
                                <select id="org">
                                    <option value="ccd">Cafe Coffee Day</option>
                                    <option value="mcd">McDonalds</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                            <label htmlFor="consent">Choose a consent type:</label>
                                <select id="consent">
                                    <option value="high">High [exclude credit card details]</option>
                                    <option value="medium">Medium [exclude phone number, credit card details]</option>
                                    <option value="low">Low [include name, src station, departure date]</option>
                                </select>
                            </div>
                        </div>

                        <button className="button" type="submit">Update Now</button>
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

export default UpdateConsent;