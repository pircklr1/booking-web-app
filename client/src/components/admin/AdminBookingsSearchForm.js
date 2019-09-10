// import React, {useState, useEffect, useContext} from 'react';
import React from 'react';
import {Button, Dropdown, Form} from 'semantic-ui-react';
// import {AuthContext} from "../../context/auth";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fi from 'date-fns/locale/fi';

function AdminBookingsSearchForm({handleSubmit, handleUserChange, handleStartDateChange, handleEndDateChange, startDate, endDate, user, getUsers}) {

    return (
        <Form onSubmit={handleSubmit} style={{border: '1px solid #2185D0', padding: 10, marginTop: 14}}>
            <Form.Group unstackable widths={2}>
                <Form.Input label='Valitse käyttäjä'>
                    <Dropdown
                        placeholder='Käyttäjä'
                        fluid
                        search
                        selection
                        options={getUsers().concat({key: 1, text: 'Kaikki', value: 1}).reverse()}
                        onChange={handleUserChange}
                        value={user}
                    /></Form.Input></Form.Group>
            <Form.Group>
                <Form.Input label='Alkaen'>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        onChange={handleStartDateChange}
                        locale={fi}
                    />
                </Form.Input>
            </Form.Group>
            <Form.Group>
                <Form.Input label='Päättyen'>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        selected={endDate}
                        onChange={handleEndDateChange}
                        locale={fi}
                    />
                </Form.Input>
            </Form.Group>
            <Button primary type='submit'>Hae</Button>
        </Form>
    );
}

export default AdminBookingsSearchForm;