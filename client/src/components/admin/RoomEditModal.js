import React, {useState, useEffect, useContext} from 'react';
import {adminUpdateRoom} from "../../service/ClientService";
import {Button, Form, Icon, Modal} from "semantic-ui-react";
import Notification from "../Notification";
import validateRoomEditModal from '../../validation/RoomEditModalValidation';

function RoomEditModal(props) {
    const [room, setRoom] = useState("");
    const [name, setName] = useState("");
    const [capacity, setCapasity] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        setRoom(props.room)
    }, [])

    const handleNameChange = (e, {value}) => setName(value);
    const handleCapacityChange = (e, {value}) => setCapasity(value);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: name,
            capacity: capacity
        }
        try {
            if(validateRoomEditModal(data)) {
                adminUpdateRoom(room.id, data)
                setMessage('Huoneen muokkaus onnistui!')
            }
        } catch (e) {
            if (e.message === 'Uutta nimeä ei ole syötetty') {
                setMessage('Uutta nimeä ei ole syötetty')
            } else if (e.message === 'Huoneen uutta kapasiteettia ei ole syötetty') {
                setMessage('Huoneen uutta kapasiteettia ei ole syötetty')
            }
        }
    }

    return(
        <Modal trigger={<Button ui color='orange' basic icon><Icon className='edit'/></Button>}>
            <Modal.Header style={{'borderBottomColor': '#0e6eb8', 'borderWidth': '4px'}}>Muokkaa huonetta</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Input fluid label='Huoneen nimi' placeholder='Esimerkki(10)' onChange={handleNameChange} value={name}/>
                    <Form.Input type='number' fluid label='Huoneen kapasiteetti' placeholder='Huoneen kapasiteetti' onChange={handleCapacityChange} value={capacity}/>
                    <Form.Button primary>Vahvista muutos</Form.Button>
                    {message &&
                    <Notification message={message}/>
                    }
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default RoomEditModal;