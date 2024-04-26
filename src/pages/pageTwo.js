// // pages/index.js or any component file
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/router';
// import { useFormData } from '../components/FormDataContext'; // Replace with the actual path to your context

// const formData = [
//   { name: 'title', type: 'select', placeholder: 'Title', options: ['Mr', 'Ms', 'Mrs', 'Dr'] },
//   { name: 'firstName', type: 'text', placeholder: 'First name' },
//   { name: 'middleName', type: 'text', placeholder: 'Middle name (Optional)' },
//   { name: 'lastName', type: 'text', placeholder: 'Last name' },
// ];

// const dateOfBirthFields = [
//   { name: 'day', type: 'number', placeholder: 'Day', min: 1, max: 31 },
//   { name: 'month', type: 'number', placeholder: 'Month', min: 1, max: 12 },
//   { name: 'year', type: 'number', placeholder: 'Year', min: 1915, max: new Date().getFullYear() },
// ];

// const allFields = [...formData, ...dateOfBirthFields];

// const validationSchema = Yup.object().shape({
//     title: Yup.string().required('Please select your title.'),
//     firstName: Yup.string().required('First name is required.'),
//     middleName: Yup.string(),
//     lastName: Yup.string().required('Last name is required.'),
//     day: Yup.number().min(1, 'Invalid day').max(31, 'Invalid day').required('Day is required.'),
//     month: Yup.number().min(1, 'Invalid month').max(12, 'Invalid month').required('Month is required.'),
//     year: Yup.number().min(1915, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Year is required.'),
//     // Add validation for other fields that are part of formData
//   });

//   const initialValues = {
//     title: '',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     day: '',
//     month: '',
//     year: '',
//     // Set initial values for other fields that are part of formData
//   };

// const DynamicField = ({ fieldData }) => {
//   const [field, meta] = useField(fieldData);
//   const inputClasses = `block w-full py-2 px-3 border ${
//     meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
//   }`;

//   return (
//     <div className="mb-4">
//       <label htmlFor={fieldData.name} className="block text-gray-500 text-sm font-medium mb-2">
//         {fieldData.placeholder}
//       </label>
//       {fieldData.type === 'select' ? (
//         <Field as="select" name={fieldData.name} className={`${inputClasses} appearance-none `} {...field}>
//           <option value="">{fieldData.placeholder}</option>
//           {fieldData.options.map(option => (
//             <option  key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </Field>
//       ) : (
//         <Field name={fieldData.name} type={fieldData.type} placeholder={fieldData.placeholder} className={inputClasses} {...field} min={fieldData.min} max={fieldData.max} />
//       )}
//       <ErrorMessage name={fieldData.name} component="div" className="text-red-500 text-xs italic" />
//     </div>
//   );
// };

// const PageTwo = () => {
// const { formData, updateFormData } = useFormData();
//   const router = useRouter();

// //   const initialValues = formData.concat(dateOfBirthFields).reduce((values, field) => {
// //     values[field.name] = '';
// //     return values;
// //   }, {});
// const handleSubmit = (values) => {
//     updateFormData(values); // Update the global form state
//     router.push('/pageThree'); // Navigate to the next form step
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values, actions) => {
//           console.log(values);
//           router.push('/pageThree');
//           actions.setSubmitting(false);
//         }}
//       >
//         {() => (
//           <Form>

//             <h2 className="text-3xl font-semibold mb-4 text-gray-700">Great, please help us with your details</h2>

//             {formData.map(field => (
//               <DynamicField key={field.name} fieldData={field} />
//             ))}

//             <div className="mb-4">
//               <span className="block text-gray-500 text-base font-medium mb-2">Date of birth</span>
//               <div className="flex gap-3">
//                 {dateOfBirthFields.map(field => (
//                   <DynamicField key={field.name} fieldData={field} />
//                 ))}
//               </div>
//             </div>

//             {/* btn */}
//             <div className="flex items-center justify-between">
//               <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Back
//               </button>
//               <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Continue
//               </button>
//             </div>
//             {/* btn end */}

//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default PageTwo;

// Assuming `formData` array is defined in your context or imported from another file
// For simplicity, we'll continue directly with `PageTwo.js` implementation

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext";

// Define Yup validation schema directly as provided
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Please select your title."),
  firstName: Yup.string().required("First name is required."),
  middleName: Yup.string(),
  lastName: Yup.string().required("Last name is required."),
  day: Yup.number()
    .min(1, "Invalid day")
    .max(31, "Invalid day")
    .required("Day is required."),
  month: Yup.number()
    .min(1, "Invalid month")
    .max(12, "Invalid month")
    .required("Month is required."),
  year: Yup.number()
    .min(1915, "Invalid year")
    .max(new Date().getFullYear(), "Invalid year")
    .required("Year is required."),
});

// Define initial values directly matching the schema's requirements
const initialValues = {
  title: "",
  firstName: "",
  middleName: "",
  lastName: "",
  day: "",
  month: "",
  year: "",
};

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

const PageTwo = () => {
  const { updateFormData, counter } = useFormData();
  const router = useRouter();

  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };

  const handleSubmit = (values) => {
    updateFormData(values); // Update the global form state
    router.push("/pageThree"); // Navigate to the next form step
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen">
          <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>

      <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false); // Ensure to set submitting to false after handling the submission
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-medium mb-4">
                Great, please help us with your details
              </h2>

              {/* Explicitly define form fields here */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-600 text-base font-medium mb-2"
                >
                  Title
                </label>
                <Field
                  as="select"
                  name="title"
                  className="block w-[230px] py-2 px-3 border border-gray-300 rounded mb-2"
                >
                  <option value="">Select...</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                  <option value="Other">Other</option>
                </Field>
                <FormErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* First Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <Field
                  name="firstName"
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                />
                <FormErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Middle Name Field (Optional) */}
              <div className="mb-4">
                <label
                  htmlFor="middleName"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Middle Name (Optional)
                </label>
                <Field
                  name="middleName"
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                />
                <FormErrorMessage
                  name="middleName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Last Name Field */}
              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <Field
                  name="lastName"
                  type="text"
                  className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                />
                <FormErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>

              {/* Date of Birth Fields: Day, Month, Year */}
              <div className="flex justify-between gap-3 mb-4">
                {/* Day Field */}
                <div className="w-full">
                  <label
                    htmlFor="day"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Day
                  </label>
                  <Field
                    name="day"
                    type="number"
                    className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                  />
                  <FormErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Month Field */}
                <div className="w-full">
                  <label
                    htmlFor="month"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Month
                  </label>
                  <Field
                    name="month"
                    type="number"
                    className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                  />
                  <FormErrorMessage
                    name="month"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Year Field */}
                <div className="w-full">
                  <label
                    htmlFor="year"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Year
                  </label>
                  <Field
                    name="year"
                    type="number"
                    className="block w-full py-2 px-3 border border-gray-300 rounded mb-2"
                  />
                  <FormErrorMessage
                    name="year"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>
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

export default PageTwo;
