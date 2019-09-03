/*timeline component using visjs timeline */
import React from 'react';
import Timeline from 'react-visjs-timeline'
import classes from './timelineStyles.css';
import vis from 'vis'
import ErrorBoundary from './ErrorBoundary'

// http://visjs.org/docs/timeline/#Configuration_Options
const options = {
  width: '100%',
  minHeight: '200px',

  showCurrentTime:false,//dont show a vertical bar at the current time

  //utc timezone
  moment: function(date) {
    return vis.moment(date).utc();
  },
}


function TimeLine(props) {

  return (
    <div className={classes} style={{padding:30}}>


      <ErrorBoundary>
      <Timeline options={options} items={props.timeLineItems}/>
      </ErrorBoundary>

    </div>
  )

}

export default TimeLine;
