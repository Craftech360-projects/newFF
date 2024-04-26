// // pages/index.js
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/router';
// import { useFormData } from '../components/FormDataContext';
// import { useEffect } from 'react';

// // Define your form fields in JSON
// const formData = [
//   {
//     name: 'whatAreYouLookingToDo',
//     type: 'select',
//     placeholder: 'What are you looking to do?',
//     options: ['Option 1', 'Option 2', 'Option 3'],
//   },
//   {
//     name: 'whosApplying',
//     type: 'radio',
//     options: [
//       { label: 'Just me', value: 'single' },
//       { label: 'Me & someone else', value: 'joint' },
//     ],
//   },
//   {
//     name: 'propertyValue',
//     type: 'text',
//     placeholder: 'Property value',
//   },
//   {
//     name: 'depositAmount',
//     type: 'text',
//     placeholder: 'Deposit amount',
//   },
//   {
//     name: 'mortgageTerm',
//     type: 'select',
//     placeholder: 'What mortgage term are you thinking of?',
//     options: ['5 years', '10 years', '15 years'],
//   },
// ];

// // Define Yup validation schema
// const validationSchema = Yup.object({
//   whatAreYouLookingToDo: Yup.string().required('Please make a selection.'),
//   whosApplying: Yup.string().required('Please select who is applying.'),
//   propertyValue: Yup.number()
//     .required('Property value is required.')
//     .min(50000, 'Property value must be at least £50,000.'),
//   depositAmount: Yup.number().required('Deposit amount is required.'),
//   mortgageTerm: Yup.string().required('Please select a mortgage term.'),
// });

// // Dynamic form field component
// const DynamicField = ({ fieldData }) => {
//   const [field, meta] = useField(fieldData);
//   const inputClasses = `block w-full py-2 px-3 border ${
//     meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
//   }`;

//   return (
//     <div className="mb-4">
//       {fieldData.type === 'select' ? (
//         <>
//           <label className="block text-gray-700 text-sm font-bold mb-2">{fieldData.placeholder}</label>
//           <Field as="select" name={fieldData.name} className={`${inputClasses} appearance-none`} {...field}>
//             <option value="">{fieldData.placeholder}</option>
//             {fieldData.options.map(option => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </Field>
//         </>
//       ) : fieldData.type === 'radio' ? (
//         fieldData.options.map(option => (
//           <label key={option.value} className="inline-flex items-center mt-3">
//             <Field type="radio" name={fieldData.name} value={option.value} className="form-radio h-5 w-5 text-gray-600" {...field} />
//             <span className="ml-2 text-gray-700">{option.label}</span>
//           </label>
//         ))
//       ) : (
//         <>
//           <label className="block text-gray-700 text-sm font-bold mb-2">{fieldData.placeholder}</label>
//           <Field name={fieldData.name} type="text" placeholder={fieldData.placeholder} className={inputClasses} {...field} />
//         </>
//       )}
//       <ErrorMessage name={fieldData.name} component="div" className="text-red-500 text-xs italic" />
//     </div>
//   );
// };

// const PageOne = () => {
//     const { updateFormData } = useFormData();
//   const router = useRouter();
//   // Define initial values
//   const initialValues = formData.reduce((values, field) => {
//     values[field.name] = '';
//     return values;
//   }, {});

//   useEffect(() => {
//     if (!startTime) { 
//       setStartTime(Date.now());
//       console.log('Start Time set at:', new Date());
//     }
//   }, [startTime, setStartTime]);

//   return (
//     <div className="container mx-auto p-6 bg-white max-w-md">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         // onSubmit={(values, actions) => {
//         //   console.log(values);
//         //   actions.setSubmitting(false);
//         // }}
//         onSubmit={(values, actions) => {
//             updateFormData(values); // Update the global form state
//             router.push('/pageTwo'); // Navigate to the next form step
//             actions.setSubmitting(false);
//           }}
//       >
//         {({isSubmitting }) => (
//           <Form>
//             <h2 className="text-4xl font-medium mb-14 text-gray-700">First, we need to know...</h2>
//             {formData.map(field => (
//               <DynamicField key={field.name} fieldData={field} />
//             ))}
//             <div className="flex items-center justify-between mt-6">
//               <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Back
//               </button>
//               <button type="submit" disabled={isSubmitting} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
//                 Continue
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default PageOne;
















// pages/index.js
import React from "react";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext";
import { useEffect } from "react";

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

// Define your form fields in JSON
const formData = [
  {
    name: "whatAreYouLookingToDo",
    type: "select",
    placeholder: "Please select",
    options: ["Buy my first home", "Move home", "Remortgage"],
    label: "What are you looking to do?",
  },
  {
    name: "whosApplying",
    type: "radio",
    options: [{ label: "Just me", value: "single" }],
  },
  {
    name: "propertyValue",
    type: "text",
    placeholder: "Property value",
    text: "You can enter a property value or a deposit amount, or both",
  },
  {
    name: "depositAmount",
    type: "text",
    placeholder: "Deposit amount",
  },
  {
    name: "mortgageTerm",
    type: "select",
    placeholder: "Please select",
    options: ["5 years", "10 years", "15 years"],
    text: "What mortgage term are you thinking of?",
  },
];

// Define Yup validation schema
const validationSchema = Yup.object({
  whatAreYouLookingToDo: Yup.string().required("Please make a selection."),
  whosApplying: Yup.string().required("Please select who is applying."),
  propertyValue: Yup.number()
    .required("Property value is required.")
    .min(50000, "Property value must be at least £50,000."),
  depositAmount: Yup.number().required("Deposit amount is required."),
  mortgageTerm: Yup.string().required("Please select a mortgage term."),
});

// Dynamic form field component
// const DynamicField = ({ fieldData }) => {
//   const [field, meta] = useField(fieldData);
//   const inputClasses = `block w-full py-2 px-3 border ${
//     meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
//   }`;

//   return (
//     <div className="mb-4">
//       {fieldData.type === 'select' ? (
//         <>
//           <label className="block text-gray-700 text-sm font-bold mb-2">{fieldData.placeholder}</label>
//           <Field as="select" name={fieldData.name} className={`${inputClasses} appearance-none`} {...field}>
//             <option value="">{fieldData.placeholder}</option>
//             {fieldData.options.map(option => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </Field>
//         </>
//       ) : fieldData.type === 'radio' ? (
//         fieldData.options.map(option => (
//           <label key={option.value} className="inline-flex items-center mt-3">
//             <Field type="radio" name={fieldData.name} value={option.value} className="form-radio h-5 w-5 text-gray-600" {...field} />
//             <span className="ml-2 text-gray-700">{option.label}</span>
//           </label>
//         ))
//       ) : (
//         <>
//           <label className="block text-gray-700 text-sm font-bold mb-2">{fieldData.placeholder}</label>
//           <Field name={fieldData.name} type="text" placeholder={fieldData.placeholder} className={inputClasses} {...field} />
//         </>
//       )}
//       <ErrorMessage name={fieldData.name} component="div" className="text-red-500 text-xs italic" />
//     </div>
//   );
// };

const DynamicField = ({ fieldData }) => {
  const [field, meta] = useField(fieldData);
  const inputClasses = `block w-full py-2 px-3 border ${
    meta.touched && meta.error ? "border-red-500" : "border-gray-300"
  }`;

  return (
    <div className="mb-4">
      {fieldData.type === "select" ? (
        <>
          <h2 className="text-base text-gray-700 text-[15px]">
            {fieldData.text}
          </h2>
          <label className="block text-gray-700 text-[15px] font-medium mb-2">
            {fieldData.label}
          </label>
          <Field
            as="select"
            name={fieldData.name}
            className={`${inputClasses} appearance-none`}
          >
            <option value="">{fieldData.placeholder}</option>
            {fieldData.options.map((option) => (
              <option className="rounded-none" key={option} value={option}>
                {option}
              </option>
            ))}
          </Field>
        </>
      ) : fieldData.type === "radio" ? (
        fieldData.options.map((option) => (
          <div key={option.value} className="mb-2">
            <h2 className="mb-2 text-gray-700 text-[15px]">Who's applying?</h2>
            <Field
              type="radio"
              name={fieldData.name}
              value={option.value}
              className="form-radio h-5 w-5 text-gray-600"
            />
            <label className="ml-2 text-gray-700">{option.label}</label>
          </div>
        ))
      ) : (
        <>
          <h2 className="text-base text-gray-700 text-[15px]">
            {fieldData.text}
          </h2>
          <label className="block text-gray-700 text-[15px] font-medium mb-2">
            {fieldData.placeholder}
          </label>
          <Field
            name={fieldData.name}
            type="text"
            placeholder={fieldData.placeholder}
            className={inputClasses}
          />
        </>
      )}
      <FormErrorMessage
        name={fieldData.name}
        component="div"
        className="text-red-500 text-xs italic"
      />
    </div>
  );
};

const PageOne = () => {
  const { updateFormData, setElapsedTime,  counter   } = useFormData();
  const router = useRouter();
  // Define initial values
  const initialValues = formData.reduce((values, field) => {
    values[field.name] = "";
    return values;
  }, {});


  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };



  

  return (
    <div className="flex w-screen h-screen justify-center items-center ">
    <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>
      <div className="container mx-auto p-6  max-w-md">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          // onSubmit={(values, actions) => {
          //   console.log(values);
          //   actions.setSubmitting(false);
          // }}
          onSubmit={(values, actions) => {
            updateFormData(values); // Update the global form state
            router.push("/pageTwo"); // Navigate to the next form step
            actions.setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <h2 className="text-3xl font-medium mb-14 text-gray-700">
                First, we need to know...
              </h2>
              {formData.map((field) => (
                <DynamicField key={field.name} fieldData={field} />
              ))}
              <div className="flex items-center justify-between mt-8">
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

export default PageOne;

