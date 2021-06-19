import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useFormik } from "formik";

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
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface Props {
  isEditPage?: boolean;
  formik?: ReturnType<typeof useFormik>;
}

const CreateOrEditButton: React.FC<Props> = ({
  isEditPage = false,
  formik,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const buttonString = isEditPage ? "UPDATE!" : "CREATE!";

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">OK???</p>
      <div className="flex justify-between mt-10">
        <Button
          variant="contained"
          color="primary"
          className="bg-red"
          onClick={handleClose}
        >
          CANCEL
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
