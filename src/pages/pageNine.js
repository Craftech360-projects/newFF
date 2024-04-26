// pageNine.js
import React from "react";
import { useRouter } from "next/router";
import { useFormData  } from '../components/FormDataContext';

const PageNine = () => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back(); // This will take you back to the previous page in the history stack
  };
  
  const { counter } = useFormData();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <p className="absolute top-10 right-10"><span className="font-bold text-2xl text-red-600">{counter}</span> seconds</p>
      <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
        <h2 className="text-4xl font-medium mb-10">What happens next?</h2>
        <p className="mb-4">
        In a real Decision in Principle application process, this is the point at which an automated soft bureau credit search will be conducted. This takes a few seconds and the outcome will be displayed on the screen and also sent real-time to your registered email ID as well. This does not affect the applicant's credit rating.
        </p>
      

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
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => router.push("/pageTen")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNine;
