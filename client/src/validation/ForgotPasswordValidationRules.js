/* Includes validations for forgot password page
Returns array of errors.
*/

export default function validate(values) {
    let errors = {};

    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    return errors;
};