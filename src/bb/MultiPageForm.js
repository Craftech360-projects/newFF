// import React, { useState, useEffect } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { supabase } from '../supabaseClient'; // Make sure this path matches your setup

// // Step validation schemas
// const validationSchema = [
//   Yup.object({
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string().required('Last name is required'),
//   }),
//   Yup.object({
//     email: Yup.string().email('Invalid email address').required('Email is required'),
//     age: Yup.number().positive('Age must be positive').integer().required('Age is required'),
//   }),
// ];

// const initialValues = {
//   firstName: '',
//   lastName: '',
//   email: '',
//   age: '',
// };

// const MultiPageForm = () => {
//   const [page, setPage] = useState(0);
//   const [startTime] = useState(Date.now());

//   const handleSubmit = async (values, { setSubmitting }) => {
//     if (page === 1) {

//       const endTime = Date.now();
//       const totalTime = ((endTime - startTime) / 1000).toFixed(2);

//       const { error } = await supabase.from('form_responses').insert([{ ...values, totalTime }]);
//       if (error) {
//         console.error('Error submitting form data:', error);
//       } else {
//         console.log('Form submitted successfully');
//       }

//     } else {
//       setPage(page + 1);
//     }
//     setSubmitting(false);
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema[page]}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form>
//           {page === 0 && (
//             <>
//               <div>
//                 <label htmlFor="firstName">First Name</label>
//                 <Field name="firstName" type="text" />
//                 <ErrorMessage name="firstName" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="lastName">Last Name</label>
//                 <Field name="lastName" type="text" />
//                 <ErrorMessage name="lastName" component="div" />
//               </div>
//             </>
//           )}
//           {page === 1 && (
//             <>
//               <div>
//                 <label htmlFor="email">Email</label>
//                 <Field name="email" type="email" />
//                 <ErrorMessage name="email" component="div" />
//               </div>
//               <div>
//                 <label htmlFor="age">Age</label>
//                 <Field name="age" type="number" />
//                 <ErrorMessage name="age" component="div" />
//               </div>
//             </>
//           )}
//           <div>
//             {page > 0 && (
//               <button type="button" onClick={() => setPage(page - 1)}>
//                 Back
//               </button>
//             )}
//             {page < 1 && (
//               <button type="button" onClick={() => setPage(page + 1)}>
//                 Next
//               </button>
//             )}
//             {page === 1 && (
//               <button type="submit" disabled={isSubmitting}>
//                 Submit
//               </button>
//             )}
//           </div>

//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default MultiPageForm;

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { supabase } from "../../supabaseClient"; // Make sure this path matches your setup

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
};

const RadioButton = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <input
        type="radio"
        {...field}
        {...props}
        className="h-6 w-6 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      {label}
    </>
  );
};

const validationSchema = Yup.object().shape({
  // Define your validation schema for all fields here
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  age: Yup.number().positive("Age must be positive").required("Required"),
  option: Yup.string().required("Required"),
});

const MultiPageForm = () => {
  const [page, setPage] = useState(0);
  const [startTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  // Update elapsed time until the form is submitted
  useEffect(() => {
    let interval = null;
    if (page < 6) {
      // Assuming page index starts at 0 and you have 2 pages
      interval = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [page, startTime]);

  const handlePrev = () => {
    if (page > 0) setPage((current) => current - 1);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Attempting to submit:", values); // Debugging log
    if (page === 6) {
      // Check if it's the last page
      const totalTime = elapsedTime.toFixed(2);

      // Insert data into Supabase
      const { data, error } = await supabase
        .from("form_responses")
        .insert([{ ...values, totalTime }]);

      if (error) {
        console.error("Error submitting form data:", error);
      } else {
        console.log("Form submitted successfully", data);
        setPage(page + 1); // Move to a confirmation or completion page/message
      }
    } else {
      setPage(page + 1); // Not the last page, go to the next page
    }
    setSubmitting(false); // Always stop submitting
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-screen justify-center items-center flex flex-col h-screen">
          {/* Render form fields based on the current page */}
          {page === 0 && (
            <>
              <div className="">
                <div className="flex flex-col justify-center w-[65%] items-start">
                  <h2 className="mb-5 text-4xl w-[400px]">
                    First, We need to know...
                  </h2>

                  <div className="my-2">
                    <label
                      htmlFor="option"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      What are you looking to do?
                    </label>
                    <div className="mt-2">
                      <Field
                        as="select"
                        name="option"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value="">Select an option</option>
                        <option value="option1">Buy my first home</option>
                        <option value="option2">Move home</option>
                      </Field>
                    </div>
                    <ErrorMessage name="option" component="div" />
                  </div>




                  <div className="my-2">
                    <div id="preference" className="flex flex-col">
                      <h3>Who's applying?</h3>
                      <div className="">
                        <RadioButton
                          name="preference"
                          value="Option 1"
                          label="Just me"
                          className="text-center"
                        />
                        <RadioButton
                          name="preference"
                          value="Option 2"
                          label="Me and Someone else"
                        />
                      </div>
                    </div>
                    <ErrorMessage name="preference" component="div" />
                  </div>



                  <div className="my-2">
                    <h2 className="w-[500px]">
                      You can enter a property value or a deposit amount, or
                      both
                    </h2>
                    <label htmlFor="firstName">Property Value</label>
                    <div>
                      <Field
                        className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="firstName"
                        type="text"
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" />
                  </div>



                  <div className="my-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Deposit amount
                    </label>
                    <div>
                      <Field
                        className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        name="firstName"
                        type="text"
                      />
                    </div>
                    <ErrorMessage name="firstName" component="div" />
                  </div>



                  <div className="my-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      What mortgage term are you thinking of?
                    </label>
                    <Field
                      as="select"
                      name="option"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an option</option>
                      <option value="option1">Buy my first home</option>
                      <option value="option2">Move home</option>
                    </Field>
                    <ErrorMessage name="option" component="div" />
                  </div>



                  {/* <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" />
                    <ErrorMessage name="firstName" component="div" />
                  </div>
                 
                  <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" />
                    <ErrorMessage name="lastName" component="div" />
                  </div> */}
                </div>
              </div>
            </>
          )}

          
          {page === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Great, please help us with your details
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Title
                </label>
                <Field
                  as="select"
                  name="title"
                  className="block w-full py-2 px-3 rounded mb-2"
                >
                  <option value="">Please select...</option>
                  <option value="mr">Mr.</option>
                  <option value="ms">Ms.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="dr">Dr.</option>
                </Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  First name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="block w-full py-2 px-3 rounded mb-2"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="middleName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Middle name (Optional)
                </label>
                <Field
                  name="middleName"
                  type="text"
                  className="block w-full py-2 px-3 rounded mb-2"
                />
                <ErrorMessage
                  name="middleName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Last name field */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Last name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="block w-full py-2 px-3 rounded mb-2"
                  required
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date of birth
                </label>
                <div className="flex gap-2">
                  <Field
                    name="day"
                    type="number"
                    placeholder="Day"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                  />
                  <ErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />

                  <Field
                    name="month"
                    type="number"
                    placeholder="Month"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                  />
                  <ErrorMessage
                    name="month"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />

                  <Field
                    name="year"
                    type="number"
                    placeholder="Year"
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
                  />
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
            </>
          )}

          {/* Page 2 */}
          {page === 2 && (
            <>
              <div>2</div>
            </>
          )}
          {/* Page 3 */}
          {page === 3 && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                <ErrorMessage name="age" component="div" />
              </div>
            </>
          )}
          {/* Page 4 */}
          {page === 4 && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                <ErrorMessage name="age" component="div" />
              </div>
            </>
          )}
          {/* Page 5 */}
          {page === 5 && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                <ErrorMessage name="age" component="div" />
              </div>
            </>
          )}
          {/* Page 6 - Final page */}
          {page === 6 && (
            <>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="age">Age</label>
                <Field name="age" type="number" />
                <ErrorMessage name="age" component="div" />
              </div>
            </>
          )}

          <div className="w-[50%] flex justify-between mt-24">
            {page >= 0 && (
              <button type="button" onClick={handlePrev}>
                Back
              </button>
            )}
            {page < 6 && (
              <button
                className=""
                type="button"
                onClick={() => setPage(page + 1)}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next
              </button>
            )}

            {page === 6 && (
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            )}
          </div>

          <div className="absolute top-4 right-4">
            <div>Time: {elapsedTime.toFixed(2)} seconds</div>
            {page > 6 && (
              <div>Form completed in {elapsedTime.toFixed(2)} seconds.</div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MultiPageForm;
