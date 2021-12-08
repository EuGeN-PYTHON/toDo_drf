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
import LoginForm from "./components/auth";
import Cookies from 'universal-cookie';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'username': '',
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    is_authenticated(token) {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
        this.setState({'username':''})
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://localhost:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.set_token(response.data['token'])
                this.setState({'username': username})
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {

        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then(response => {
            const users = response.data
            this.setState(
                {
                    'users': users
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({users: []})
        })


        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then(response => {
            const projectis = response.data
            this.setState(
                {
                    'projects': projectis
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers}).then(response => {
            const todos = response.data
            this.setState(
                {
                    'todos': todos
                }
            )
        }).catch(error => {
            console.log(error)
            this.setState({todos: []})
        })
    }

    componentDidMount() {
        this.get_token_from_storage()
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
    // get_token(username, password) {
    //     axios.post('http://localhost:8000/api-token-auth/', {username: username,
    // password: password})
    //         .then(response => {
    //             console.log(response.data)
    //         }).catch(error => alert('Неверный логин или пароль'))
    // }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <nav className="three">
                        <ul>
                            <li><Link to='/'>USER</Link></li>
                            <li><Link to='/projects'>PROJECTS</Link></li>
                            <li><Link to='/todo'>TODO</Link></li>
                            <li>
                                {this.is_authenticated() ?
                                    <button className="btn-out" onClick={() => this.logout()}>
                                        LOGOUT, {this.state.username}</button> : <Link to='/login'>LOGIN</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                    users={this.state.users}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path='/projects/:id'>
                            <ProjectListUser projects={this.state.projects} users={this.state.users}
                                             todos={this.state.todos}/>
                        </Route>
                        <Route exact path='/todo'
                               component={() => <ToDoList todos={this.state.todos} users={this.state.users}
                                                          projects={this.state.projects}/>}/>

                        <Redirect from='/users' to='/'/>
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