import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

const FormResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchFormResponses = async () => {
      const { data, error } = await supabase
        .from("form_data")
        .select("firstName, duration")
        .order("duration", { ascending: true });
      if (error) console.error("Error fetching data:", error);
      else
        setResponses(
          data.map((item) => ({
            ...item,
            totalTime: parseFloat(item.totalTime),
          }))
        );
    };
    fetchFormResponses();
    const interval = setInterval(fetchFormResponses, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mainContainerBG">
     
      <div className="mb-4">
        {responses.length > 0 && (
          <div className="absolute top-[12rem] left-[55rem] text-center flex flex-col gap-[7.5rem]">
            <div>
              <h2 className="text-white font-semibold text-5xl">
                {responses[0].firstName}
              </h2>
            </div>
            <div>
              <h2 className="text-white font-semibold text-2xl">{responses[0].duration}</h2>
            </div>
          </div>
        )}
        {responses.length > 1 && (
          <div className="absolute top-[16rem] left-[29rem] text-center flex flex-col gap-[8rem]">
            <div>
              <h2 className="text-white font-semibold text-5xl">
                {responses[1].firstName}
              </h2>
            </div>
            <div>
              <h2 className="text-white font-semibold text-2xl">
                {responses[1].duration} Seconds
              </h2>
            </div>
          </div>
        )}
        {responses.length > 2 && (
          <div className="absolute top-[16rem] right-[28rem] text-center flex flex-col gap-[8rem]">
            <div>
              <h2 className="text-white font-semibold text-5xl">
                {responses[2].firstName}
              </h2>
            </div>
            <div>
              <h2 className="text-white font-semibold text-2xl">
                {responses[2].duration} Seconds
              </h2>
            </div>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-4">Form Responses</h2>
      <div className="w-[1200px] absolute top-[34rem] left-[23rem]">
        <table className="min-w-full table-auto">
          <thead className="bg-[#0c0f14] text-white">
            <tr>
              <th className="px-5 py-3 text-center text-white">Sl.No.</th>
              <th className="px-5 py-3 text-center text-white">Name</th>
              <th className="px-5 py-3 text-center text-white">Seconds</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#0f121a]' : 'bg-[#0C0F14]'}`}>
                <td className="px-4 py-3 text-center text-white">
                  {index + 1}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {response.firstName}
                </td>
                <td className="px-4 py-3 text-center text-white">
                  {response.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormResponses;
