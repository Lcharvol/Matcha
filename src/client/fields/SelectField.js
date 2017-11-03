import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, map } from 'ramda';
import { Field } from '../fields';
import Select from 'react-select';

import './react-select-override.css';

const SelectCreatableStyled = styled(Select.Creatable)``;
const SelectStyled = styled(Select)``;

export const SelectField = ({
  name,
  label,
  required,
  value,
  setFieldTouched,
  setFieldValue,
  domainValues,
  creatable = false,
  clearable = false,
  ...props
}) => {
  const handleChange = e => {
    if (!e) {
      setFieldTouched(name, newValue !== value);
      setFieldValue(name, '');
      return;
    }
    if (name === 'type' && e.value === 'worker') {
      setFieldTouched('companyId', true);
      setFieldValue('companyId', '566abdf896de2706000c9481');
    }
    const newValue = e.value;
    setFieldTouched(name, newValue !== value);
    setFieldValue(name, newValue);
  };
  const getOptions = map(value => ({ value: value.id, label: value.value }));
  return (
    <Field label={label} required={required}>
      {creatable ? (
        <SelectCreatableStyled
          placeholder={`Select ${label}...`}
          id={label}
          options={getOptions(domainValues)}
          onChange={handleChange}
          clearable={clearable}
          value={value}
          name={label}
          {...props}
        />
      ) : (
        <SelectStyled
          placeholder={`Select ${label}...`}
          id={label}
          options={getOptions(domainValues)}
          clearable={clearable}
          onChange={handleChange}
          value={value}
          name={label}
          {...props}
        />
      )}
    </Field>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool.isRequired,
  domainValues: PropTypes.array,
  value: PropTypes.string,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  creatable: PropTypes.bool,
  clearable: PropTypes.bool,
};

export const MultiSelectField = ({
  name,
  label,
  required,
  value,
  setFieldTouched,
  setFieldValue,
  domainValues,
  creatable = false,
  clearable = false,
  ...props
}) => {
  const handleChange = e => {
    const newValue = e;
    setFieldTouched(name, newValue !== value);
    setFieldValue(name, newValue);
  };
  const getOptions = map(value => ({ value: value.id, label: value.value }));
  return (
    <Field label={label} required={required}>
      {creatable ? (
        <SelectCreatableStyled
          placeholder={`Select ${label}...`}
          id={label}
          multi={true}
          options={getOptions(domainValues)}
          clearable={clearable}
          onChange={handleChange}
          value={value}
          name={label}
          {...props}
        />
      ) : (
        <SelectStyled
          placeholder={`Select ${label}...`}
          id={label}
          multi={true}
          options={getOptions(domainValues)}
          clearable={clearable}
          onChange={handleChange}
          value={value}
          name={label}
          {...props}
        />
      )}
    </Field>
  );
};

MultiSelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool.isRequired,
  domainValues: PropTypes.array,
  value: PropTypes.array,
  setFieldValue: PropTypes.func,
  setFieldTouched: PropTypes.func,
  creatable: PropTypes.bool,
  clearable: PropTypes.bool,
};