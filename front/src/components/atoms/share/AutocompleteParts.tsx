import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
  FormikErrors,
  FormikProps,
  FormikState,
  FormikTouched,
  useFormik,
} from "formik";
import { Autocomplete } from "@material-ui/lab";
import TextFieldParts from "./TextFieldParts";

interface Props {
  isSubmit?: boolean;
  fullWidth?: boolean;
  label?: string;
  name: string;
  text?: string;
  isPasswordForm?: boolean;
  className?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  formik?: ReturnType<typeof useFormik>;
  type?: string;
  directErrorMessage?: string;
  options?: { label: string; value: string }[];
  name1?: string;
  name2?: string;
  value?: any;
}

const AutocompleteParts: FC<Props> = ({
  isSubmit = false,
  fullWidth = true,
  label = "",
  name = "",
  isPasswordForm = false,
  className = "w-full",
  multiline = false,
  rows = 1,
  placeholder = "",
  formik,
  type = "text",
  directErrorMessage,
  options = [],
  name1,
  name2,
  value,
}: Props) => {
  console.log(className);

  return (
    <div className={className}>
      <Autocomplete
        id="combo-box"
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(
          event: any,
          newValue: { label: string; value: string } | null
        ) => {
          formik?.setFieldValue(name, newValue);
          name1 && formik?.setFieldValue(name1, newValue?.label);
          name2 && formik?.setFieldValue(name2, newValue?.value);
        }}
        style={{ width: 300 }}
        renderInput={(params) => (
          // <TextField {...params} label="Combo box" variant="outlined" />
          <TextField
            {...params}
            name={name}
            variant="outlined"
            value={formik?.values[name]}
            error={Boolean(formik?.errors[name1 ?? ""])}
            helperText={formik?.errors[name1 ?? ""]}
          />
        )}
      />
    </div>
  );
};
export default AutocompleteParts;
