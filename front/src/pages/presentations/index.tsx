import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TPresentation } from "../../modules/Presentation";
import { deletePresentation } from "../../services/Presentation";
import {
  makeStyles,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createStyles,
  IconButton,
  Theme,
  Typography,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import RecordAddLinkButton from "../../components/atoms/share/RecordAddLinkButton";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import {
  fetchPresentation,
  fetchPresentations,
} from "../../services/Presentation";
import {
  presentationSlice,
  TPresentationState,
} from "../../modules/Presentation";
import { returnDatetimeString } from "../../utils/DateUtil";
import router from "next/router";
import { useSnackbar } from "notistack";

export const PresentationsContext = createContext<{
  presentations?: PresentationsApiInterface;
  setPresentations?: any;
}>({});

export interface PresentationsApiInterface {
  tbm_presentations?: TPresentation[];
}

interface formType {
  name?: string;
  kana?: string;
  pref?: string;
  pic?: string;
  medical_org_id?: string;
  reservation_type_memo?: string;
  operating?: string;
  exist_interlock?: string;
  page?: number;
  per?: number;
  sorts: string[];
}

const PresentationList: React.FC = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const state = useSelector(
    (state: { presentationState: TPresentationState }) => state
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

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

  useEffect(() => {
    dispatch(
      fetchPresentations({
        page: 1,
        per: 1,
      })
    );
  }, []);

  const clickPresentationDelete = (presentation: TPresentation) => {
    const response = dispatch(
      deletePresentation({
        id: presentation.id,
      })
    );
    if (response.payload?.[0]) {
      enqueueSnackbar("削除しました。", { variant: "success" });
      router.push("/presentations");
    }
    setAnchorEl(null);
  };

  const clickPresentationEdit = (presentation: TPresentation) => {
    // router.push(`/presentations/${presentation.id}`);
    setAnchorEl(null);
  };

  return (
    <Layout title="">
      <Grid container justify="center">
        {state.presentationState?.presentations!.map((presentation) => {
          return (
            <div style={{ marginTop: 20, padding: 30 }}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {presentation.id!}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings" onClick={handleMenu}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={presentation.title}
                  subheader={returnDatetimeString(presentation.created_at)}
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
                  <MenuItem onClick={() => console.log(presentation)}>
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => clickPresentationDelete(presentation)}
                  >
                    Delete
                  </MenuItem>
                </Menu>
                <CardMedia
                  className={classes.media}
                  image="/img/test.jpg"
                  title="Paella dish"
                ></CardMedia>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {presentation.discription}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </Grid>
      <div className={classes.fab}>
        <RecordAddLinkButton pathString="presentations" />
      </div>
    </Layout>
  );
};

export default PresentationList;
