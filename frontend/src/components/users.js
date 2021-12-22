import React from 'react';
import App from "../App";


const UserItem = ({user}) => {
    return (
        <tr className="table">
             <td className="TD">{user.id}</td>
            <td className="TD">{user.user_name}</td>
            <td className="TD">{user.first_name}</td>
            <td className="TD">{user.last_name}</td>
            <td className="TD">{user.email}</td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table className="TABLE">
            <th className="TH"> ID</th>
            <th className="TH"> User name</th>
            <th className="TH"> First name</th>
            <th className="TH"> Last name</th>
            <th className="TH"> Email</th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList;
