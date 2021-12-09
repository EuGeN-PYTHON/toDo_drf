import React from 'react';
import App from "../App";


const ToDoItem = ({todo, users, projects}) => {
    // let {project_name} = projects.find((project) => project.id == todo.project).name
    // let {user_name} = users.find((user) => user.id == todo.create_user).user_name
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


        </tr>
    )
}

const ToDoList = ({todos, users, projects}) => {
    return (
        <table className="TABLE">
            <th className="TH">ID</th>
            <th className="TH">Project</th>
            <th className="TH">Text</th>
            <th className="TH">User</th>
            <th className="TH">Create date</th>
            <th className="TH">Updated date</th>
            {todos.map((todo) => <ToDoItem todo={todo} users={users} projects={projects}/>)}
        </table>
    )
}

export default ToDoList;
