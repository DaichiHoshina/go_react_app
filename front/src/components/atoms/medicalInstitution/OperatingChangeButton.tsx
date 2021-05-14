import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import { createOrUpdateMedicalOrgs } from '../../../services/MedicalOrgs';

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
  // TODO: 型設定。
  deleteFunc?: any;
  formik?: ReturnType<typeof useFormik>;
}

const OperationChangeButton: React.FC<Props> = ({ deleteFunc, formik }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const operationOppositionString = !formik?.values.operating ? '稼働' : '停止';

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
        医療機関機能を{operationOppositionString}させます。よろしいですか？
      </p>
      <div className="flex justify-between mt-10">
        <Button variant="contained" color="primary" className="bg-red" onClick={handleClose}>
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="mr-5"
          onClick={async () => {
            const operatingOpposition = !formik?.values.operating;
            const medicalOrg = {
              id: formik?.values?.id,
              medical_org_id: formik?.values?.medical_org_id,
              operating: operatingOpposition,
              operating_change_datetime: new Date(),
            };
            await createOrUpdateMedicalOrgs(medicalOrg);
            formik?.setFieldValue('operating', operatingOpposition);
            handleClose();
          }}
        >
          {operationOppositionString}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {operationOppositionString}
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

export default OperationChangeButton;
