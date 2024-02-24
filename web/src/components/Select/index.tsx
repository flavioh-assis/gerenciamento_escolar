import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export default ({ label, name, options, ...rest }: SelectProps) => {
  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select id={name} {...rest}>
        <option value="" hidden={options.length > 0}>
          -----
        </option>

        {options.map(option => (
          <option key={option.value} value={option.value} label={option.label} />
        ))}
      </select>
    </div>
  );
};
