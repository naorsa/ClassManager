import React from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from './Autocomplete'
import MenuItem from '@material-ui/core/MenuItem'; 
import Button from '@material-ui/core/Button'; 
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

const style = {
  position: "fixed;",
  left: "0;",
  bottom: "0;",
  width: "100%;",
  textalign: "center;"
};

class AddNewClasses extends React.Component {
  state = {
    days: [{ day: "", hour: "07:30" }],
    constDays: ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
    prevDays:[],
    lastDay:0
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  saveTeacherName = (teacherName) => {
    this.setState({ teacherName: teacherName })
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addDay = (e) => {
    this.setState((prevState) => ({
      days: [...prevState.days, { day: "", hour: "07:30" }],
      prevDays: [...prevState.prevDays, this.state.lastDay]
    }));
    
  }
  removeDay=()=>{
    let newDays = this.state.days;
    newDays.pop();
    this.setState({ days: newDays });
  }

  handleSubmit(val,event) {
    const sendedJson = this.state;
    fetch("http://localhost:50414/Course", {
        method: "POST",
        body: JSON.stringify(sendedJson)
    })
    .then(function(response) {
      if(response.ok){
        console.log(response);
        return response.json();
    }{
        throw new Error("Post Failed")
    }
}).then(function(responseBody){
    console.log(responseBody)
})
.catch(function(error) {
    console.log("Request failed", error);
});
window.open('/login');
}

  handleDay = idx => event => {
    const daysString = this.state.constDays.slice();
    const newDays = this.state.days.slice();
    newDays[idx.idx].day = daysString[event.target.value];
    this.setState({ days: newDays });
    let selectedDays = this.state.prevDays.slice();
    if(idx.idx===0){
      selectedDays[0]=event.target.value;
    }
    else{
      selectedDays[idx.idx]= event.target.value;
  
    }
    this.setState({prevDays: selectedDays});

  }

  saveTime = idx => event => {
    const newDays = this.state.days.slice();
    newDays[idx.idx].hour = event.target.value;
    console.log(newDays);
  }

  render() {
    return (
      
      <div>
        <form>
          <Grid container spacing={24} alignContent = "space-around">
          <Grid xs></Grid>
          <Grid
            xs={6} 
            direction="column"
            justify="center"
            alignItems="center">     
          <Paper> 
              <h1 align="center">Add new course</h1>
          </Paper>
          </Grid>
          <Grid xs></Grid>

          </Grid>
       
          <Paper>
          <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          >

          <TextField
            required
            id="Course-name"
            label="Course Name"
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <Autocomplete
            suggestions={["a","b","c"
            ]} saveInParent={this.saveTeacherName}
          />

          <TextField
            required
            id="price"
            label="price"
            value={this.state.id}
            onChange={this.handleChange('price')}
            margin="normal"
          />          
          <TextField
          id="outlined-multiline-flexible"
          label="details"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={this.handleChange('details')}
          margin="normal"
          helperText="Enter short details"
          variant="outlined"
        />
          </Grid>
          </Paper>
          {
            this.state.days.map((val, idx) => {
              return (
                <div>
                  <br/>
                  <Paper>
                  <Grid container spacing={24}>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={2}>
                  <FormControl>
                    <Select
                      value = {this.state.prevDays[idx]}
                      onChange={this.handleDay({ idx })}
                      inputProps={{
                        name: "day",
                        id: 'day',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={0}>Sunday</MenuItem>
                      <MenuItem value={1}>Monday</MenuItem>
                      <MenuItem value={2}>Tuesday</MenuItem>
                      <MenuItem value={3}>Wednesday</MenuItem>
                      <MenuItem value={4}>Thursday</MenuItem>
                    </Select> 
                  </FormControl>
                  </Grid>

                  <Grid item xs={4}>
                  <TextField
                    onChange ={this.saveTime({idx})}
                    id="time"
                    label="meeting hour"
                    type="time"
                    defaultValue="07:30"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                  />
                  </Grid>
                  </Grid>
                  </Paper>
                </div>
              )
            })
          }
            <Grid container spacing={24} alignItems="center" >
            <Grid item xs={5}></Grid>
            <Grid item xs={4}>
          <Fab color="primary" aria-label="Add" onClick={this.addDay}>
            <AddIcon />
          </Fab>
          <Fab color="primary" aria-label="Add" onClick = {this.removeDay}>
            <DeleteIcon />
          </Fab>

          </Grid>
          </Grid>
          <br/><br /><br/>
          <Grid container spacing={24} alignItems="center" >
          <Grid item xs={5}></Grid>
          <Button  variant="contained"
           color="primary" 
           onClick={() => { if (window.confirm('Are you sure?')) this.handleSubmit()}}
            style={style}> 
            send
          </Button>
          </Grid>
        </form>
      </div>
      
    );
  }
}

export default AddNewClasses;

