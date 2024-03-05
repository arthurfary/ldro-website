import styled from "styled-components"
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient"

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
interface ScheduleItem {
        date: Date;
        description: string;
        name: string;
        venue: string; // nome do lugar
        location: string, // endereço
}


function Calendar() {
  const [dates, setDates] = useState<ScheduleItem[]>([])
  const [fetchError, setFetchError] = useState<any>(null)

  useEffect(() => {
    const fetchDates = async () => {
      const {data, error} = await supabase
      .from('calendar')
      .select() //select all

      if (error) {
        setFetchError('Could not fetch dates')
        console.log(error)
        setDates([])
      }
      if (data) {
        setDates(data)
        setFetchError(null)
      }
    }

    return () => {
      fetchDates()
    }
  }, [])
   // Function to convert a datetime object to days and months (helper function)
  const datetimeToDaysMonths = (dt: Date) => {
    return { day: dt.getDate(), month: dt.getMonth() + 1 }; // Months are 0-indexed, so add 1
  };

  // const dates: ScheduleItem[] = [];
  // dates.push(
  //   {
  //       "date": new Date(Date.now()),
  //       "description": "a melhor corrida de pien",
  //       "name": "corrida de cavalo v8",
  //       "venue": "fazenda do leandro",
  //       "location": "piên"
  //   })
  //

  const scheduleItems = dates.map((item: ScheduleItem)=> {
    // Extract day and month for formatted display
    // const { day, month } = datetimeToDaysMonths(item.date);

    return (
      <CalendarItem>
        <p>
          <b>Data:</b> {item.date.toLocaleDateString()}
        </p>

        <p>
          <b>Nome:</b> {item.name} - <b>{item.venue}</b>, {item.location}
        </p>

        <p>
          <b>Descrição:</b> {item.description}
        </p> 
      </CalendarItem>
    );
  });

  return (
    <div>
      {true && ( // Check for items
        <CalendarBg>
          {fetchError && <p>{fetchError}</p>}
          {scheduleItems}
        </CalendarBg>
      )}
      test
    </div>
  );
}

export default Calendar;
