import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  age: Yup.number()
    .positive('Must be positive')
    .integer('Must be an integer')
    .min(1, 'Must be at least 1 year old')
    .max(120, 'Must be 120 years or less')
    .required('Required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  address: Yup.string()
    .required('Required'),
  city: Yup.string()
    .required('Required'),
});
