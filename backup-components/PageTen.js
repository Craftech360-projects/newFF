// pageTen.js
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { FormDataContext } from "../src/components/FormDataContext"; // Adjust the path as needed
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = "your-supabase-url";
const supabaseAnonKey = "your-supabase-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const income = parseFloat(formData.totalAnnualIncome); // Assuming formData.income is the value from PageSix
const outgoings = parseFloat(formData.otherOutgoings); // Assuming formData.outgoings is the value from PageSeven

const mortgage = (income - outgoings) * 5;

const PageTen = () => {
  const { formData } = useContext(FormDataContext);
  const router = useRouter();

  const handleSubmit = async () => {
    // Log all form data to the console
    console.log("Submitting the following data to Supabase:", formData);

    // Call Supabase to insert the data
    const { data, error } = await supabase
      .from("your-table-name") // Replace with your table name
      .insert([formData]); // Submit the form data

    if (error) {
      console.error("Error submitting form to Supabase", error);
    } else {
      console.log("Form submitted successfully", data);
      // Redirect to a success page or display a success message
      setTimeout(() => {
        router.push("/");
      }, 5000);
    }
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-md text-center">
      <div className="text-center p-6">
        <img
          src="/yamuna.png"
          alt="Mortgage Info"
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-4">
          Good news, {formData.firstName}!
        </h2>
        <div className="text-lg mb-4">
          <p>Based on what you've told us, we may be able to offer you:</p>
          <p className="font-bold">₹{mortgage.toFixed(2)}</p>
        </div>
        {/* Other details... */}
      </div>
      {/* Optionally, display a summary of formData for review */}

      <button
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
        onClick={handleSubmit}
      >
        Return to HSBC home
      </button>
    </div>
  );
};

export default PageTen;
