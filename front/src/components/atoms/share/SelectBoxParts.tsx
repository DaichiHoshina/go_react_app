import {
  MenuItem,
  FormControl,
  Select,
  createStyles,
  makeStyles,
  NativeSelect,
  withStyles,
  InputBase,
  Theme,
  FormHelperText,
} from '@material-ui/core';
import React, { FC, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';

interface Props {
  isSubmit?: boolean;
  fullWidth?: boolean;
  label?: string;
  name: string;
  text?: string;
  isPasswordForm?: boolean;
  className?: string;
  menuItems: MenuItem[];
  formik?: ReturnType<typeof useFormik>;
  // TODO: promise対応。暫定でanyにしている。
  onChange?: VoidFunction | any;
  placeholder?: string;
}

interface MenuItem {
  label: string;
  value: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      width: '100%',
      minWidth: 120,
      padding: 0,
    },
    selectEmpty: {
      // marginTop: theme.spacing(1),
    },
  }),
);

const SelectBoxParts: FC<Props> = ({
  isSubmit = false,
  fullWidth = true,
  label = '',
  name = '',
  menuItems = [{ value: '', label: '' }],
  className = '',
  formik,
  onChange,
  placeholder = '',
}) => {
  const classes = useStyles();

  const [value, setValue] = useState('');

  // selectボックスの値を更新するために活用。
  useEffect(() => {
    setValue(formik?.values[name]);
    return () => {
      //
    };
  }, [formik?.values[name]]);

  return (
    <div className={className}>
      <FormControl className={classes.formControl} error={Boolean(formik?.errors[name])}>
        {/* <InputLabel id="demo-customized-select-label">Age</InputLabel> */}
        <Select
          // labelId="demo-customized-select-label"
          // id="demo-customized-select"
          name={name}
          value={value}
          displayEmpty
          onChange={onChange ?? formik?.handleChange}
          // TODO: consoleのエラー解消。variantかinputのどちらかでエラーが出ている。
          variant="outlined"
          input={<BootstrapInput />}
          fullWidth
        >
          {placeholder !== '' && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {menuItems.map((menuItem: MenuItem) => {
            return (
              <MenuItem key={menuItem.value} value={menuItem.value} primaryText={menuItem.value}>
                {menuItem.label}
              </MenuItem>
            );
          })}
        </Select>
        <FormHelperText>{formik?.errors[name]}</FormHelperText>
      </FormControl>
    </div>
  );
};

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        // marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

export default SelectBoxParts;
