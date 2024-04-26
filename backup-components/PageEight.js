// pageEight.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormData } from '../src/components/FormDataContext'; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  children: Yup.number()
    .min(0, 'Please enter a valid number')
    .required('Please enter the number of children living with you.'),
  adults: Yup.number()
    .min(0, 'Please enter a valid number')
    .required('Please enter the number of adults living with you.'),
});

const PageEight = () => {
  const { formData, updateFormData } = useFormData();
  const router = useRouter();

  const userName = formData.name || 'Customer'; // Assume you have the user's name stored

  // Define initial form values
  const initialValues = {
    children: '',
    adults: '',
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          router.push('/pageNine');
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-xl font-semibold mb-4">Lastly, tell us about your household</h2>
            
            {/* Number of children field */}
            <div className="mb-4">
              <label htmlFor="children" className="block text-gray-700 text-sm font-bold mb-2">
                How many children live with you?
              </label>
              <Field as="select" name="children" className="block w-full py-2 px-3 rounded border border-gray-300">
                <option value="">Please select</option>
                {[...Array(6).keys()].map((number) => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </Field>
              <ErrorMessage name="children" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Number of adults field */}
            <div className="mb-4">
              <label htmlFor="adults" className="block text-gray-700 text-sm font-bold mb-2">
                How many adults live with you?
              </label>
              <Field as="select" name="adults" className="block w-full py-2 px-3 rounded border border-gray-300">
                <option value="">Please select</option>
                {[...Array(6).keys()].map((number) => (
                  <option key={number} value={number}>{number}</option>
                ))}
              </Field>
              <ErrorMessage name="adults" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageSeven')}>
                Back
              </button>
              <button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PageEight;
