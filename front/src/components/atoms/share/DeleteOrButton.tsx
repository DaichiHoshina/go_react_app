import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useFormik, useFormikContext } from "formik";
import { useRouter } from "next/router";
import { TPresentation } from "../../../modules/Presentation";
import {
  deletePresentation,
  fetchPresentations,
} from "../../../services/Presentation";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

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
  presentation?: TPresentation;
}

const DeleteOrButton: React.FC<Props> = ({
  isEditPage = false,
  formik,
  presentation,
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const clickPresentationDelete = async (presentation: TPresentation) => {
    const response = await dispatch(
      deletePresentation({
        id: presentation.id,
      })
    );
    if (response.payload?.[0]) {
      enqueueSnackbar("削除しました。", { variant: "success" });
      await dispatch(
        fetchPresentations({
          page: 1,
          per: 1,
        })
      );
    }
    handleClose();
    setAnchorEl(null);
  };

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
            await clickPresentationDelete(presentation!);
            handleClose();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div
        onClick={async () => {
          await handleOpen();
        }}
      >
        {" "}
        Delete
      </div>

      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default DeleteOrButton;