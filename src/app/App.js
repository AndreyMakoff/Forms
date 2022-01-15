import React from "react";
import Users from "./layout/users";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./layout/login";
import Main from "./layout/main";
function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path={"/"} exact component={Main} />
                <Route path={"/login"} component={Login} />
                <Route path={"/users/:userId?"} component={Users} />
            </Switch>
        </div>
    );

    // );
}

export default App;
