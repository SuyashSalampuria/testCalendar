import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import './App.css'

import './main.scss' // webpack must be configured to do this

export default class DemoApp extends React.Component {
  calendarRef = React.createRef()
  render() {
    return (
      <FullCalendar defaultView="dayGridMonth" 
      ref={this.calendarRef}
      weekends={true}
      events={[
        { title: '1st test', date: '2019-08-01' },
        { title: '2nd test', date: '2019-08-01',textColor:'white', backgroundColor:'red' }
      ]}
       aspectRatio = '2'
      
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
