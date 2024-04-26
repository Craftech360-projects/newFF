import React from "react";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <div className="flex w-screen flex-col h-screen  items-center">
        <img src="/pip.png" width="100%" />
        <div className="font-sans">
          {/* Main Content */}
          <div className="container mx-auto my-8 p-8 bg-white rounded">
            <h1 className="text-5xl mb-16 text-gray-600">Ready to continue?</h1>
            <p className="mb-8 text-gray-600">
              Your next step now is to get a Decision in Principle which will
              give you an estimate of the amount you may be able to borrow based
              on your individual circumstances, expenditure and property
              details.
            </p>
            <ul className="pl-5 mb-5">
              <div className="flex">
                <div className="w-20">
                  <img src="/rightt.png" />
                </div>
                <li className="text-gray-600">
                  A Decision in Principle will give you an indication of the
                  amount you may be able to borrow, and will have no impact on
                  your credit score. This won't be seen in searches by other
                  companies.
                </li>
              </div>

              <div className="flex">
                <div className="w-12">
                  <img src="/rightt.png" />
                </div>
                <li className="text-gray-600">
                  It is useful to have if you're house hunting, to show estate
                  agents that you're serious about buying a property.
                </li>
              </div>

              <div className="flex">
                <div className="w-10">
                  <img src="/rightt.png" />
                </div>
                <li className="text-gray-600">It does not commit you to apply for a HSBC mortgage.</li>
              </div>
            </ul>
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-2 mt-10">
                Get a Decision in Principle
              </h2>
              <div className="flex justify-center items-center mt-10">
                <div className="mt-5">
                  <img src="/jpp.jpg" width="90%" alt="" />
                </div>

                <div className="w-[85%]">
                  <p className="mb-4 mt-6 text-gray-600">
                    After receiving your Decision in Principle you can choose to
                    receive mortgage advice, or if you already know which
                    mortgage you wish to apply for, you can complete your
                    application entirely online, however, you will not receive
                    advice.
                  </p>
                  <Link  href="/nouse" className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300">
                    Get a Decision in Principle
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
