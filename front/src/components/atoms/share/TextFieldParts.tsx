import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import { FC, useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
  formik?: any;
  type?: string;
  directErrorMessage?: string;
}

const TextFieldParts: FC<Props> = ({
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
}: Props) => {
  const [isShowPassword, setIsShowPassword] = useState(
    isPasswordForm ? false : true
  );

  const handleClickShowPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <div className={className}>
      <TextField
        id="outlined-basic"
        name={name}
        label={label}
        variant="outlined"
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        placeholder={placeholder}
        type={isShowPassword ? type : "password"}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        error={Boolean(formik?.errors[name])}
        helperText={formik?.errors[name]}
        inputProps={{
          style: {
            padding: 8,
            paddingLeft: 10,
            paddingRight: 10,
          },
        }}
        InputProps={
          isPasswordForm
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {isShowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : {}
        }
      />
    </div>
  );
};

export default TextFieldParts;
