import React from 'react'
import { Message } from 'semantic-ui-react'

const Notification = ({ message }) => {
    console.log(message)
    return message === "Varaus onnistui" || message === "Huoneen muokkaus onnistui!" ? <Message color='green'><p>{message}</p></Message> :
        <Message negative><Message.Header>Virhe</Message.Header><p>{message}</p></Message>
}

export default Notification