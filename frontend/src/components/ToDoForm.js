import React from "react";

class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: '', text: '', create_user: ''}
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        console.log(this.state.project + ' ' + this.state.text + ' ' + this.state.create_user)
        this.props.createToDo(this.state.project, this.state.text ,this.state.create_user)
        event.preventDefault();
    }

    render() {
        return (
            <div className="Form_input">
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label for="project">project</label>
                        <select className="form-control" name="project"
                               onChange={(event) => this.handleChange(event)}>
                            {this.props.projects.map((item) =>
                            <option value={item.id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">text</label>
                        <input type="text" className="form-control" name="text" placeholder="text"
                               value={this.state.name} onChange={(event) => this.handleChange(event)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="create_user">create_user</label>
                        <select className="form-control" name="create_user"
                               onChange={(event) => this.handleChange(event)}>
                            {this.props.users.map((item) =>
                            <option value={item.id}>{item.user_name}</option>)}
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Save"/>
                </form>
            </div>
        );
    }
}

export default ToDoForm