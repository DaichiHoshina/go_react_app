import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  TableBody,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import CategoryTitle from './CategiryTitle';
import { buySmsNumber, fetchSmsNumbers } from '../../../services/SmsNumber';
import { Formik, useFormik } from 'formik';
import { returnSmsDisplayString } from '../../../utils/String';
import { useSnackbar, VariantType } from 'notistack';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface Data {
  userId: string;
  fullname: string;
  auth: string;
}

const tableStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 250,
  },
});

interface Props {
  formik?: ReturnType<typeof useFormik>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

interface Props {
  formik?: ReturnType<typeof useFormik>;
}

const SmsBuyButton: React.FC<Props> = ({ formik }) => {
  const classes = useStyles();
  const tableClasses = tableStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [canUseSmsNumbers, setCanUseSmsNumbers] = useState<string[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (open) {
        const response = await fetchSmsNumbers();
        setCanUseSmsNumbers(response ?? []);
      }
    })();
  }, [open]);

  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant: VariantType, message: string) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className="mb-3 pl-5 text-lg border-b border-l-8 border-gray-600">電話番号購入</h2>
      <p id="simple-modal-description">※ 購入した時点で課金が発生します。</p>
      <div>
        <Paper className={tableClasses.root}>
          <TableContainer className={tableClasses.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableBody>
                {canUseSmsNumbers.map((smsNumber) => {
                  return (
                    <TableRow key={smsNumber}>
                      <TableCell style={{ minWidth: 230 }}>
                        {returnSmsDisplayString(smsNumber)}
                      </TableCell>
                      <TableCell style={{ minWidth: 140 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className="mr-5"
                          onClick={async () => {
                            const response = await buySmsNumber(smsNumber);
                            if (response) {
                              formik?.setFieldValue('sms_number', response);
                              handleClickVariant('success', 'sms番号を購入しました。');
                              handleClose();
                            } else {
                              handleClickVariant('error', '購入に失敗しました。');
                            }
                          }}
                        >
                          購入
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <div className="flex justify-between mt-10">
        <Button variant="contained" color="primary" className="bg-red" onClick={handleClose}>
          キャンセル
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" className="mr-5" onClick={handleOpen}>
        購入
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default SmsBuyButton;
