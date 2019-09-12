import React, { Component } from 'react';
import { Table, Icon, Popup } from 'semantic-ui-react';
import { Grid, Header, Modal } from 'semantic-ui-react';
import moment from 'moment';

// let backgroundColor = '#1678C2';
// let backgroundColor2 = '#DB2828';

class RoomCell extends Component {
  check() {
    if (this.props.cellData.available) {
      return '';
    } else {
      if (this.props.cellData.users) {
        return (
          <Modal
            position='top center'
            size='mini'
            trigger={<Icon circular name='user' />}
          >
            <Modal.Header as='h4'>Varauksen tiedot</Modal.Header>
            <Modal.Content>
              <p>
                <b>Huoneen nimi:</b> {this.props.roomName}
                <br />
                <b>Ajankohta:</b> {this.props.cellData.booking.startTime}-
                {this.props.cellData.booking.endTime}
                <br />
                <b>Varaajan nimi:</b> {this.props.cellData.booking.userId}
              </p>
            </Modal.Content>
          </Modal>
        );
      } else {
        // return <Icon size='large' color='red' name='ban'/> =red ban-icon for grey background
        return (
          <Popup
            position='top center'
            on='click'
            pinned
            hideOnScroll
            trigger={<Icon size='large' name='ban' />}
          >
            <Grid centered>
              <Grid.Column textAlign='center'>
                <Header as='h4'>Varauksen tiedot</Header>
                <p>
                  Huoneen nimi: {this.props.roomName}
                  <br />
                  Ajankohta: {this.props.cellData.booking.startTime}-
                  {this.props.cellData.booking.endTime}
                  <br />
                  Varaajan nimi: {this.props.cellData.booking.userId}
                </p>
              </Grid.Column>
            </Grid>
          </Popup>
        );
      }
    }
  }

  render() {
    let backgroundColor = 'inherit';

    if (!this.props.cellData.available && this.props.cellData.users) {
      backgroundColor = '#7bace4';
    } else if (!this.props.cellData.available) {
      // backgroundColor = '#cfcfcf'; =grey
      backgroundColor = '#fc9fa3';
    }

    return (
      <Table.Cell textAlign={'center'} style={{ backgroundColor }}>
        {this.check()}
      </Table.Cell>
    );
  }
}

export default RoomCell;
