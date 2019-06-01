import React, { Component } from 'react';
import {TextField, Button, Checkbox, Grid, Paper} from '@material-ui/core';
import '../App.css';
import HomePageManager from './HomePageManager';
import AddUser from './AddUser';
import ForgotPassword from './ForgotPassword';
import { OverrideMaterialUICss } from "override-material-ui-css"

const ButtonStyle = {
	position: "fixed;",
	left: "0;",
	bottom: "0;",
	width: "100%;",
	textalign: "center;"
  };

  const forgotStyle = {
	color: "#92badd;",
  	display: "inline-block;",
  	textdecoration: "none;",
  	fontweight: "400;"
  };

  const headerStyle = {
	textalign: "center;",
	fontsize: "16px;",
	fontweight: "600;",
	texttransform: "uppercase;",
	display: "inline-block;",
	margin: "40px 8px 10px 8px;", 
	color: "#cccccc;"
  };




/* Login page component*/

export default class Login extends Component {

	/* Constructor for login component */
	constructor () {
		super();
		this.state = {
			id: '',
			password: '',
			permission: '',
			route: 'login'
		};
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	 }


	 
	/* Get from local storage before page load */ 
	componentWillMount(){
		localStorage.getItem('id') && this.setState({
			id: JSON.parse(localStorage.getItem('id'))
		})
		localStorage.getItem('password') && this.setState({
			password: JSON.parse(localStorage.getItem('password'))
		})
	}

	/* Function for check box if user press on him and save the user, pasword to the local storage */
	handleCheckBoxChange = e => {
		if(e.target.checked === true){
			localStorage.setItem('id', JSON.stringify(this.state.id));
			localStorage.setItem('password', JSON.stringify(this.state.password));
		}
	}


	/* Function for text field if user wrote in the text field */
	handleTextFieldchange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	/* Function that works when user press on the button */
	handleOnSubmit = e => {
		fetch('http://localhost:53048/api/User/'+this.state.id+'/'+this.state.password)
  		.then(function(response) {
    			return response.json();
  			}).then(data => {
				var obj = JSON.parse(data)
				this.setState({
						permission: obj.permission
				});
		});

		/* Check if user is a student */
		if(this.state.permission === 1){
			this.setState({
				route: 'home'
			});
		}
		/* Check if user does not exist */
    	if(this.state.permission === 0){
    		this.setState({
				id: '',
		 		password: '',
		 		permission: 0
			});
    	 	alert("User does not exist");
		}
	}

	/* Function for button if user press on the forgot your password button */
	handleOnForgot = e => {
		this.setState({
			route: 'forgot'
		});
	}

	/* Render function for login component */
	render(){
		return (
			<div className="Login">
			{
				this.state.route === "home"
				?<AddUser />
				: (
						this.state.route === "login"
						
						?<Paper>
						<form onSubmit={this.handleSubmit}>
						<Grid
						container
						direction="column"
						justify="space-evenly"
						alignItems="center"
						>
						<h1 style={headerStyle}>Login Page</h1>
						<TextField
						name="id"
						value={this.state.id}
						onChange={e => this.handleTextFieldchange(e)}
						id="standard-dense"
						label="ID"
						margin="dense"
						/>
						<br />
						<br />
						<TextField
						name="password"
						id="standard-password-input"
						label="Password"
						value={this.state.password}
						onChange={e => this.handleTextFieldchange(e)}
						type="password"
						autoComplete="current-password"
						margin="normal"
						/>
						<br />
						<br />
						<Button variant="contained" color="primary" onClick={e => this.handleOnSubmit(e)}>Login</Button>
						<br />
						<Grid
						container
						direction="row"
						justify="center"
						alignItems="center"
						>
						<Checkbox value="Remember Me" onChange={e => this.handleCheckBoxChange(e)}/>
						<label>Remember Me</label>
						</Grid>
						<br />
							<Button style={forgotStyle} onClick={e => this.handleOnForgot(e)} href="">Forget Your Password?</Button>
						</Grid>
						</form>
						</Paper>
						:<ForgotPassword />
					)
			}
			</div>
		);
	}
}