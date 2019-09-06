import React from 'react';
import { Button } from 'semantic-ui-react';
import {
  adminDeleteBooking,
  adminDeleteRoom,
  adminDeleteUser
} from '../../service/ClientService';

export default function DeleteButton({ id, type, update }) {
  function deleteBooking() {
    console.log(type);
    if (type === 'booking') {
      adminDeleteBooking(id);
    } else if (type === 'room') {
      adminDeleteRoom(id)
          .then(update)
    } else if (type === 'user') {
      adminDeleteUser(id);
    }
  }

  return (
    <Button ui negative basic icon onClick={deleteBooking}>
      <i className='trash icon' />
    </Button>
  );
}
