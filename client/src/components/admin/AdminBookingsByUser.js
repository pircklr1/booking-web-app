import React, {useState, useEffect, useContext} from 'react';
import {Button, Table, Container, Header, Icon, Grid, Tab, Dropdown} from 'semantic-ui-react';
import moment from 'moment';
import DeleteButton from './DeleteButton';
import {getAllBookings, getAllRooms, getAllUsers} from "../../service/ClientService";
import {AuthContext} from "../../context/auth";

function AdminBookingsByUser() {
    const opt=[];
    return(
        <Dropdown
        placeholder='Valitse käyttäjä'
        fluid
        search
        selection
        options={opt}
    />
    );
}
export default AdminBookingsByUser;