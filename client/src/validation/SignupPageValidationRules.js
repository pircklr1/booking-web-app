/* Includes all validations in both Signup- and Login-pages. 
Returns array of errors. 
These validations are used by UseLoginForm-hook.*/

export default function validate(values) {
    let errors = {};
    if(!values.firstName) {
        errors.firstName = 'Firstname is required';
    }
    if(!values.lastName) {
        errors.lastName = 'Lastname is required';
    }
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 8) {
        errors.password = 'Password must be 8 or more characters';
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Password confirmation is required';
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match!';
    }
    return errors;
};