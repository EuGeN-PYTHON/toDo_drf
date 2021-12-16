import React from "react";
import App from "react";
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";

const Menu = () => {
    return (
        <nav className="three">
            <ul>
                <li><Link to='/'>USER</Link></li>
                <li><Link to='/projects'>PROJECTS</Link></li>
                <li><Link to='/todo'>TODO</Link></li>
                <li>
                    {this.is_authenticated() ? <button className="btn-out"onClick={() => this.logout()}>
                        LOGOUT</button> : <Link to='/login'>LOGIN</Link>}
                </li>
            </ul>
        </nav>
    )
}

export default Menu;
