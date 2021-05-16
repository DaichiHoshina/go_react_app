import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';

interface Props {
  isSubmit?: boolean;
  fullWidth?: boolean;
  label?: string;
  // groupNameは単体のチェックボックスの場合は不要。
  groupName?: string;
  text?: string;
  isPasswordForm?: boolean;
  className?: string;
  menuItems: MenuItem[];
  formik?: ReturnType<typeof useFormik>;
  name: string;
  id?: number;
}

interface MenuItem {
  name: string;
  label: string;
  value: any;
}

const TableSelectCheckBox: React.FC<Props> = ({ formik, id, name }) => {
  const checkboxId = name + '.' + id;
  const tableSelectValue = formik?.values[name];
  return (
    <Checkbox
      color="primary"
      checked={tableSelectValue.includes(id?.toString())}
      onChange={() => {
        if (tableSelectValue && tableSelectValue.includes(id?.toString())) {
          formik?.setFieldValue(
            name,
            tableSelectValue.filter((value: string) => +value !== id),
          );
        } else {
          tableSelectValue.push(id?.toString());
          formik?.setFieldValue(name, tableSelectValue);
        }
      }}
      name={name + '.' + id}
    />
  );
};

export default TableSelectCheckBox;
