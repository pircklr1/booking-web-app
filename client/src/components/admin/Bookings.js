import React, {useState, useEffect, useContext} from 'react';
import {Header, Tab} from "semantic-ui-react";
import AdminBookingsSearchForm from "./AdminBookingsSearchForm";
import AdminBookingsTable from "./AdminBookingsTable";

function Bookings() {
    return(
        <div>
        <Header as='h3' attached='top' block >Hae varauksia</Header>
        <AdminBookingsSearchForm/>
        <Header as='h3' attached='top' block >Haetut varaukset</Header>
    <AdminBookingsTable/></div>
    )
}
export default Bookings;