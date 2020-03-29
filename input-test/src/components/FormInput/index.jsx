import React, {useCallback} from 'react';
import PropTypes from 'prop-types'
import './index.css';
import {FormContext} from "../FormLayout";
import {getClassNames} from "../../hooks";

function FormInput({className, name, ...args}) {

  return (
    <FormContext.Consumer>
      {({values, setValue}) => (
        <input
          value={values[name] || ''}
          className={getClassNames('form-input', className)}
          onChange={e => {
            e.preventDefault();
            setValue(name, e.target.value);
          }}
          {...args}
        />

      )}
    </FormContext.Consumer>
  );
}

FormInput.propTypes =  {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default FormInput;
