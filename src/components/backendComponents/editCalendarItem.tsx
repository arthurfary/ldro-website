import { useState, ChangeEvent, FormEvent } from "react";
import { CalendarItemType } from "../calendar/calendarItemInterface";
import supabase from "../../config/supabaseClient";
import styled from "styled-components";

const PopUp = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
`;

const EditForm = styled.form`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
`;

interface EditCalendarItemProps extends CalendarItemType {
    setOpenEdit: (open: boolean) => void;
}

const EditCalendarItem: React.FC<EditCalendarItemProps> = ({
    id,
    date,
    name,
    description,
    venue,
    location,
    setOpenEdit,
}) => {
    const [calendarItem, setCalendarItem] = useState<CalendarItemType>({
        date,
        name,
        description,
        venue,
        location,
    });
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCalendarItem({
            ...calendarItem,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (new Date(calendarItem.date) <= new Date()) {
            alert("Please select a date in the future.");
            return;
        }
        setShowConfirmationPopup(true);
    };

    const handleConfirmation = async (confirmed: boolean) => {
        setShowConfirmationPopup(false);
        if (confirmed) {
            const { error } = await supabase
                .from("calendar")
                .update(calendarItem)
                .eq("id", id);
            if (error) console.error(error);
            setOpenEdit(false);
        }
    };

    return (
        <>
            {showConfirmationPopup && (
                <PopUp>
                    <p>Send to database?</p>
                    <button onClick={() => handleConfirmation(true)}>
                        Sim
                    </button>
                    <button onClick={() => handleConfirmation(false)}>
                        Não
                    </button>
                </PopUp>
            )}
            <EditForm onSubmit={handleSubmit}>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={calendarItem.date.toString()}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="description">Descrição:</label>
                <textarea
                    id="description"
                    name="description"
                    value={calendarItem.description}
                    onChange={handleChange}
                />
                <label htmlFor="name">Nome:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={calendarItem.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="venue">Nome do lugar:</label>
                <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={calendarItem.venue}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="location">Localização:</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    value={calendarItem.location}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Enviar</button>
            </EditForm>
        </>
    );
};

export default EditCalendarItem;
