import React from "react";
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";

const Menu = () => {
    return (
        <nav className="three">
            <ul>
                <li><Link to='/'>USER</Link></li>
                <li><Link to='/projects'>PROJECTS</Link></li>
                <li><Link to='/todo'>TODO</Link></li>
            </ul>
        </nav>
    )
}

export default Menu;
