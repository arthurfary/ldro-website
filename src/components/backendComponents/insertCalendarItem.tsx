import { useState } from "react";

interface CalendarItemObj {
  date: Date;
  description: string;
  name: string;
  venue: string; // nome do lugar
  location: string; // endereço
}

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

  const handleConfirmation = (confirmed: boolean) => {
    setShowConfirmationPopup(false);

    if (confirmed) {
      // Send data to the database (replace with your actual logic)
      console.log("Calendar item data:", calendarItem);

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
        <div className="confirmationPopup">
          <p>Send to database?</p>
          <button onClick={() => handleConfirmation(true)}>Sim</button>
          <button onClick={() => handleConfirmation(false)}>Não</button>
        </div>
      )}
    </div>
  );
};

export default InsertCalendarItem;

