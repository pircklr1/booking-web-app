// // This component handles the rendering of signup page,
// // its connection to backend, and redirecting to homepage in case user is already logged in.
//
// import React, { useContext, useState, useEffect } from 'react';
// import {Button, Form, Grid, Header, Segment, Message} from 'semantic-ui-react';
// import { AuthContext } from '../context/auth';
// import validate from '../validation/SignupPageValidationRules';
//
// import axios from 'axios';
//
// const baseUrl = 'http://localhost:9999/api';
//
// function Signup(props) {
//   //Check if user is already logged in. If so, push user to homepage.
//   const { currentUser } = useContext(AuthContext);
//   if (currentUser) {
//     props.history.push('/home');
//   }
//
//   const [values, setValues] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   useEffect(() => {
//     if (Object.keys(errors).length === 0 && isSubmitting) {
//       addUser();
//     }
//   }, [errors]);
//
//   const onSubmit = event => {
//     if (event) event.preventDefault();
//     setErrors(validate(values));
//     setIsSubmitting(true);
//   };
//
//   const onChange = event => {
//     event.persist();
//     setValues(values => ({
//       ...values,
//       [event.target.name]: event.target.value
//     }));
//   };
//
//   function addUser() {
//     axios
//       .post(baseUrl + '/users/register', values)
//       .then(response => {
//         if (response.status === 200) {
//           setSuccess(true);
//           setTimeout(function() {
//             props.history.push('/login');
//           }, 3000);
//         } else {
//           console.log(response);
//         }
//       })
//       .catch(error => {
//         setErrors(error.response.data);
//       });
//   }
//
//   function registerUser() {
//     addUser();
//   }
//
//   return (
//     <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
//       <Grid.Column style={{ maxWidth: 450 }}>
//         <Header as='h2' color='blue' textAlign='center'>
//           Rekisteröidy
//         </Header>
//         <Form size='large' onSubmit={onSubmit}>
//           <Segment stacked>
//             <Form.Input
//               fluid
//               icon='user'
//               iconPosition='left'
//               //label='Etunimi'
//               placeholder='Etunimi'
//               name='firstName'
//               type='text'
//               value={values.firstName}
//               error={errors.firstName ? true : false}
//               onChange={onChange}
//             />
//             <Form.Input
//               //label='Sukunimi'
//               icon='user'
//               iconPosition='left'
//               placeholder='Sukunimi'
//               name='lastName'
//               type='text'
//               value={values.lastName}
//               error={errors.lastName ? true : false}
//               onChange={onChange}
//             />
//             <Form.Input
//               fluid
//               icon='envelope'
//               iconPosition='left'
//               //label='Sähköpostiosoite'
//               placeholder='Sähköpostiosoite'
//               name='email'
//               type='text'
//               value={values.email}
//               error={errors.email ? true : false}
//               onChange={onChange}
//             />
//             <Form.Input
//               fluid
//               icon='lock'
//               iconPosition='left'
//               //label='Salasana'
//               placeholder='Salasana'
//               name='password'
//               type='password'
//               value={values.password}
//               error={errors.password ? true : false}
//               onChange={onChange}
//             />
//             <Form.Input
//               fluid
//               icon='lock'
//               iconPosition='left'
//               //label='Salasanan vahvistus'
//               placeholder='Salasanan vahvistus'
//               name='confirmPassword'
//               type='password'
//               value={values.confirmPassword}
//               error={errors.confirmPassword ? true : false}
//               onChange={onChange}
//             />
//             <Button color='blue' fluid size='large'>
//               Rekisteröidy
//             </Button>
//           </Segment>
//         </Form>
//         {Object.keys(errors).length > 0 && (
//           <div className='ui error message'>
//             <ul className='list'>
//               {Object.values(errors).map(value => (
//                 <li key={value}>{value}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {success ? (
//           <Message positive>
//             <Message.Header>Käyttäjätunnuksen luonti onnistui!</Message.Header>
//             <p>
//               Voit nyt kirjautua sisään sähköpostiosoitteellasi ja salasanallasi.
//             </p>
//           </Message>
//         ) : null}
//       </Grid.Column>
//     </Grid>
//   );
// }
//
// export default Signup;
