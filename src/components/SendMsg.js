import React, { Component } from "react";
import MenuItem from '@material-ui/core/MenuItem'; 
import Button from '@material-ui/core/Button'; 
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

export default class SendMsg extends Component{
    constructor(props) {
        super(props);
        this.state ={
            fetchDone : false,
            }
    }
    saveCourses = (courses) => {
        this.setState({ courses: courses })
      }
      handleChange = name => event => {
        this.setState({ [name]: event.target.value });
      };
      sendMsg = ()=>{
        fetch('http://localhost:50414/Msg/'+this.state.course+'/'+this.state.message)
        .then(function(response) {
              return response.json();
            }).then(data => {
              var obj = JSON.parse(data)
              this.setState({courses:obj, fetchDone:"true"})
              });
      };
      componentDidMount(){
        fetch('http://localhost:50414/Course/')
        .then(function(response) {
              return response.json();
            }).then(data => {
              var obj = JSON.parse(data)
              this.setState({courses:obj, fetchDone:"true"})
              
              });
      }
    render(){
        
        return(
          <div>
    <h1>sadasd</h1>
          <Select             
            value={this.state.course}
            onChange={this.handleChange('course')}
>
          {
            this.state.fetchDone === "true"&&this.state.courses.map((el,i) => (el.name!=""&&<MenuItem value={el.id}>{el.name}</MenuItem>))
          }
          </Select> 
          <br></br>
          <TextField
            id="Course-name"
            label="message"
            value={this.state.message}
            onChange={this.handleChange('message')}
            margin="normal"
          />
          <br></br>
          <Button variant="contained" color="primary" onClick={this.sendMsg}>
            send
          </Button>

          
          
        </div>);
        
		}
    }
