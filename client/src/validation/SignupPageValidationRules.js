/* Includes all validations in both Signup- and Login-pages. 
Returns array of errors. 
These validations are used by UseLoginForm-hook.*/

export default function validate(values) {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = 'Etunimi on pakollinen';
  }
  if (!values.lastName) {
    errors.lastName = 'Sukunimi on pakollinen';
  }
  if (!values.email) {
    errors.email = 'Sähköpostiosoite on pakollinen';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Sähköpostiosoite on väärää muotoa';
  }
  if (!values.password) {
    errors.password = 'Salasana on pakollinen';
  } else if (values.password.length < 8) {
    errors.password = 'Salasanan on oltava vähintään 8 merkkiä pitkä';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Salasanan vahvistus on pakollinen';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Salasanojen on täsmättävä!';
  }
  return errors;
}
