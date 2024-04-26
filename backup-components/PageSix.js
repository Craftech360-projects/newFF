// pageSix.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormData } from '../src/components/FormDataContext'; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  totalAnnualIncome: Yup.number()
    .min(0, 'Income must be a positive number')
    .required('Please enter your total annual income.'),
  hasOtherIncome: Yup.string().required('Please indicate if you have any other income.'),
});

const PageSix = () => {
  const { formData, updateFormData } = useFormData();
  const router = useRouter();

  const userName = formData.name || 'Customer'; // Assume you have the user's name stored
  const [isExpanded, setIsExpanded] = useState(false);

  // Define initial form values
  const initialValues = {
    totalAnnualIncome: '',
    hasOtherIncome: '',
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          router.push('/pageSeven'); // Navigate to the next form step
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-xl font-semibold mb-4">{userName}, please tell us your income details</h2>
            
            {/* Total annual income field */}
            <div className="mb-4">
              <label htmlFor="totalAnnualIncome" className="block text-gray-700 text-sm font-bold mb-2">
                What is your total annual income?
              </label>
              <Field name="totalAnnualIncome" type="number" className="block w-full py-2 px-3 rounded border border-gray-300" />
              <ErrorMessage name="totalAnnualIncome" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Expandable section */}
            <div className="mb-4">
              <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 hover:text-blue-700">
                What to include?
              </button>
              {isExpanded && (
                <div className="mt-2">
                  <p>Earned income:</p>
                  <ul className="list-disc list-inside">
                    <li>Employed, gross income before taxes and deductions</li>
                    <li>Sole trader or partnerships, net profits (average of last 2 years or latest year, whichever is smaller)</li>
                    <li>Ltd Company Directors, salary and net profits after corporation tax (average of last 2 years total or latest year, whichever is smaller)</li>
                  </ul>
                  <p>Other income:</p>
                  <ul className="list-disc list-inside">
                    <li>Pensions</li>
                    <li>Buy-to-let income</li>
                    {/* ... other income types ... */}
                  </ul>
                </div>
              )}
            </div>

            {/* Other income radio buttons */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Do you have any other income?
              </label>
              <label className="inline-flex items-center">
                <Field type="radio" name="hasOtherIncome" value="Yes" className="form-radio text-indigo-600" />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <Field type="radio" name="hasOtherIncome" value="No" className="form-radio text-indigo-600" />
                <span className="ml-2">No</span>
              </label>
              <ErrorMessage name="hasOtherIncome" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageFive')}>
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

export default PageSix;
