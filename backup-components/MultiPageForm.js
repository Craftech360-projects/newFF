import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormPageOne from './FormPageOne';
import FormPageTwo from './FormPageTwo';
// import { validationSchema } from './validationSchema';
import { supabase } from '../supabaseClient'; // Adjust the path as needed
// import * as Yup from 'yup';

const initialValues = {
    firstName: '',
    lastName: '',
    age: '', // Ensure age is treated appropriately, e.g., as a number
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
  };
  

const MultiPageForm = () => {
  const [page, setPage] = useState(0);
  const [startTime] = useState(Date.now());
  const [completionTime, setCompletionTime] = useState('');

//   const handleSubmit = async (values) => {
//     if (page === 1) { // Assuming page index starts at 0
//       const endTime = Date.now();
//       const totalTime = ((endTime - startTime) / 1000).toFixed(2);
//       setCompletionTime(totalTime);

//       // Here you would insert into Supabase
//       const { error } = await supabase.from('form_responses').insert([values, { totalTime }]);
//       if (error) console.error('Error submitting form data:', error);
//       else console.log('Form submitted successfully', values);

//       setPage(page + 1); // Move to the next page or completion message
//     } else {
//       setPage(page + 1); // Move to the next form page
//     }
//   };

const handleSubmit = async (values, { setSubmitting }) => {
    if (page === 1) { // Last form page
      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(2); // Calculate total time in seconds
      setCompletionTime(totalTime);
  
      // Adjust how you're inserting into Supabase here
      const { data, error } = await supabase
        .from('form_responses')
        .insert([{ ...values, totalTime }]); // Ensure this matches your table structure
  
      if (error) console.error('Error submitting form data:', error);
      else console.log('Form submitted successfully', data);
  
      setPage(page + 1); // Move to the next page or completion message
    } else {
      setPage(page + 1); // Move to the next form page
    }
    setSubmitting(false); // Set submitting to false to allow for resubmission if needed
  };
  

  const PageDisplay = () => {
    if (page === 0) return <FormPageOne />;
    if (page === 1) return <FormPageTwo />;
    return <div>Form completed in {completionTime} seconds.</div>;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <PageDisplay />
          {page < 2 && <button type="submit">{page === 1 ? 'Submit' : 'Next'}</button>}
        </Form>
      )}
    </Formik>
  );
};

export default MultiPageForm;


