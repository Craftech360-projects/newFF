// validationSchema.js
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
  lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  age: Yup.number().positive('Must be positive').integer('Must be an integer').required('Required'),
  option: Yup.string().required('Required'), // Validate the option field
});
