import React, {useState, useEffect, useContext} from 'react';
import {getAllUsers} from '../../service/ClientService';
import {Table} from 'semantic-ui-react';
import DeleteButton from "./DeleteButton";
import {AuthContext} from "../../context/auth";


function AdminAllUsers(){
    const {currentUser} = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      setIsLoading(true);
      getAllUsers(setUserData);
      setIsLoading(false);
    }, []);

    const renderUserTable = () => {
        return userData.map(user => {
            return (
                <Table.Row textAlign='center' key={user.id}>
                    <Table.Cell>{user.lastName} {user.firstName}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell collapsing textAlign='center'>
                        <DeleteButton id={user.id} type={'user'} />
                    </Table.Cell>
                </Table.Row>
            );
        });
    };

    return(
        <Table unstackable celled textAlign='center' color={'blue'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nimi</Table.HeaderCell>
                    <Table.HeaderCell>Sähköposti</Table.HeaderCell>
                    <Table.HeaderCell>Poista</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{renderUserTable()}</Table.Body>
        </Table>
    )
}

export default AdminAllUsers;
