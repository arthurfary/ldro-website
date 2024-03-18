import { useState } from "react";
import supabase from "../../config/supabaseClient";
import styled from "styled-components";

interface CalendarItemObj {
  date: Date;
  description: string;
  name: string;
  venue: string; // nome do lugar
  location: string; // endereço
}

const PopUp = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
    align-self: center;

`


const InsertCalendarItem = () => {
  const [calendarItem, setCalendarItem] = useState<CalendarItemObj>({
    date: new Date(), // Initialize with today's date
    description: "",
    name: "",
    venue: "",
    location: "",
  });

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCalendarItem({ ...calendarItem, [event.target.name]: event.target.value });
    console.log(calendarItem)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate date (greater than today)
    if (new Date(calendarItem.date) <= new Date()) {
      alert("Please select a date in the future.");
      return;
    }

    // Show confirmation popup
    setShowConfirmationPopup(true);
  };

  const handleConfirmation = async (confirmed: boolean) => {
    setShowConfirmationPopup(false);

    if (confirmed) {
      // Send data to the database (replace with your actual logic)
      const { error } = await supabase
        .from('calendar')
        .insert({ ...calendarItem })

      console.log(error) // handle error

      // Clear form after successful submission (optional)
      setCalendarItem({
        date: new Date(),
        description: "",
        name: "",
        venue: "",
        location: "",
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={calendarItem.date.toString()}
          onChange={handleChange}
          required // Mark as required
        />
        <label htmlFor="description">Descrição:</label>
        <textarea id="description" name="description" value={calendarItem.description} onChange={handleChange} />

        <label htmlFor="name">Nome:</label>
        <input type="text" id="name" name="name" value={calendarItem.name} onChange={handleChange} required />

        <label htmlFor="venue">Nome do lugar:</label>
        <input type="text" id="venue" name="venue" value={calendarItem.venue} onChange={handleChange} required />

        <label htmlFor="location">Localização:</label>
        <input type="text" id="location" name="location" value={calendarItem.location} onChange={handleChange} required />

        <button type="submit">Enviar</button>
      </form>

      {showConfirmationPopup && (
        <PopUp>
          <p>Send to database?</p>
          <button onClick={() => handleConfirmation(true)}>Sim</button>
          <button onClick={() => handleConfirmation(false)}>Não</button>
        </PopUp>
      )}
    </div>
  );
};

export default InsertCalendarItem;

