// import logo from './logo.svg';
import './App.css';
import React from 'react'
import UserList from "./components/users"
import axios from "axios"
import Footer from "./components/footer"
import Menu from "./components/menu";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users').then(response => {
            const users = response.data
            this.setState(
                {
                    'users': users
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
                <Menu/>

                <UserList users={this.state.users}/>

                <Footer/>

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