import '../css/UserLogin.css';
import { withRouter } from "react-router-dom";
import _ from 'lodash';
import axios from "axios";

import React from 'react';

class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: '' ,isFetching:false};

        // Bind 'this' to event handlers. React ES6 does not do this by default
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    }

    usernameChangeHandler(event) {
        this.setState({ username: event.target.value });
    }

    usernameSubmitHandler(event) {
        this.setState({isFetching:true});
        event.preventDefault();
        let users = this.props.users;
        let currentUserName = this.state.username;
        let user = _.find(users,{name:currentUserName.toLowerCase()})
        console.log("user",user);
        if(user){
            this.sendToChatRoom(user);
        }
        else{
            this.createUser(this.state.username);
        }
    }

    sendToChatRoom(user){
        this.setState({isFetching:false});
        this.props.history.push({
            pathname: "/chat",
            state: {userId:user.id}
        });
    }

    createUser(userName){
        axios({
            method: 'post',
            url: 'http://localhost:3001/registerUser',
            data: {
                name: userName.toLowerCase(),
            },
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            console.log(response.data);
            this.sendToChatRoom(response.data);
        });
    }

    render() {

        // Initial page load, show a simple login form
        return (
            <form onSubmit={this.usernameSubmitHandler} className="username-container">
                <h1>Chat App</h1>
                <div>
                    <input
                        type="text"
                        onChange={this.usernameChangeHandler}
                        placeholder="Enter a username..."
                        className="text"
                        required />
                </div>
                <input type="submit" className="submit" value="Submit" />
                {this.state.isFetching&&<p>Loading....</p>}
            </form>

        );
    }

}

export default withRouter(UserLogin);
