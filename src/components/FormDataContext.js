// FormDataContext.js
import { createContext, useState, useContext, useEffect  } from 'react';

const FormDataContext = createContext(null);

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [counter, setCounter] = useState(0);

   // Depend on startTime to restart the timer if it's reset
  
   // Increment the counter every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000); // Increments every 1000 milliseconds

    return () => clearInterval(interval);
  }, []);

  const updateFormData = (newData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData, counter, setCounter }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
