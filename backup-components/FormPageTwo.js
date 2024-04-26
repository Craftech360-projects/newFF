// import React from 'react';
// import { Field, ErrorMessage } from 'formik';

// const FormPageTwo = () => (
//   <div>
//     <label htmlFor="email">Email:</label>
//     <Field id="email" name="email" placeholder="jane@doe.com" type="email" />
//     <ErrorMessage name="email" component="div" />
//   </div>
// );

// export default FormPageTwo;


// FormPageTwo.js
import React from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';

const FormPageTwo = () => {
  const { values, handleChange } = useFormikContext(); // Accessing Formik's context

  return (
    <div>
      <label htmlFor="email">Email Address</label>
      <Field name="email" type="email" value={values.email} onChange={handleChange} />
      <ErrorMessage name="email" component="div" />

      {/* New Field for Address */}
      <label htmlFor="address">Address</label>
      <Field name="address" type="text" value={values.address} onChange={handleChange} />
      <ErrorMessage name="address" component="div" />

      {/* New Field for City */}
      <label htmlFor="city">City</label>
      <Field name="city" type="text" value={values.city} onChange={handleChange} />
      <ErrorMessage name="city" component="div" />
    </div>
  );
};

export default FormPageTwo;

