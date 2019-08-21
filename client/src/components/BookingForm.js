import React, {Component} from 'react';
import Modal from 'react-responsive-modal';
import { Button, Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';


class BookingForm extends Component {

    constructor (props) {
        super(props)
        this.state = {
        // state = {
            startDate: moment(),
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    // state = {
    //     open: false,
    // };
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
    onOpenModal = () => {
        this.setState({ open: true });
    };
    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <button onClick={this.onOpenModal}>Varaa huone</button>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>Uusi varaus</h2>
                    <Form onSubmit={ this.handleSubmit }>
                    {/*    <Form >*/}
                    <Form.Group unstackable widths={2}>
                        <Form.Input label='Last name' placeholder='Last name' />
                    </Form.Group>
                        <Form.Group>
                        <Form.Input label='Päivämäärä'>
                            {/*<DatePicker*/}
                            {/*    selected={ this.state.startDate }*/}
                            {/*    onChange={ this.handleChange }*/}
                            {/*    name="startDate"*/}
                            {/*    dateFormat="MM/DD/YYYY"*/}
                            {/*/>*/}
                      </Form.Input>
                        </Form.Group>
                    <Form.Group widths={2}>
                        <Form.Input label='Address' placeholder='Address' />
                        <Form.Input label='Phone' placeholder='Phone' />
                    </Form.Group>
                    <Form.Checkbox label='I agree to the Terms and Conditions' />
                    <Button type='submit'>Lähetä</Button>
                </Form>
                </Modal>
            </div>
        );
    }
}

export default BookingForm;

