import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import './main.scss' // webpack must be configured to do this

export default class DemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: null,
      finalEvents: null
    };
  }
  componentDidMount() {
    fetch("http://192.168.121.228:60015/api/placement_and_internship/calendar/?format=json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.results.items
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      )
      if(this.state.items)
      {
          var finalEvents=null;
          this.state.items.forEach(element => {

            finalEvents.push({
              title:element.title,
              start: element.startTime,
              
              allDay: false,
              color:'red',
              textColor:'black'

            })
          });
          this.setState({
            
            finalEvents:finalEvents
          });
      }


  }


  calendarRef = React.createRef()
  render() {

    return (
      <FullCalendar defaultView="dayGridMonth" 
      ref={this.calendarRef}
      weekends={true}
      events={this.state.finalEvents}
       aspectRatio = '1.195'
      
      plugins={[ dayGridPlugin, timeGridPlugin ,listPlugin , bootstrapPlugin]}
      header={{
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
      }}
      />
    )
  }
  someMethod() {
    let calendarApi = this.calendarRef.current.getApi()
    calendarApi.next()
  }
}
