// pageNine.js
import React from 'react';
import { useRouter } from 'next/router';

const PageNine = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
      <p className="mb-4">
        This is a demonstration of a multi-step form. In a live system, your information would be processed to give an indication of the amount we may be able to lend. As this is a demo, no actual credit search will be conducted.
      </p>
      <p className="mb-4">
        A decision in principle is not final, and we are not obligated to uphold its decision if your situation changes or if additional information comes to light.
      </p>
      <p className="mb-4">
        By continuing, you agree to receive documents electronically for the purposes of this demonstration.
      </p>
      <p className="mb-4">
        By selecting "Continue", you confirm that you have read the statements above and that you agree to proceed on this basis for the purposes of this demonstration.
      </p>
      
      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-6">
        <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/pageEight')}>
          Back
        </button>
        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => router.push('/finish')}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default PageNine;
