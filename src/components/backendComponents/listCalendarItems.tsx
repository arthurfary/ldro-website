import styled from "styled-components";
import supabase from "../../config/supabaseClient";
import { useState, useEffect } from "react";
import EditCalendarItem from "./editCalendarItem";

interface ScheduleItem {
    id: number;
    date: Date;
    description: string;
    name: string;
    venue: string;
    location: string;
}

const DateRow = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    background: #fff;
    justify-content: space-evenly;
    padding: 10px;
    border-bottom: 1px solid #000;
`;

const Button = styled.button`
    background-color: #4caf50; /* Green */
    border: none;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;
`;

const EditButton = styled(Button)`
    background-color: white;
    color: black;
    border: 2px solid #4caf50;

    &:hover {
        background-color: #4caf50;
        color: white;
    }
`;

const DeleteButton = styled(Button)`
    background-color: white;
    color: black;
    border: 2px solid #f44336;

    &:hover {
        background-color: #f44336;
        color: white;
    }
`;

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    background: #fff;
    justify-content: space-evenly;
    padding: 10px;
    border-bottom: 2px solid #fff;
    font-weight: bold;
`;

const RowCreator = ({
    id,
    date,
    name,
    description,
    venue,
    location,
}: ScheduleItem) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    async function deleteItem(id: number) {
        const { error } = await supabase.from("calendar").delete().eq("id", id);

        if (!error) {
            setIsDeleted(true);
        }
    }

    return (
        <>
            {!isDeleted && (
                <DateRow>
                    <p>{id}</p>
                    <p>{date.toString()}</p>
                    <p>{name}</p>
                    <p>{description}</p>
                    <p>{venue}</p>
                    <p>{location}</p>
                    <EditButton onClick={() => setOpenEdit(!openEdit)}>
                        Edit
                    </EditButton>
                    <DeleteButton onClick={() => deleteItem(id)}>
                        Delete
                    </DeleteButton>
                    {openEdit && (
                        <EditCalendarItem
                            {...{
                                id,
                                date,
                                name,
                                description,
                                venue,
                                location,
                            }}
                            setOpenEdit={setOpenEdit}
                        />
                    )}
                </DateRow>
            )}
            {isDeleted && <p>deletado</p>}
        </>
    );
};

const ListCalendarItems = () => {
    const [dates, setDates] = useState<ScheduleItem[]>([]);
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const fetchDates = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase.from("calendar").select();
            if (error) throw error;
            setDates(data);
            setFetchError(false);
        } catch (error) {
            setFetchError(true);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDates();
    }, []);

    return (
        <div>
            <h1>Datas:</h1>
            <TableHeader>
                <p>ID</p>
                <p>Date</p>
                <p>Name</p>
                <p>Description</p>
                <p>Venue</p>
                <p>Location</p>
                <p>Edit</p>
                <p>Delete</p>
            </TableHeader>
            {dates.map((date) => (
                <RowCreator {...date} key={date.id} />
            ))}
            {loading && <h2>Carregando...</h2>}
            {fetchError && <h2>Um erro ocorreu</h2>}
        </div>
    );
};

export default ListCalendarItems;
