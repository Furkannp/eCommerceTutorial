import { FormControl, FormHelperText, InputLabel, Select, TextField } from '@mui/material';
import React from 'react';
import MaskedInput from 'react-text-mask';


export const renderField = ({
  input, id, placeholder, type, customClassName, meta: { touched, error } }) => (
    <>
      <input {...input} id={id} placeholder={placeholder} className={customClassName} type={type} style={{ border: touched && error && "1px solid red" }}/>
      {touched && error && <span className='inputError'>{error}</span>}
    </>
);
export const maskInput = ({
  input, placeholder, type, mask, customClassName,  meta: { touched, error },
}) => (
  <div>
    <MaskedInput {...input} placeholder={placeholder} className={customClassName} type={type} mask={mask} style={{ border: touched && error && "1px solid red" }} />
    {touched && error && <span className="inputError">{error}</span>}
  </div>
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
        id: 'color-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)
export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)