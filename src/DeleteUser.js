import React, {Component} from 'react';
import './DeleteUser.css';

class DeleteUser extends Component {
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
            <div className="DeleteUser">
                <div className="form-container">

                    <div className="header">
                        <h1>Delete Confirmation</h1>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="input-group">
                                <label for="userID">User ID
                                    <span>*</span>
                                </label>
                                <input type="text" name="userID" value=""/>
                            </div>
                        </div>

                        <button className="button" type="submit">Delete Now</button>
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

export default DeleteUser;