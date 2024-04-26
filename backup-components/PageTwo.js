// pages/index.js or any component file
import React from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';

const formData = [
  { name: 'title', type: 'select', placeholder: 'Title', options: ['Mr', 'Ms', 'Mrs', 'Dr'] },
  { name: 'firstName', type: 'text', placeholder: 'First name' },
  { name: 'middleName', type: 'text', placeholder: 'Middle name (Optional)' },
  { name: 'lastName', type: 'text', placeholder: 'Last name' },
];

const dateOfBirthFields = [
  { name: 'day', type: 'number', placeholder: 'Day', min: 1, max: 31 },
  { name: 'month', type: 'number', placeholder: 'Month', min: 1, max: 12 },
  { name: 'year', type: 'number', placeholder: 'Year', min: 1915, max: new Date().getFullYear() },
];

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Please select your title.'),
  firstName: Yup.string().required('First name is required.'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is required.'),
  day: Yup.number().min(1, 'Invalid day').max(31, 'Invalid day').required('Day is required.'),
  month: Yup.number().min(1, 'Invalid month').max(12, 'Invalid month').required('Month is required.'),
  year: Yup.number().min(1915, 'Invalid year').max(new Date().getFullYear(), 'Invalid year').required('Year is required.'),
});

const DynamicField = ({ fieldData }) => {
  const [field, meta] = useField(fieldData);
  const inputClasses = `block w-full py-2 px-3 border ${
    meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'
  }`;

  return (
    <div className="mb-4">
      <label htmlFor={fieldData.name} className="block text-gray-500 text-sm font-medium mb-2">
        {fieldData.placeholder}
      </label>
      {fieldData.type === 'select' ? (
        <Field as="select" name={fieldData.name} className={`${inputClasses} appearance-none `} {...field}>
          <option value="">{fieldData.placeholder}</option>
          {fieldData.options.map(option => (
            <option  key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
      ) : (
        <Field name={fieldData.name} type={fieldData.type} placeholder={fieldData.placeholder} className={inputClasses} {...field} min={fieldData.min} max={fieldData.max} />
      )}
      <ErrorMessage name={fieldData.name} component="div" className="text-red-500 text-xs italic" />
    </div>
  );
};

const PageTwo = () => {
  const initialValues = formData.concat(dateOfBirthFields).reduce((values, field) => {
    values[field.name] = '';
    return values;
  }, {});

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg max-w-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form>

            <h2 className="text-3xl font-semibold mb-4 text-gray-700">Great, please help us with your details</h2>
            
            {formData.map(field => (
              <DynamicField key={field.name} fieldData={field} />
            ))}

            <div className="mb-4">
              <span className="block text-gray-500 text-base font-medium mb-2">Date of birth</span>
              <div className="flex gap-3">
                {dateOfBirthFields.map(field => (
                  <DynamicField key={field.name} fieldData={field} />
                ))}
              </div>
            </div>

            {/* btn */}
            <div className="flex items-center justify-between">
              <button type="button" className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Back
              </button>
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Continue
              </button>
            </div>
            {/* btn end */}

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PageTwo;
