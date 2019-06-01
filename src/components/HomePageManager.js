import React from 'react';
import MenuAppBar from './MenuAppBar';
import AddNewClasses from './AddNewClasses';
import Login from './Login'
import Courses from './Courses';
import SendMsg from './SendMsg';
class Home extends React.Component {
    state={
        selected:"",
    }
    handleChose = (event)=> {
        this.setState({selected:event.target.id});
    }

    render(){
        return(
            <div>
                
                <MenuAppBar saveChosen = {this.handleChose}/>
                {
                    (() => {
        switch(this.state.selected) {
          case 'a':
            return <AddNewClasses />;
          case 'b':
            return <Login />;
          case 'c':
            return <Courses />
          case 'd':
            return <SendMsg />
          default:
            return Home;
        }
      })()
                }
            </div>
        );
    }
 
}
export default Home;