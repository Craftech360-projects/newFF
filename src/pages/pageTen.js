// // pageTen.js
// import React, { useContext } from 'react';
// import { useRouter } from 'next/router';
// import { FormDataContext } from '../components/FormDataContext'; // Adjust the path as needed
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabaseUrl = 'your-supabase-url';
// const supabaseAnonKey = 'your-supabase-anon-key';
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// const PageTen = () => {
//   const { formData } = useContext(FormDataContext);
//   const router = useRouter();

//   const handleSubmit = async () => {
//     // Log all form data to the console
//     console.log('Submitting the following data to Supabase:', formData);

//     // Call Supabase to insert the data
//     const { data, error } = await supabase
//       .from('your-table-name') // Replace with your table name
//       .insert([formData]); // Submit the form data

//     if (error) {
//       console.error('Error submitting form to Supabase', error);
//     } else {
//       console.log('Form submitted successfully', data);
//       // Redirect to a success page or display a success message
//       router.push('/submission-success');
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-md text-center">
//       <h2 className="text-xl font-semibold mb-4">Review your details</h2>

//       {/* Optionally, display a summary of formData for review */}

//       <button
//         type="button"
//         className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
//         onClick={handleSubmit}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// export default PageTen;

// PageTen.js
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useFormData } from "../components/FormDataContext"; // Adjust the import path
import { supabase } from "../../supabaseClient"; // Adjust the import path

const PageTen = () => {
  const { formData, elapsedTime, counter } = useFormData();
  // Retrieve form data from context
  const router = useRouter();
  // Here we need to make sure to use the correct names from the formData
  const totalAnnualIncome = parseFloat(formData.totalAnnualIncome) || 0;
  // Assuming you want to sum all outgoings from PageSeven
  const totalOutgoings = [
    parseFloat(formData.otherOutgoings),
  ].reduce((sum, value) => sum + (value || 0), 0); // Sum up all outgoings, defaulting any undefined values to 0

  const mortgage = (totalAnnualIncome - totalOutgoings) * 5;

  const handleSubmit = async () => {
    const submissionData = { ...formData, duration: counter };
    console.log("Final form data before submission:", submissionData);

    const { data, error } = await supabase
      .from("form_data") // Replace with your table name
      .insert([submissionData]); // Insert the form data
    if (error) {
      alert("Error submitting form: " + error.message);
    } else {
      console.log("Form submitted successfully", data);
      console.log("formData:", formData);
      // Optionally, redirect the user after successful submission
      setTimeout(() => {
        router.push("/");
      }, 1000); // Adjust the path as needed
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white  max-w-[40rem] text-center flex flex-col justify-center items-center h-screen">
      <div className=" p-6 text-left">
        <img src="/yamuna.png" alt="Mortgage Info" className="mx-auto mb-4" />
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">
          Good news, <span className="text-red-600 font-semibold capitalize">{formData.firstName}</span>!
        </h2>
        <div className="text-lg mb-4">
          <p className="text-xl font-medium mb-4 text-gray-700">Based on what you've told us</p>
          <p className="text-gray-700">we may be able to offer you:</p>
          <p className="font-bold text-2xl"><span className="text-red-600">₹</span>{mortgage.toFixed(2)}</p>
        </div>
        <div className="text-lg mb-4 text-gray-700">
          <p className="text-gray-700">your property value:</p>
          <p className="font-bold text-2xl"><span className="text-red-600">₹</span>{formData.propertyValue}</p>
        </div>
        {/* Other details... */}
      </div>
      {/* Optionally, display a summary of formData for review */}

      <button
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
        onClick={handleSubmit}
      >
        Return to HSBC home
      </button>
    </div>
  );
};

export default PageTen;
