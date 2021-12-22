import {Link, useParams} from "react-router-dom";
import React from "react";
import projects from "./projects";


const ProjectItem = ({project, users, todos}) => {
    let todosfilterID = todos.filter(todo => todo.project == project.id)
    return (
            <tr className="table">
                <td className="TD">{project.id}</td>
                <td className="TD">{project.name}</td>
                <td className="TD">
                    {project.users.map((userID) => {
                        return users.find((user) => user.id == userID).user_name
                    }).join(', ')}
                </td>
                <td className="TD">
                    {/*{todos.map((todo) =>{return todos.find((todo) => todo.project == todoes).id}).join(', ')}*/}
                    {/*{todos.(todo => todo.project == project.id).id}*/}
                    {/*{todos.id.map((todoex) =>{return todos.find((todo) => todo.project == project.id).id}).join(', ')}*/}
                    {/*{todos.find((todo) => todo.project == project.id).id}*/}
                    {todosfilterID.map((todofilterID) => {
                        return todofilterID.id
                    }).join(', ')}
                </td>

            </tr>




    )
}

const ProjectListUser = ({projects, users, todos}) => {

    let {id} = useParams();
    // console.log(id)
    let filtered_items = projects.filter((project) => project.id == id)


    return (
        <div>
            <table className="TABLE">
                <th className="TH">Id</th>
                <th className="TH">Name</th>
                <th className="TH">User</th>
                <th className="TH">ToDo</th>
                {filtered_items.map((project) => < ProjectItem project={project} users={users} todos={todos}/>)}
            </table>
            {/*<div className="Link_array">*/}
            {/*    <Link to={`/projects/${id}/update`}>Update Project</Link>*/}
            {/*</div>*/}
        </div>
    )


}


export default ProjectListUser