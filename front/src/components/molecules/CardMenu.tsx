import classes from "*.module.css";
import {
  Avatar,
  Button,
  CardHeader,
  createStyles,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Theme,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import router from "next/router";
import { useSnackbar } from "notistack";
import React from "react";
import { useDispatch } from "react-redux";
import { TPresentation } from "../../modules/Presentation";
import {
  deletePresentation,
  fetchPresentations,
} from "../../services/Presentation";
import { returnDatetimeString } from "../../utils/DateUtil";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TUser } from "../../modules/User";

interface TProps {
  loginUser: TUser;
  presentation: TPresentation;
}

const CardMenu = (props: TProps): JSX.Element => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      avatar: {
        backgroundColor: red[500],
      },
      fab: {
        position: "fixed" /* ←表示場所を固定 */,
        bottom: 25 /* ←下端からの距離 */,
        right: 25,
      },
    })
  );

  const classes = useStyles();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickPresentationDelete = async (presentation: TPresentation) => {
    const response = await dispatch(
      deletePresentation({
        id: props.presentation.id,
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
    setAnchorEl(null);
  };

  const clickPresentationEdit = (presentation: TPresentation) => {
    router.push(`/presentations/${presentation.id}`);
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <CardHeader
        avatar={
          <Avatar src={props.presentation?.user?.image! ? props.presentation?.user?.image! : ""} aria-label="recipe" className={classes.avatar}>
            {props.presentation.id!}
          </Avatar>
        }
        action={
          // 投稿したユーザー自身のみが編集できるようにする
          <Button
            aria-label="settings"
            onClick={handleMenu}
            disabled={props.presentation?.user_id != props.loginUser?.id}
            size="small"
          >
            <MoreVertIcon />
          </Button>
        }
        title={`@ ${props.presentation?.user?.name!}`}
        subheader={returnDatetimeString(props.presentation.created_at)}
      />

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => clickPresentationEdit(props.presentation)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => clickPresentationDelete(props.presentation)}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardMenu;
