import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TUser } from "../../modules/User";
import { fetchUsers } from "../../services/User";
import {
  makeStyles,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  createStyles,
  IconButton,
  Theme,
  Typography,
  Grid,
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

export const UsersContext = createContext<{
  users?: UsersApiInterface;
  setUsers?: any;
}>({});

export interface UsersApiInterface {
  tbm_users?: TUser[];
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
  const [expanded, setExpanded] = React.useState(false);
  const state = useSelector(
    (state: { presentationState: TPresentationState }) => state
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  return (
    <Layout title="">
      <Grid container spacing={40} justify="center">
        {state.presentationState?.presentations!.map((presentation) => {
          return (
            <div style={{ marginTop: 20, padding: 30 }}>
              <Card className={classes.root}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      R
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={presentation.title}
                  subheader={presentation.created_at}
                />
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
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </Grid>
    </Layout>
  );
};

export default PresentationList;
