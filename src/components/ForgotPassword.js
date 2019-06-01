import React, { Component } from 'react';
import {TextField, Button, Grid} from '@material-ui/core';
import '../App.css';
import Login from './Login';

/* Forgot password component*/

export default class ForgotPassword extends Component {

	state = {
        email: '',
        route: 'forget',
    };

    /* Function that works when user press on the button */
	HnadleOnSubmit = e => {
        fetch('http://localhost:53048/api/User/' +this.state.email + '/forget')
  		.then(function(response) {
    			return response.json();
        });
        this.setState({
            route: 'login'
        });
        
    }

     /* Function that works when user writes on the text box */
    HandleOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
    render(){
		return (
			<div className="Login">
                <div>
                    {
                        this.state.route === 'login'
                        ?<Login />
                    :<Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    >
                        <TextField
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        margin="normal"
                        variant="outlined"
                        value={this.state.email}
						onChange={e => this.HandleOnChange(e)}
                        />
                        <Button 
                        variant="contained" 
                        color="primary"
                        onClick={e => this.HnadleOnSubmit(e)} 
                        >
                        Send
                        </Button>
                    </Grid>
                    }
                </div>
            </div>
        )
    }


}