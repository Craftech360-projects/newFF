// // pageFour.js
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';
// import { useRouter } from 'next/router';
// import { useFormData } from '../components/FormDataContext'; // replace with actual path

// // Validation schema for address details
// const validationSchema = Yup.object({
//   houseNumber: Yup.string().required('Please enter your house number or name.'),
//   building: Yup.string(),
//   street: Yup.string(),
//   district: Yup.string(),
//   town: Yup.string(),
//   country: Yup.string(),
//   postcode: Yup.string().required('Please enter your post code.'),
//   yearsLived: Yup.number()
//     .min(0, 'Invalid number of years')
//     .required('Years lived is required.'),
//   monthsLived: Yup.number()
//     .min(0, 'Invalid number of months')
//     .max(11, 'Months must be less than 12')
//     .required('Months lived is required.'),
//   previousAddress: Yup.string().when(['yearsLived', 'monthsLived'], {
//     is: (yearsLived, monthsLived) => parseInt(yearsLived, 10) * 12 + parseInt(monthsLived, 10) < 36,
//     then: Yup.string().required('Previous address is required because you lived here less than 3 years.'),
//   }),
// });

// const PageFour = () => {
//   const { formData, updateFormData } = useFormData();
//   const router = useRouter();

//   const userName = formData.name || 'Customer'; // Assume you have the user's name stored

//   // Define initial form values
//   const initialValues = {
//     houseNumber: '',
//     building: '',
//     street: '',
//     district: '',
//     town: '',
//     country: '',
//     postcode: '',
//     yearsLived: '',
//     monthsLived: '',
//     previousAddress: '', // This field is conditional based on the yearsLived and monthsLived
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-md">
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={(values, actions) => {
//           updateFormData(values);
//           router.push('/pageFive'); // Navigate to the next form step
//           actions.setSubmitting(false);
//         }}
//       >
//         {({ values, errors, touched, isSubmitting }) => (
//           <Form>
//             <h2 className="text-xl font-semibold mb-4">{userName}, what is your current address?</h2>

//             {/* House number/name field */}
//             <div className="mb-4">
//               <label htmlFor="houseNumber" className="block text-gray-700 text-sm font-bold mb-2">House number/name</label>
//               <Field name="houseNumber" type="text" className={`block w-full py-2 px-3 rounded mb-2 border ${errors.houseNumber && touched.houseNumber ? 'border-red-500' : 'border-gray-300'}`} />
//               <ErrorMessage name="houseNumber" component="div" className="text-red-500 text-xs italic" />
//             </div>

//             {/* Additional address fields */}
//             {/* Repeat this block for each additional field: building, street, etc. */}
//             <div className="mb-4">
//               <label htmlFor="postcode" className="block text-gray-700 text-sm font-bold mb-2">Post code</label>
//               <Field name="postcode" type="text" className={`block w-full py-2 px-3 rounded mb-2 border ${errors.postcode && touched.postcode ? 'border-red-500' : 'border-gray-300'}`} />
//               <ErrorMessage name="postcode" component="div" className="text-red-500 text-xs italic" />
//             </div>

//             {/* Years and months lived */}
//             <div className="flex gap-3 mb-4">
//               <div>
//                 <label htmlFor="yearsLived" className="block text-gray-700 text-sm font-bold mb-2">Years lived</label>
//                 <Field name="yearsLived" type="number" className={`block w-full py-2 px-3 rounded border ${errors.yearsLived && touched.yearsLived ? 'border-red-500' : 'border-gray-300'}`} />
//                 <ErrorMessage name="yearsLived" component="div" className="text-red-500 text-xs italic" />
//               </div>
//               <div>
//                 <label htmlFor="monthsLived" className="block text-gray-700 text-sm font-bold mb-2">Months lived</label>
//                 <Field name="monthsLived" type="number" className={`block w-full py-2 px-3 rounded border ${errors.monthsLived && touched.monthsLived ? 'border-red-500' : 'border-gray-300'}`} />
//                 <ErrorMessage name="monthsLived" component="div" className="text-red-500 text-xs italic" />
//               </div>
//             </div>

//             {/* Previous address */}
//             {(parseInt(values.yearsLived, 10) * 12 + parseInt(values.monthsLived, 10) < 36) && (
//               <div className="mb-4">
//                 <label htmlFor="previousAddress" className="block text-gray-700 text-sm font-bold mb-2">Previous address</label>
//                 <Field name="previousAddress" type="text" className={`block w-full py-2 px-3 rounded mb-2 border ${errors.previousAddress && touched.previousAddress ? 'border-red-500' : 'border-gray-300'}`} />
//                 <ErrorMessage name="previousAddress" component="div" className="text-red-500 text-xs italic" />
//               </div>
//             )}

//             {/* Navigation buttons */}
//             <div className="flex items-center justify-between mt-6">
//               <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageThree')}>
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

// export default PageFour;

// pageFour.js
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext"; // Replace with the actual path to your context

const validationSchema = Yup.object({
  houseNumber: Yup.string().required("Please enter your house number or name."),
  building: Yup.string(),
  street: Yup.string(),
  district: Yup.string(),
  town: Yup.string(),
  country: Yup.string(),
  postcode: Yup.string().required("Please enter your postcode."),
  yearsLived: Yup.number()
    .min(0, "Invalid number of years")
    .required("Years lived is required."),
  monthsLived: Yup.number()
    .min(0, "Invalid number of months")
    .max(11, "Months must be less than 12")
    .required("Months lived is required."),
  previousAddress: Yup.string().when(["yearsLived", "monthsLived"], {
    is: (yearsLived, monthsLived) =>
      parseInt(yearsLived, 10) * 12 + parseInt(monthsLived, 10) < 36,
    then: Yup.string().required("Please enter your previous address."),
  }),
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

const PageFour = () => {
  const { formData, updateFormData, counter } = useFormData();
  const router = useRouter();
  const userName = formData.firstName || "Customer";

  
  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };
  
  const initialValues = {
    houseNumber: "",
    building: "",
    street: "",
    district: "",
    town: "",
    country: "",
    postcode: "",
    yearsLived: "",
    monthsLived: "",
    previousAddress: "",
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          updateFormData(values);
          router.push("/pageFive");
          actions.setSubmitting(false);
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="mt-6">
            <h2 className="text-3xl font-medium mb-4">
              <span className="capitalize font-semibold text-red-700">
                {userName}
              </span>
              , what is your current address?
            </h2>

            {/* House number/name field */}
            <div className="mb-4 mt-10">
              <h2 className="text-gray-700">Current address</h2>
              <label
                htmlFor="houseNumber"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                House number/name
              </label>
              <Field
                name="houseNumber"
                type="text"
                className={`block w-full py-2 px-3 rounded mb-2 border ${
                  errors.houseNumber && touched.houseNumber
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <FormErrorMessage
                name="houseNumber"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            {/* Additional address fields */}
            <div className="mb-4">
              <label
                htmlFor="building"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Building (Optional)
              </label>
              <Field
                name="building"
                type="text"
                className="block w-full py-2 px-3 rounded mb-2 border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="street"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Street (Optional)
              </label>
              <Field
                name="street"
                type="text"
                className="block w-full py-2 px-3 rounded mb-2 border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                District (Optional)
              </label>
              <Field
                name="district"
                type="text"
                className="block w-full py-2 px-3 rounded mb-2 border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="town"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Town
              </label>
              <Field
                name="town"
                type="text"
                className="block w-full py-2 px-3 rounded mb-2 border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Country (Optional)
              </label>
              <Field
                name="country"
                type="text"
                className="block w-full py-2 px-3 rounded mb-2 border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="postcode"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Postcode
              </label>
              <Field
                name="postcode"
                type="text"
                className={`block w-full py-2 px-3 rounded mb-2 border ${
                  errors.postcode && touched.postcode
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              <FormErrorMessage
                name="postcode"
                component="div"
                className="text-red-500 text-xs italic"
              />
            </div>

            {/* Years and months lived */}
            <div className="flex gap-3 mb-4 flex-col">
              <h2>How long have you lived here?</h2>
              <p className="text-xs text-gray-700 mb-2">
                vfbgn regerhg grht ergth ret ryet greht erwhte
              </p>
              <div className="flex gap-5">
                <div>
                  <label
                    htmlFor="yearsLived"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Years lived
                  </label>
                  <Field
                    name="yearsLived"
                    type="number"
                    className={`block w-full py-2 px-3 rounded border ${
                      errors.yearsLived && touched.yearsLived
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <FormErrorMessage
                    name="yearsLived"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>

                <div>
                  <label
                    htmlFor="monthsLived"
                    className="block text-gray-700 text-sm font-medium mb-2"
                  >
                    Months lived
                  </label>
                  <Field
                    name="monthsLived"
                    type="number"
                    className={`block w-full py-2 px-3 rounded border ${
                      errors.monthsLived && touched.monthsLived
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  <FormErrorMessage
                    name="monthsLived"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
              </div>
            </div>

            {/* Conditional previous address field
            {parseInt(values.yearsLived, 10) * 12 +
              parseInt(values.monthsLived, 10) <
              36 && (
              <div className="mb-4">
                <label
                  htmlFor="previousAddress"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Previous address
                </label>
                <Field
                  name="previousAddress"
                  type="text"
                  className={`block w-full py-2 px-3 rounded border ${
                    errors.previousAddress && touched.previousAddress
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <FormErrorMessage
                  name="previousAddress"
                  component="div"
                  className="text-red-500 text-xs italic"
                />
              </div>
            )} */}

            {/* Navigation buttons */}
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
  );
};

export default PageFour;
