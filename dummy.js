<div>
<h2>Great, please help us with your deatails</h2>
<div>
  <div className="my-2">
    <label
      htmlFor="option"
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      Title
    </label>
    <div className="mt-2">
      <Field
        as="select"
        name="option"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
      >
        <option value="">Select an option</option>
        <option value="option1">Mr,</option>
        <option value="option2">Mrs,</option>
        <option value="option2">Miss,</option>
        <option value="option2">Ms,</option>
        <option value="option2">Mx,</option>
        <option value="option2">Dr,</option>
        <option value="option2">Others</option>
      </Field>
    </div>
    <ErrorMessage name="option" component="div" />
  </div>
</div>
<div>
  <label htmlFor="firstName">First Name</label>
  <Field
    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    name="firstName"
    type="text"
  />
  <ErrorMessage name="firstName" component="div" />
</div>
<div>
  <label htmlFor="lastName">Middle Name (Optional)</label>
  <Field
    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    name="lastName"
    type="text"
  />
  <ErrorMessage name="lastName" component="div" />
</div>
<div>
  <label htmlFor="lastName">Last Name</label>
  <Field
    className="block w-[300px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    name="lastName"
    type="text"
  />
  <ErrorMessage name="lastName" component="div" />
</div>
{/* <div>
  <label htmlFor="email">Email</label>
  <Field name="email" type="email" />
  <ErrorMessage name="email" component="div" />
</div>
<div>
  <label htmlFor="age">Age</label>
  <Field name="age" type="number" />
  <ErrorMessage name="age" component="div" />
</div> */}

<div>
  <div className="mb-6">
    <label
      for="dob"
      class="block text-gray-700 text-sm font-bold mb-2"
    >
      Date of birth
    </label>
    <div className="flex gap-2">
    <label htmlFor="lastName">Day</label>
      <Field
        type="text"
        id="day"
        name="name"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
        
      />
      <Field
        type="text"
        id="month"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
        
      />
      <Field
        type="text"
        id="year"
        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-1/3"
        
      />
    </div>
  </div>
</div>
</div>