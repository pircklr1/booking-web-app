import React from 'react';
import { Button } from 'semantic-ui-react';
import { adminDeleteBooking } from '../../service/ClientService';
export default function DeleteButton({ id }) {
  function deleteBooking() {
    adminDeleteBooking(id);
  }

  return (
    <Button ui negative basic icon onClick={deleteBooking}>
      <i className='trash icon' />
    </Button>
  );
}
