// import React from "react";
// import { Field, ErrorMessage } from "formik";

// const FormPageOne = () => (
//   <div>
   
//     <label htmlFor="name">Name:</label>
//     <Field id="name" name="name" placeholder="Jane Doe" />
//     <ErrorMessage name="name" component="div" />
//   </div>
// );

// export default FormPageOne;


// FormPageOne.js
import React from 'react';
import { useFormikContext, Field, ErrorMessage } from 'formik';

const FormPageOne = () => {
  const { values, handleChange } = useFormikContext(); // Accessing Formik's context

  return (
    <div>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" type="text" value={values.firstName} onChange={handleChange} />
      <ErrorMessage name="firstName" component="div" />

      <label htmlFor="lastName">Last Name</label>
      <Field name="lastName" type="text" value={values.lastName} onChange={handleChange} />
      <ErrorMessage name="lastName" component="div" />

      {/* New Field for Age */}
      <label htmlFor="age">Age</label>
      <Field name="age" type="number" value={values.age} onChange={handleChange} />
      <ErrorMessage name="age" component="div" />

      {/* New Field for Phone Number */}
      <label htmlFor="phoneNumber">Phone Number</label>
      <Field name="phoneNumber" type="tel" value={values.phoneNumber} onChange={handleChange} />
      <ErrorMessage name="phoneNumber" component="div" />
    </div>
  );
};

export default FormPageOne;


