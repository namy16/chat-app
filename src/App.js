import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from "./components/Home";
import UserLogin from "./components/UserLogin"
import axios from "axios";

class App extends React.Component {


    state = {users: []};

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:3001/getAllUsers',
            headers: {'Content-Type': 'application/json'},
        }).then((response) => {
            console.log(response.data);
            this.setState({users: response.data});

        });


    }

    render() {
        console.log("l",this.props.location);
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <UserLogin users={this.state.users}/>}
                    />
                    <Route
                        exact
                        path="/chat"
                        render={(state) => <Home user={state.location.state} />}
                    />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;