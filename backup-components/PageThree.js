// pageThree.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormData } from '../src/components/FormDataContext'; // replace with actual path

// Validation schema for contact details
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Please enter your email address'),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Numeric only")
    .min(10, 'Minimum 10 numbers')
    .required('Please enter your mobile number'),
});

const PageThree = () => {
  const { formData, updateFormData } = useFormData();
  const router = useRouter();

  // Assuming you're storing the user's name in the global form data under 'name'
  const userName = formData.name || 'Customer';

  // Define initial form values
  const initialValues = {
    email: '',
    mobileNumber: '',
  };

  return (
    <div className="container mx-auto p-6 bg-white max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          router.push('/pageFour'); // Navigate to the next form step
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <h2 className="text-xl font-semibold mb-4">{userName}, your contact details please?</h2>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Your email address
              </label>
              <Field
                name="email"
                type="email"
                className={`block w-full py-2 px-3 mb-2 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="mb-4">
              <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Your mobile number
              </label>
              <Field
                name="mobileNumber"
                type="tel"
                className={`block w-full py-2 px-3 rounded mb-2 border ${errors.mobileNumber && touched.mobileNumber ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="mobileNumber" component="div" className="text-red-500 text-xs italic" />
            </div>

            <div className="flex items-center justify-between mt-6">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageTwo')}>
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

export default PageThree;
