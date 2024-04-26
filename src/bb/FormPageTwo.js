// FormPageTwo.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormPageTwo = () => (
  <div>
    <label htmlFor="email">Email</label>
    <Field name="email" type="email" />
    <ErrorMessage name="email" component="div" />

    <label htmlFor="age">Age</label>
    <Field name="age" type="number" />
    <ErrorMessage name="age" component="div" />
  </div>
);

export default FormPageTwo;
