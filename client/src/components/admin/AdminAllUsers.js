import React, {useState, useEffect} from 'react';
import {getAllUsers} from '../../service/ClientService';
import {Table, Icon} from 'semantic-ui-react';
import DeleteButton from "./DeleteButton";
import UserEditModal from "./UserEditModal";


function AdminAllUsers(){
    const [userData, setUserData] = useState([]);
    const [rerender, setRerender] = useState(1);
    const [showCheckMark] = useState(true);
    const [showX] = useState(true);

    useEffect(() => {
      getAllUsers(setUserData);
      setRerender(false);
    }, [rerender]);

    function update(){
        setRerender(rerender + 1);
    }

    const renderUserTable = () => {
        return userData.map(user => {
            if (user.isAdmin === true) {
                return (
                    <Table.Row textAlign='center' key={user.id}>
                        <Table.Cell>{user.lastName} {user.firstName}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {showCheckMark &&
                            <Icon name='checkmark' color='green'/>
                            }
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <UserEditModal user={user} update={update}/>
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <DeleteButton id={user.id} type={'user'} update={update}/>
                        </Table.Cell>
                    </Table.Row>
                );
            }else{
                return (
                    <Table.Row textAlign='center' key={user.id}>
                        <Table.Cell>{user.lastName} {user.firstName}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            {showX &&
                            <Icon name='times' color='red'/>
                            }
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <UserEditModal user={user} update={update}/>
                        </Table.Cell>
                        <Table.Cell collapsing textAlign='center'>
                            <DeleteButton id={user.id} type={'user'} update={update}/>
                        </Table.Cell>
                    </Table.Row>
                )
            }
        });
    };

    return(
        <Table unstackable celled textAlign='center' color={'blue'}>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nimi</Table.HeaderCell>
                    <Table.HeaderCell>Sähköposti</Table.HeaderCell>
                    <Table.HeaderCell>Admin</Table.HeaderCell>
                    <Table.HeaderCell>Muokkaa</Table.HeaderCell>
                    <Table.HeaderCell>Poista</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{renderUserTable()}</Table.Body>
        </Table>
    )
}

export default AdminAllUsers;
