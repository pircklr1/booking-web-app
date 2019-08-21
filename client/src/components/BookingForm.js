import React, {Component} from 'react';
// import Modal from 'react-responsive-modal'; npm uninstall react-responsive-modal
import { Button, Form, Modal, Header} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class BookingForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
        // state = {
            startDate: moment()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        let main = this.state.startDate
        console.log(main.format('L'));
    }

    render() {
        return (
            <div>

                {/*<DatePicker*/}
                {/*    selected={ this.state.startDate }*/}
                {/*    onChange={ this.handleChange }*/}
                {/*    name="startDate"*/}
                {/*    dateFormat="MM/DD/YYYY"*/}
                {/*/>*/}

                <Modal trigger={<Button primary>Varaa huone</Button>}>
                    <Modal.Header>Uusi varaus</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={ this.handleSubmit }>
                    {/*    <Form >*/}
                    <Form.Group unstackable widths={2}>
                        <Form.Input label='Huone' placeholder='Valitse huone' />
                    </Form.Group>
                        <Form.Group>
                        <Form.Input label='Päivämäärä'>

                      </Form.Input>
                        </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Alkaa' placeholder='klo' />
                        <Form.Input label='Päättyy' placeholder='klo' />
                    </Form.Group>
                    <Button type='submit'>Varaa</Button>
                </Form>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default BookingForm;

