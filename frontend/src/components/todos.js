import React from 'react';
import App from "../App";
import {Link} from "react-router-dom";


const ToDoItem = ({todo, users, projects, deleteToDo}) => {
    // let {project_name} = projects.find((project) => project.id == todo.project).name
    // let {user_name} = users.find((user) => user.id == todo.create_user).user_name
    // if (todo.is_active === true) {
    //         const TD = "TD"
    //     } else {
    //         const TD = "TD_RED"
    //     }
    return (
        <tr className="table">
            <td className="TD">{todo.id}</td>
            <td className="TD">
                {/*{projects.find((project) => project.id == todo.project).name}*/}
                {todo.project}
            </td>
            <td className="TD">{todo.text}</td>
            <td className="TD">
                {todo.create_user}
                {/*{users.find((user) => user.id == todo.create_user).user_name}*/}
            </td>
            <td className="TD">{todo.create_date}</td>
            <td className="TD">{todo.updated_date}</td>
            <td className="TD">{todo.is_active.toString()}</td>
            <td className="TD">
                <button onClick={() => deleteToDo(todo.id)} type="button">SetACTIVE</button>
            </td>


        </tr>
    )
}

const ToDoList = ({todos, users, projects, deleteToDo}) => {
    return (
        <div>
            <table className="TABLE">
                <tr>
                    <th className="TH">ID</th>
                    <th className="TH">Project</th>
                    <th className="TH">Text</th>
                    <th className="TH">User</th>
                    <th className="TH">Create date</th>
                    <th className="TH">Updated date</th>
                    <th className="TH">IsActive</th>
                    <th className="TH"> SetActive</th>
                </tr>
                {todos.map((todo) => <ToDoItem todo={todo} users={users} projects={projects} deleteToDo={deleteToDo}/>)}
            </table>
            <div className="Link_array">
                <Link to='/todo/create'>Create ToDo</Link>
            </div>
        </div>
    )
}

export default ToDoList;
