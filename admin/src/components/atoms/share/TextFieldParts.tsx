import { InputAdornment, TextField, IconButton } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { FormikErrors, FormikProps, FormikState, FormikTouched, useFormik } from 'formik';

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
  // 直接指定するコンポーネント外から直接指定するエラーメッセージ。
  directErrorMessage?: string;
}

// interface formikType {
//   initialValues: {
// userId: string;
// password: string;
// };
// initialErrors: FormikErrors<unknown>;
// initialTouched: FormikTouched<unknown>;
// initialStatus: any;
// handleBlur: {
// (e: React.FocusEvent<any>): void;
// <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
// };
// ... 32 more ...;
// submitCount: number;
// }
// }

const TextFieldParts: FC<Props> = ({
  isSubmit = false,
  fullWidth = true,
  label = '',
  name = '',
  isPasswordForm = false,
  className = 'w-full',
  multiline = false,
  rows = 1,
  placeholder = '',
  formik,
  type = 'text',
  directErrorMessage,
}: Props) => {
  const [sampleValue, setSampleValue] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(isPasswordForm ? false : true);
  // const returnInfoAndErrorMessage = (infoMessages: string[] = [], errorMessages: string[] = []) => {
  //   return returnBreakMessage(infoMessages.concat(errorMessages));
  // };

  // const returnBreakMessage = (messages: string[] = []) => {
  //   return (
  //     <div>
  //       {messages.map((message) => (
  //         <p key={message}>{message}</p>
  //       ))}
  //     </div>
  //   );
  // };

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
        type={isShowPassword ? type : 'password'}
        // TODO: 削除。formik && は暫定で設定している。各フォームにpropsとしてformikを設定した段階で取り除く。
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        // 多分不要だけど、とりあえず取っといている。
        // error={isSubmit && true}
        // helperText={returnInfoAndErrorMessage()}
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

// export default TextFieldParts;

export default React.memo(TextFieldParts, (prevProps, nextProps) => {
  prevProps.formik?.values[prevProps.name] === nextProps.formik?.values[nextProps.name] &&
    prevProps.formik?.errors[prevProps.name] === nextProps.formik?.errors[nextProps.name];
});
