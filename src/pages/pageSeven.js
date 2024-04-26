// pageSeven.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext"; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  creditCardBalance: Yup.number()
    .min(0, "Balance must be a positive number")
    .required("Please enter your total credit card balance."),
  loanRepayment: Yup.number()
    .min(0, "Amount must be a positive number")
    .required("Please enter your loan repayment amount."),
  otherOutgoings: Yup.number().min(0, "Amount must be a positive number"),
});

const FormErrorMessage = ({ name }) => (
  <ErrorMessage name={name}>
    {(msg) => (
      <div className="flex mt-2">
        <div>
          <img
            src="w.png"
            alt="Error"
            style={{ width: "20px", marginRight: "10px" }}
          />
        </div>
        <div className="text-red-700">{msg}</div>
      </div>
    )}
  </ErrorMessage>
);

const PageSeven = () => {
  const { formData, updateFormData, counter } = useFormData();
  const router = useRouter();

  
  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };
  
  const userName = formData.firstName || "Customer"; // Assume you have the user's name stored
  const [isExpanded, setIsExpanded] = useState(false);

  // Define initial form values
  const initialValues = {
    creditCardBalance: "",
    loanRepayment: "",
    otherOutgoings: "",
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>
      <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            updateFormData(values);
            // Redirect or perform submission logic here
            router.push("/pageEight");
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-medium mb-10">
                <span className="capitalize font-semibold text-red-700">
                  {userName}
                </span>
                ,how about your outgoings?
              </h2>
              {/* Credit card balance field */}
              <div className="mb-4">
                <label
                  htmlFor="creditCardBalance"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  What is the total outstanding balance on your credit cards?
                </label>
                <Field
                  name="creditCardBalance"
                  type="number"
                  className="block w-full py-2 px-3 rounded border border-gray-300"
                />
                <FormErrorMessage
                  name="creditCardBalance"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Loan repayment field */}
              <div className="mb-4">
                <label
                  htmlFor="loanRepayment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  How much do you pay off your loans every month?
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Total amount of your monthly loans e g, personal, car,
                  fumiture loans
                </p>

                <Field
                  name="loanRepayment"
                  type="number"
                  className="block w-full py-2 px-3 rounded border border-gray-300"
                />
                <FormErrorMessage
                  name="loanRepayment"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Other monthly outgoings field */}
              <div className="mb-4">
                <label
                  htmlFor="otherOutgoings"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  What are your other monthly outgoings? (optional)
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Don't worry about including expreses towards food, clothing or
                  utility bills for your main home
                </p>
                <Field
                  name="otherOutgoings"
                  type="number"
                  className="block w-full py-2 px-3 rounded border border-gray-300"
                />

                {/* Expandable section */}
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    What to include?
                  </button>
                  {isExpanded && (
                    <div className="mt-2">
                      <ul className="list-disc list-inside">
                        <li>
                          Essential travel (e.g., fuel, insurance, tax, season
                          tickets)
                        </li>
                        {/* ... other items to include ... */}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-10">
                <div className="flex flex-row items-center justify-center">
                  <img src="/larrow.png" className="w-7 h-7" alt="" />
                  <button
                    type="button"
                    onClick={handleBack}
                    className=" text-gray-700 font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Back
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Continue
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PageSeven;
