// FormPageOne.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormPageOne = () => (
  <div>
    <label htmlFor="firstName">First Name</label>
    <Field name="firstName" type="text" />
    <ErrorMessage name="firstName" component="div" />

    <label htmlFor="lastName">Last Name</label>
    <Field name="lastName" type="text" />
    <ErrorMessage name="lastName" component="div" />
  </div>
);

export default FormPageOne;
