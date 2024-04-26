// pageFive.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormData } from '../src/components/FormDataContext'; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  employmentStatus: Yup.string()
    .required('Please select your employment status.')
    .notOneOf(['Please select'], 'Please select your employment status.'),
});

const PageFive = () => {
  const { formData, updateFormData } = useFormData();
  const router = useRouter();
  
  const userName = formData.name || 'Customer'; // Assume you have the user's name stored

  // Define initial form values
  const initialValues = {
    employmentStatus: '',
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          router.push('/pageSix'); // Navigate to the next form step
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-xl font-semibold mb-4">{userName}, what is your main employment?</h2>
            
            {/* Employment status field */}
            <div className="mb-4">
              <label htmlFor="employmentStatus" className="block text-gray-700 text-sm font-bold mb-2">
                Employment status
              </label>
              <Field as="select" name="employmentStatus" className="block w-full py-2 px-3 rounded border border-gray-300">
                <option value="">Please select</option>
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Homemaker">Homemaker</option>
                <option value="Receiving pension/disability benefit">Receiving pension/disability benefit</option>
                <option value="Unemployed">Unemployed</option>
              </Field>
              <ErrorMessage name="employmentStatus" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageFour')}>
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

export default PageFive;
