import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types'
import './index.css';
import {FormContext} from "../FormLayout";


function FormSelect({
                      className,
                      placeholder,
                      name, options,
                      optionsMap = {valueFieldName: 'value', labelFieldName: 'label'},
                      optionsFormatter,
                      ...args}) {
  const {values, setValue} = useContext(FormContext);
  const value = values[name];
  const [isMenuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);


  const handleClickOutside = e => {
    const container = e.target.closest('.form-select--container');

    container != containerRef.current && setMenuOpen(false);

    console.log(container, isMenuOpen);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (e, value) => {
    setValue(name, value);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setValue(name, '');
  };


  const getCurrent = () => {
    if(!value) return <span className='form-select--placeholder'>{placeholder || `Select ${name}`}</span>;

    const option = options.find(option => value == option[optionsMap.valueFieldName]);

    return optionsFormatter ? optionsFormatter(option) : option[optionsMap.labelFieldName];
  };

  const getOptionLabel = option => {
    return optionsFormatter ? optionsFormatter(option) : option[optionsMap.labelFieldName];
  };

  const getClassNames = useCallback(() => {
    const classNames = ['form-select--container'];

    className && classNames.push(className);

    isMenuOpen && classNames.push('form-select--container__open');

    return classNames.join(' ');
  }, [isMenuOpen]);

  return (
    <div tabIndex="0"
         {...args}
         className={getClassNames()}
         ref={containerRef}
         onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <span className="form-select--current">{getCurrent()}</span>
      <div className="form-select--clear" onClick={handleClear}>&times;</div>
      <div className="form-select--expand">
        <div className="form-select--expand-triangle"></div>
      </div>

      <div className={`form-select--options`}>
        {options.map(option =>
          <div
            key={`${option[optionsMap.valueFieldName]}${option[optionsMap.labelFieldName]}`}
            value={option[optionsMap.valueFieldName]}
            className={`form-select--option ${value == option[optionsMap.valueFieldName] ? 'form-select--option__selected' : ''}`}
            onClick={(e) => handleSelect(e, option[optionsMap.valueFieldName])}
          >
            {getOptionLabel(option)}
          </div>
        )}
      </div>
    </div>
  );
}

FormSelect.propTypes =  {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  optionsMap: PropTypes.shape({
    valueFieldName: PropTypes.string,
    labelFieldName: PropTypes.string,
  }),
  optionsFormatter: PropTypes.func,
};

export default FormSelect;