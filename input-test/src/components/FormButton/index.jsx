import React, {useCallback} from 'react';
import PropTypes from 'prop-types'
import './index.css';

function FormButton({className, label, onClick, ...args}) {
  const getClassNames = useCallback(() => {
    const classNames = ['form-button'];

    className && classNames.push(className);

    return classNames.join(' ');
  }, [className]) ;

  return (
    <button
      className={getClassNames()}
      onClick={onClick}
      {...args}
    >{label}</button>
  );
}

FormButton.propTypes =  {
  label: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default FormButton;
