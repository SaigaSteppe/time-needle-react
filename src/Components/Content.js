import React, { Component } from 'react';
import TableInput from "./TableInput"
import TimeLine from "./TimeLine"
import AdvancedOptions from "./AdvancedOptions"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button'
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"


let fileReader
var moment = require('moment');

class Content extends Component {

  state = {
    rows: [{ date: '2000-01-01', event: 'Beginning of the 21st century' }], //table row user input data
    timeLineItems: [], //formatted data to draw timeline

    pressedCreateTimeLine: false, //used to recenter the displayed timeline when updated
  };

  componentDidMount(){

    //get local date/time
    let localDate = moment().format('YYYY-MM-DD');

    //initialise the table row when loaded
    this.setState({
      rows: [
        { date: '2000-01-01', event:'Beginning of the 21st century'},
        { date: localDate.toString(), event: 'Today' }],

    })
  }

  //edit input fields
  handleChange = idx => e => {
    const { name, value } = e.target;

    let newState = Object.assign({}, this.state);
    newState.rows[idx][name] = value;
    this.setState(newState);
  };


  //add an empty row entry to the table input 
  handleAddEmptyRow = () =>{
    let item = {
      date: '',
      event: ''
    };

  this.setState({
    rows: [...this.state.rows, item]
  });
}

//add a row entry to the table input 
handleAddRow = (dateParam, eventParam) => {
  let item = {
     date: dateParam,
     event: eventParam
   };

 this.setState({
   rows: [...this.state.rows, item]
 });
}

  //remove specific row in the table
  handleRemoveSpecificRow = (idx) => () => {
    const rows = [...this.state.rows]
    rows.splice(idx, 1)
    this.setState({ rows })
  }

  //format the data for creating a timeline using visjs timeline
  handleCreateTimeline = () => {
    this.setState({ timeLineItems: [] })
    this.changePressedCreateTimeLine()

    for (let i = 0; i < this.state.rows.length; i++) {

      //include whole date input in timeline label, if input is not in YYYY-MM-DD format
      let displayLabelDate = this.state.rows[i].date

      //include only the year in timeline label, if input is in YYYY-MM-DD format
      if (this.state.rows[i].date.includes('-')) {
        displayLabelDate = this.state.rows[i].date.substring(0, this.state.rows[i].date.indexOf("-"))
      }


      let item = {
        start: this.state.rows[i].date,
        content: '<small>' + displayLabelDate + '</small><br>' + this.state.rows[i].event //timeline label: small text with date, new line with event
      }

      this.setState(prevState => ({
        timeLineItems: [...prevState.timeLineItems, item]
      }))
    }

  }

  //used to recenter the displayed timeline when updated
  changePressedCreateTimeLine = () => {

    this.setState(prevState => ({
      pressedCreateTimeLine: !prevState.pressedCreateTimeLine
    }));

  }


  //read file selected
  handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead;
    fileReader.readAsText(file);
  }

  //Read file content and add data to the timeline array
  handleFileRead = (e) => {
    const content = fileReader.result;

    let contentItem = content.split(/\r\n|\r|\n/) //split file by lines
    
    this.setState({rows:[]}) //clear array
    
    //add timeline items from file
   for(let i=1; i< contentItem.length; i++){
     let contentDate = contentItem[i].substring(0, contentItem[i].indexOf(","))//get date from string
    contentDate = contentDate.replace(/"/g, '')  //remove double quotes

     let contentEvent = contentItem[i].split(',').pop()//get event from string
     contentEvent = contentEvent.replace(/"/g, '')  //remove double quotes

     this.handleAddRow(contentDate, contentEvent)
   }

  }

  render() {

    return (
      <div style={{ marginTop: 100 }}>

        <Grid container spacing={16} justify="center">
        <Grid item xs>

        <AdvancedOptions
          handleFileChosen = {this.handleFileChosen}
          rows = {this.state.rows}
        />

        </Grid>

          <Grid item xs={6} >

            <TableInput
              rows={this.state.rows}
              handleChange={this.handleChange}
              handleRemoveSpecificRow={this.handleRemoveSpecificRow}
            />
            <div style={{ marginTop: 20 }} />
            <Fab color="primary" onClick={this.handleAddEmptyRow} style={{ float: 'right' }}>
              <AddIcon />
            </Fab>
          </Grid>

          <Grid item xs>
            <Button
              onClick={this.handleCreateTimeline}
              variant="contained" color="secondary"
            >
              Create timeline
            </Button>

          </Grid>

        </Grid>

        {/*display visjs timeline*/}
        <div style={{ marginBottom: 30, float: 'center' }}>

          {this.state.pressedCreateTimeLine &&
            <TimeLine
              timeLineItems={this.state.timeLineItems}
              rows={this.state.rows}
            />}

          {!this.state.pressedCreateTimeLine &&
            <TimeLine
              timeLineItems={this.state.timeLineItems}
            />}

        </div>
      </div>
    )
  }
}

export default Content