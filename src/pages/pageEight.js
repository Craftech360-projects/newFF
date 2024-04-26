// pageEight.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext"; // Replace with the actual path to your context

// Define the validation schema using Yup
const validationSchema = Yup.object({
  children: Yup.number()
    .min(0, "Please enter a valid number")
    .required("Please enter the number of children living with you."),
  adults: Yup.number()
    .min(0, "Please enter a valid number")
    .required("Please enter the number of adults living with you."),
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

const PageEight = () => {
  const { formData, updateFormData, counter } = useFormData();
  const router = useRouter();

  const userName = formData.name || "Customer"; // Assume you have the user's name stored

  
  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };
  
  // Define initial form values
  const initialValues = {
    children: "",
    adults: "",
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
            router.push("/pageNine");
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-medium mb-10">
                Lastly, tell us about your household
              </h2>

              {/* Number of children field */}
              <div className="mb-4">
                <label
                  htmlFor="children"
                  className="block text-gray-900 text-sm font-bold mb-2"
                >
                  How many children live with you?
                </label>
                <p className="text-gray-700 text-xs mb-2">
                  Below 18 years of age
                </p>
                <Field
                  as="select"
                  name="children"
                  className="block w-[150px] py-2 px-3 rounded border border-gray-300"
                >
                  <option value="">Please select</option>
                  {[...Array(6).keys()].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage
                  name="children"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Number of adults field */}
              <div className="mb-4">
                <label
                  htmlFor="adults"
                  className="block text-gray-900 text-sm font-bold mb-2"
                >
                  How many adults live with you?
                </label>
                <p className="text-gray-700 text-xs mb-2">
                  18 years and above. please dont include a co-applicant
                </p>
                <Field
                  as="select"
                  name="adults"
                  className="block w-[150px] py-2 px-3 rounded border border-gray-300"
                >
                  <option value="">Please select</option>
                  {[...Array(6).keys()].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </Field>
                <FormErrorMessage
                  name="adults"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-14">
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

export default PageEight;
