import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
export default function Contact() {
    return (
        <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    Yhteystiedot:
                </Header>
                <h3>Vesa Meriläinen</h3>
                <h3>Kullberg Consulting Oy</h3>
                <h3>Iso Roobertinkatu 43A</h3>
                <h3>00120 Helsinki</h3>
                <h3><Icon name='phone'/>0400 944181</h3>
                <h3><Icon name='mail'/>vesa@kullberg.fi</h3>
            </Grid.Column>
        </Grid>
    );
}