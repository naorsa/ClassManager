import React, { Component } from 'react';
import {TextField, Button, Checkbox} from '@material-ui/core';
import '../App.css';

/* Add user page component*/

export default class Login extends Component {

    state = {
        id: '',
        firstName: '',
        lastName: '',
        age:'',
        email:'',
        permission: 1
    };

    /* Function for text field if user wrote in the text field */
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    /* Function for check box if user press on him and make the user teacher */
    handleCheckBoxChange = e => {
        /* Checks if user is teacher */
        if(e.target.checked === true){
            this.setState({
                permission: 2
            });
        }

        /*  if user is not a teacher */
        else {
            this.setState({
                permission: 1
            });
        }
    }

    /* Function that works when user press on the button */
    handleOnSubmit = e => {
        const sendedJson = this.state;
        fetch("http://localhost:53048/api/User/Add", {
        method: "POST",
        body: JSON.stringify(sendedJson)
        })
    }

    /* Render function for add user component */
    render(){
        return(
            <div className="Login">
                <TextField
                name='id'
                id="standard-name"
                label="ID"
                value={this.state.id}
                onChange={this.handleChange}
                margin="normal"
                />
                <TextField
                name='firstName'
                id="standard-name"
                label="First Name"
                value={this.state.firstName}
                onChange={this.handleChange}
                margin="normal"
                />
                <br />
                <br />
                <TextField
                id="lastName"
                name='lastName'
                label="Last Name"
                value={this.state.lastName}
                onChange={this.handleChange}
                margin="normal"
                />
                <br />
                <br />
                <TextField
                id="age"
                name="age"
                label="Age"
                value={this.state.age}
                onChange={this.handleChange}
                margin="normal"
                />
                <br />
                <br />
                <TextField
                id="email"
                name="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
                />
                <br />
                <br />
                <Checkbox value="Teacher" onChange={e => this.handleCheckBoxChange(e)}/>
				<label>Teacher</label>
                <br />
                <br />
                <Button variant="contained" color="primary" onClick={e => this.handleOnSubmit(e)}>Add</Button>
            </div>
        );
    }
}
