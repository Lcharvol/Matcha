import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const FormField = ({
  field,
  values,
  errors,
  touched = {},
  className,
  ...props
}) => {
  const newProps =
    'domainValues' in field
      ? { ...props, domainValues: field.domainValues }
      : props;
  const value = 'value' in props ? props.value : values[field.name];
  return (
    <div className={className}>
      <field.component
        name={field.name}
        label={'label' in props ? props.label : field.label}
        value={value}
        error={(errors && touched[field.name] && errors[field.name]) || null}
        required={!value && !!field.required}
        {...newProps}
      />
    </div>
  );
};

FormField.propTypes = {
  field: PropTypes.object.isRequired,
  value: PropTypes.node,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  label: PropTypes.string,
  className: PropTypes.string,
};

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Error = styled.span`
  font-size: 0.9em;
  font-style: italic;
  color: #EA5555;
  margin-top: 5px;
`;

const StyledLabel = styled.label`
  color: rgb(45, 45, 45);
  margin-bottom:15px;
`;

export const Field = ({ label, error, required, className, children }) => (
  <StyledFormField className={className}>
    <StyledLabel>
      {label}
    </StyledLabel>
    {children}
    <Error>{error && `Error: ${error}`}</Error>
  </StyledFormField>
);

Field.propTypes = {
  children: PropTypes.element,
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

const InputStyled = styled.input`
  height: 36px;
  border-radius: 3px;
  background-color:rgb(250,250,250);
  box-shadow: inset 7px 6px 15px rgba(25, 25, 25, 0.05);
  border: 0;
  padding-left:20px;
`;

export const InputField = ({
  name,
  label,
  error,
  required,
  value = '',
  setFieldTouched,
  setFieldValue,
  ...props
}) => {
  const handleChange = e => {
    const newValue = e.target.value;
    setFieldTouched(name, newValue !== value);
    setFieldValue(name, newValue);
  };

  return (
    <Field label={label} error={error} required={required}>
      <InputStyled
        name={name}
        className="pt-input pt-fill"
        value={value}
        onChange={handleChange}
        dir="auto"
        {...props}
      />
    </Field>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
};

export const TextAreaField = ({
  name,
  label,
  error,
  required,
  value = '',
  setFieldTouched,
  setFieldValue,
  height,
  ...props
}) => {
  const handleChange = e => {
    const newValue = e.target.value;
    setFieldTouched(name, newValue !== value);
    setFieldValue(name, newValue);
  };

  return (
    <Field label={label} error={error} required={required}>
      <textarea
        name={name}
        className="pt-input pt-fill"
        value={value}
        onChange={handleChange}
        dir="auto"
        style={{ height }}
        {...props}
      />
    </Field>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  height: PropTypes.string,
};