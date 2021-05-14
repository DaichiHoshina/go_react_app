import { TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';

interface Props {
  name: string;
  formik?: ReturnType<typeof useFormik>;
}

const DatePickerField: React.FC<Props> = ({ name = '', formik }) => {
  return (
    <>
      <TextField
        id="date"
        type="date"
        name={name}
        // defaultValue="2017-05-24"
        variant="outlined"
        fullWidth
        // className={classes.textField}
        inputProps={{
          style: {
            padding: 8,
            paddingLeft: 10,
            paddingRight: 10,
          },
        }}
        InputLabelProps={{
          shrink: true,
        }}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        error={Boolean(formik?.errors[name])}
        helperText={formik?.errors[name]}
      />
    </>
  );
};

export default DatePickerField;
