import styled from "styled-components";
import supabase from "../../config/supabaseClient";
import { useState, useEffect } from "react";

interface ScheduleItem {
  id: number;
  date: Date;
  description: string;
  name: string;
  venue: string; // nome do lugar
  location: string, // endereço
}

const DateRow = styled.div`
display: grid;
grid-template-columns: 1fr 2fr 2fr 3fr 3fr 3fr 1fr;
grid-template-rows: 1fr;

width: 100%;
background: #00F;
justify-content: space-evenly;
`

const RowCreator = ({ id, date, name, description, venue, location }: ScheduleItem) => {
  return (
    <DateRow>
      <p>{id}</p>
      <p>{date.toString()}</p>
      <p>{name}</p>
      <p>{description}</p>
      <p>{venue}</p>
      <p>{location}</p>
      <a>editar</a>
    </DateRow>
  )
}

const EditCalendarItem = () => {

  const [dates, setDates] = useState<ScheduleItem[]>([])
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchDates = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('calendar')
        .select() //select all

      if (error) {
        setFetchError(true)
        console.log(error)
        setDates([])
      }
      if (data) {
        setDates(data)
        setFetchError(false)
      }

      setLoading(false)
    }

    return () => {
      fetchDates()
    }
  }, [])


  return (
    <div>
      {dates &&
        dates.map((date) => (
          <RowCreator
            id={date.id}
            date={date.date}
            name={date.name}
            description={date.description}
            venue={date.venue}
            location={date.location}
          />
        ))
      }
    </div>
  )
}

export default EditCalendarItem;
