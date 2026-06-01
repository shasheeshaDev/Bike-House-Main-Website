"use client";

import * as React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  value: string;
  nameId: string;
  options: SelectOption[];
  placeholder: string;
  required?: boolean;
  onChange: (value: string) => void;
  classnames?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  nameId,
  options,
  placeholder,
  required = false,
  onChange,
  classnames = "",
}) => {
  return (
    <select
      id={nameId}
      name={nameId}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`bg-transparent ${classnames}`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectField;
