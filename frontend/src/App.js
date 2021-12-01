// import logo from './logo.svg';
import './App.css';
import React from 'react'
import UserList from "./components/users"
import ProjectList from "./components/projects";
import ProjectListUser from "./components/ProjectListUser";
import ToDoList from "./components/todos";
import NotFound404 from "./components/NotFound404"
import axios from "axios"
import Footer from "./components/footer"
import Menu from "./components/menu";
import {HashRouter, BrowserRouter, Route, Link, Switch, Redirect} from "react-router-dom";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then(response => {
            const users = response.data
            this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects/').then(response => {
            const projectis = response.data
            this.setState(
                {
                    'projects': projectis
                }
            )
        }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/').then(response => {
            const todos = response.data
            this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => console.log(error))
    }


    // componentDidMount() {
    //     const users = [
    //         {
    //             'user_name': 'Petr1',
    //             'first_name': 'Petr',
    //             'last_name': 'Petrov',
    //             'email': 'petrov@gmail.com',
    //         },
    //         {
    //             'user_name': 'Ivan1',
    //             'first_name': 'Ivan',
    //             'last_name': 'Ivanov',
    //             'email': 'ivanov@gmail.com',
    //         }
    //     ]
    //     this.setState(
    //         {'users': users}
    //     )
    // }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Menu/>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users}/>}/>
                        <Route path='/projects/:id'>
                            <ProjectListUser projects={this.state.projects} users={this.state.users} todos={this.state.todos}/>
                        </Route>
                        <Route exact path='/todo' component={() => <ToDoList todos={this.state.todos} users={this.state.users} projects={this.state.projects}/>}/>

                        <Redirect from='/users' to='/' />
                        <Route component={NotFound404}/>
                        {/*<UserList users={this.state.users}/>*/}
                    </Switch>
                    <Footer/>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> test.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>