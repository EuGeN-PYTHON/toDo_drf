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

const ProjectItem = ({project, users, deleteProject}) => {
    return (
        <tr className="table">
            <td className="TD">{project.id}</td>
            <td className="TD">
                <Link to={`/projects/${project.id}`}> {project.name} </Link>
            </td>
            <td className="TD">
                {project.users.map((userID) => {
                    return users.find((user) => user.id == userID).user_name
                }).join(', ')}
            </td>
            <td className="TD">
                <button onClick={() => deleteProject(project.id)} type="button">DELETE</button>
            </td>
        </tr>
    )
}

const ProjectList = (
    {
        projects, users, deleteProject
    }
) => {
    return (
        <div>
            <table className="TABLE">
                <tr>
                    <th className="TH"> ID</th>
                    <th className="TH"> Name</th>
                    <th className="TH"> Users</th>
                    <th className="TH"> Delete</th>
                </tr>
                {projects.map((project) => <ProjectItem project={project} users={users}
                                                        deleteProject={deleteProject}/>)}
            </table>
            <div className="Link_array">
                {/*{projects.map((project) => <ProjectItem project={project} users={users}*/}
                {/*                                        deleteProject={deleteProject}/>)}*/}
                <Link to='/projects/create'>Create Project</Link>
                {/*<Link to={`/projects/update`}>Update Project</Link>*/}
            </div>
            <div className="Link_array">
                <Link to={`/projects/update`}>Update Project</Link>
            </div>
        </div>
    )
}

export default ProjectList;
