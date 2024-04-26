import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const FormResponses = () => {
  const [responses, setResponses] = useState([]);

//   useEffect(() => {
//     const fetchFormResponses = async () => {
//       const { data, error } = await supabase
//         .from('form_responses')
//         .select('name, totalTime')
//         .order('totalTime', { ascending: true });

//       if (error) console.log('Error fetching data:', error);
//       else setResponses(data);
//     };

//     fetchFormResponses();
//   }, []);

useEffect(() => {
    const fetchFormResponses = async () => {
      const { data, error } = await supabase
        .from('form_responses')
        .select('firstName, totalTime')
        .order('totalTime', { ascending: false });
  
      if (error) console.error('Error fetching data:', error);
    //   else setResponses(data);
    else setResponses(data.map(item => ({ ...item, totalTime: parseFloat(item.totalTime) })));
    };
  
    fetchFormResponses();
    const interval = setInterval(fetchFormResponses, 5000); // Fetch every 10 seconds
  
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h2>Form Responses</h2>
      <ul>
        {responses.map((response, index) => (
          <li key={index}>{response.firstName} - {response.totalTime} seconds</li>
        ))}
      </ul>
    </div>
  );
};

export default FormResponses;
