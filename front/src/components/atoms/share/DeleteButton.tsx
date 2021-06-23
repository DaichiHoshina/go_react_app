import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";

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
  deleteFunc?: any;
  isCloseModal?: boolean;
}

const DeleteButton: React.FC<Props> = ({
  deleteFunc,
  isCloseModal = false,
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

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p id="simple-modal-description">
        削除します。本当によろしいでしょうか。
      </p>
      <div className="flex justify-between mt-10">
        <Button
          variant="contained"
          color="primary"
          className="bg-red"
          onClick={handleClose}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="mr-5"
          onClick={() => {
            deleteFunc();
            if (isCloseModal) handleClose();
          }}
        >
          削除
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
        onClick={handleOpen}
      >
        削除
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

export default DeleteButton;
