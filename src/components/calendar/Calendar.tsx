import styled from "styled-components"
import { useState } from "react";


const CalendarBg = styled.div`
    background-color: red;
    min-width: 300px;    
    min-height: 300px;
`

const CalendarItem = styled.div`
  display: flex;
  flex-direction: column;
   
  background-color: #fcfcfc;
  width: 100%;
  height: fit-content;


`

function Calendar() {
   // Function to convert a datetime object to days and months (helper function)
  const datetimeToDaysMonths = (dt: Date) => {
    return { day: dt.getDate(), month: dt.getMonth() + 1 }; // Months are 0-indexed, so add 1
  };

  interface ScheduleItem {
        date: Date;
        description: string;
        name: string;
        place: string
    }

  const dates: ScheduleItem[] = [];
  dates.push(
    {
        "date": new Date(Date.now()),
        "description": "teste",
        "name": "nome do evento",
        "place": "lugar" 
    })


  const scheduleItems = dates.map((item: ScheduleItem)=> {
    // Extract day and month for formatted display
    // const { day, month } = datetimeToDaysMonths(item.date);

    return (
      <CalendarItem>
        <p>
          <b>Data:</b> {item.date.toLocaleDateString()}
        </p>

        <p>
          <b>Nome:</b> {item.name} - <b>{item.place}</b> 
        </p>

        <p>
          <b>Descrição:</b> {item.description}
        </p> 
      </CalendarItem>
    );
  });

  return (
    <div>
        {/* UI elements to control start date and number of days (optional) */}
        <CalendarBg>        
        {scheduleItems}
        </CalendarBg>
    </div>
  );
}

export default Calendar;
