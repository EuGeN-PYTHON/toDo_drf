import React from "react";
import {useParams} from "react-router-dom";

class UpProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', users: [], id: 0}
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // handleUsersChange(event) {
    //     if (!event.target.sectedOptions) {
    //         this.setState({
    //             'users': []
    //         })
    //         return;
    //     }
    //     let users = []
    //     for (let i = 0; i < event.target.selectedOptions.length; i++) {
    //         users.push(event.target.selectedOptions.item(i).value)
    //     }
    //     this.setState({
    //         'users': users
    //     })
    // }

    handleUsersChange(event) {
        // const {id} = useParams();
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        // UseID()
        this.setState({
            'users': users,

        })

    }


    handleSubmit(event) {

        // console.log(this.state.name + ' ' + this.state.users + ' id =  ' + this.state.id)
        this.props.updateProject(this.state.name, this.state.users, this.state.id)
        event.preventDefault();
    }

    render() {
        return (
            <div className="Form_input">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="name">name</label>
                        <input type="text" className="form-control" name="name" placeholder="name"
                               value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="id">ID</label>
                        <select className="form-control" name="id"
                                onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) =>
                                <option value={item.id}>{item.name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="users">users</label>
                        {/*<input type="number" className="form-control" name="users" placeholder="users"*/}
                        {/*       value={this.state.users} onChange={(event) => this.handleChange(event)}/>*/}
                        {/*<select className="form-control" name="users"*/}
                        {/*        onChange={(event) => this.handleUsersChange(event)}>*/}
                        {/*    {this.props.users.map((item) =>*/}
                        {/*        <option value={item.id}>{item.user_name}</option>)}*/}
                        {/*</select>*/}
                        <select name="users" multiple onChange={(event) => this.handleUsersChange(event)}>
                            {this.props.users.map((item) => <option value={item.id}>{item.user_name}</option>)}
                        </select>


                    </div>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
            </div>
        );
    }
}

// const UseID = () => {
//     const params = useParams();
//     const current = params.id
//     this.setState({
//         'id': Number(current)
//     })
// }


export default UpProjectForm