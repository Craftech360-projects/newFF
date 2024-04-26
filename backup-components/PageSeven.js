// pageSeven.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormData } from '../src/components/FormDataContext'; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  creditCardBalance: Yup.number()
    .min(0, 'Balance must be a positive number')
    .required('Please enter your total credit card balance.'),
  loanRepayment: Yup.number()
    .min(0, 'Amount must be a positive number')
    .required('Please enter your loan repayment amount.'),
  otherOutgoings: Yup.number()
    .min(0, 'Amount must be a positive number'),
});

const PageSeven = () => {
  const { formData, updateFormData } = useFormData();
  const router = useRouter();
  
  const userName = formData.name || 'Customer'; // Assume you have the user's name stored
  const [isExpanded, setIsExpanded] = useState(false);

  // Define initial form values
  const initialValues = {
    creditCardBalance: '',
    loanRepayment: '',
    otherOutgoings: '',
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          // Redirect or perform submission logic here
          router.push('/pageEight');
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="text-xl font-semibold mb-4">{userName}, how about your outgoings?</h2>
            
            {/* Credit card balance field */}
            <div className="mb-4">
              <label htmlFor="creditCardBalance" className="block text-gray-700 text-sm font-bold mb-2">
                What is the total outstanding balance on your credit cards?
              </label>
              <Field name="creditCardBalance" type="number" className="block w-full py-2 px-3 rounded border border-gray-300" />
              <ErrorMessage name="creditCardBalance" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Loan repayment field */}
            <div className="mb-4">
              <label htmlFor="loanRepayment" className="block text-gray-700 text-sm font-bold mb-2">
                How much do you pay off your loans every month?
              </label>
              <Field name="loanRepayment" type="number" className="block w-full py-2 px-3 rounded border border-gray-300" />
              <ErrorMessage name="loanRepayment" component="div" className="text-red-500 text-xs italic" />
            </div>

            {/* Other monthly outgoings field */}
            <div className="mb-4">
              <label htmlFor="otherOutgoings" className="block text-gray-700 text-sm font-bold mb-2">
                What are your other monthly outgoings? (optional)
              </label>
              <Field name="otherOutgoings" type="number" className="block w-full py-2 px-3 rounded border border-gray-300" />
              
              {/* Expandable section */}
              <div className="mt-2">
                <button type="button" onClick={() => setIsExpanded(!isExpanded)} className="text-blue-500 hover:text-blue-700">
                  What to include?
                </button>
                {isExpanded && (
                  <div className="mt-2">
                    <ul className="list-disc list-inside">
                      <li>Essential travel (e.g., fuel, insurance, tax, season tickets)</li>
                      {/* ... other items to include ... */}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-6">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageSix')}>
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

export default PageSeven;
