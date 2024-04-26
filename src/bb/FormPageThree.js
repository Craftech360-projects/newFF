// FormPageThree.js
import React from 'react';
import { Field, ErrorMessage } from 'formik';

const FormPageThree = () => (
  <div>
    <label htmlFor="option">Option</label>
    <Field as="select" name="option">
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Field>
    <ErrorMessage name="option" component="div" />
  </div>
);

export default FormPageThree;
