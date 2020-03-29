import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types'
import './index.css';
import FormButton from "../FormButton";
import {getClassNames} from "../../hooks";

export const FormContext = createContext({});

function FormLayout({initialValues, className, children}) {
  const [values, setValues] = useState(initialValues || {});

  const handleReset = () => {
    setValues(initialValues || {});
  };

  const handleFilter = () => {
    console.log(values);
  };

  const setValue = (name, value) => {
    setValues({...values, [name]: value});
  };

  return (
    <div className={getClassNames('form-layout--container', className)}>
      <FormContext.Provider value={{values, setValue, setValues}}>
        {children}
        <div className='form-layout--buttons-container'>
          <FormButton onClick={handleReset} label="Reset"/>
          <FormButton onClick={handleFilter} label="Submit" className="form-layout--submit-button"/>
        </div>
      </FormContext.Provider>
    </div>
  );
}

FormLayout.propTypes =  {
  className: PropTypes.string,
  initialValues: PropTypes.object,
};

export default FormLayout;
