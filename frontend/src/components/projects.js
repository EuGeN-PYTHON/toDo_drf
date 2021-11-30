import React from 'react';
import App from "../App";
import users from "./users";
import {Link} from "react-router-dom";

//
// const UserItem = ({user}) => {
//     return (
//
//     )
// }

const ProjectItem = ({project, users}) => {
    return (
        <tr className="table">
            <td className="TD">{project.id}</td>
            <td className="TD">
                <Link to={`/projects/${project.id}`}> {project.name} </Link>
            </td>
            <td className="TD">
                {project.users.map((userID) => {
                    return users.find((user) => user.id == userID).user_name}).join(', ')}
            </td>
        </tr>
    )
}

const ProjectList = (
    {
        projects, users
    }
) => {
    return (
        <table className="TABLE">
            <th className="TH"> ID</th>
            <th className="TH"> Name</th>
            <th className="TH"> Users</th>
            {projects.map((project) => <ProjectItem project={project} users={users}/>)}
        </table>
    )
}

export default ProjectList;
