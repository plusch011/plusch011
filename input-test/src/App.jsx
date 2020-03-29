import React from 'react';
import './App.css';
import FormInput from "./components/FormInput";
import FormLayout from "./components/FormLayout";

import {initialValues, buyerOptions, carTitleOptions} from "./constants";
import FormSelect from "./components/FormSelect";

function App() {
  const optionsFormatter = ({label, icon}) => {
    return (
      <div className='formatter'>
        {icon}
        <span className="formatter-label">{label}</span>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="app-title">New Page</div>
      <FormLayout initialValues={initialValues}>
        <FormSelect
          name='buyer'
          options={buyerOptions}
          className='buyer-select'
        />
        <FormSelect
          name='car_title'
          placeholder='Car title'
          options={carTitleOptions}
          optionsFormatter={optionsFormatter}
        />
        <FormInput name='textfield_1' placeholder="Text field"/>
        <FormInput name='textfield_2' placeholder="Text field"/>
        <FormInput name='textfield_3' placeholder="Text field"/>
      </FormLayout>
    </div>
  );
}

export default App;
