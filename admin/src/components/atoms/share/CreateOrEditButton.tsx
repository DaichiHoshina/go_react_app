import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { useFormik, useFormikContext } from 'formik';
import { useRouter } from 'next/router';
import { returnDatetimeSecondString } from '../../../utils/DateUtil';
import { waitForDebugger } from 'node:inspector';

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
  isEditPage?: boolean;
  formik?: ReturnType<typeof useFormik>;
  // 設定をする
}

const CreateOrEditButton: React.FC<Props> = ({ isEditPage = false, formik }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttonString = isEditPage ? '更新' : '登録';

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">{buttonString}します。本当によろしいでしょうか。</p>
      <div className="flex justify-between mt-10">
        <Button variant="contained" color="primary" className="bg-red" onClick={handleClose}>
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="mr-5"
          onClick={async () => {
            await formik?.handleSubmit();
            handleClose();
          }}
        >
          {buttonString}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className="mr-5"
        disabled={!!Object.keys(formik?.errors ?? {}).length}
        onClick={async () => {
          await formik?.validateForm().then((error) => {
            if (Object.keys(error).length === 0) {
              handleOpen();
            }
          });
        }}
      >
        {buttonString}
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

export default CreateOrEditButton;
