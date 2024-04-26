// pageThree.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext"; // replace with actual path

// Validation schema for contact details
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email address"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Numeric only")
    .min(10, "Minimum 10 numbers")
    .required("Please enter your mobile number"),
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

const PageThree = () => {
  const { formData, updateFormData, counter } = useFormData();
  const router = useRouter();

  // Assuming you're storing the user's name in the global form data under 'name'
  const userName = formData.firstName || "Customer";

  
  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };
  
  // Define initial form values
  const initialValues = {
    email: "",
    mobileNumber: "",
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>

      <div className="container mx-auto p-6 bg-white max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            updateFormData(values);
            router.push("/pageFour"); // Navigate to the next form step
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-medium mb-4">
                <span className="capitalize font-semibold text-red-700">
                  {userName}
                </span>
                , your contact details please?
              </h2>

              <div className="mb-4 mt-9">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Your email address
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`block w-full py-2 px-3 mb-2 border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <FormErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="mobileNumber"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Your mobile number
                </label>
                <Field
                  name="mobileNumber"
                  type="tel"
                  className={`block w-full py-2 px-3 rounded mb-2 border ${
                    errors.mobileNumber && touched.mobileNumber
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <FormErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="flex items-center justify-between mt-6">
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

export default PageThree;
