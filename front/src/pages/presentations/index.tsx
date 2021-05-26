import React, { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TPresentation } from "../../modules/Presentation";
import {
  makeStyles,
  CardActions,
  CardContent,
  CardMedia,
  createStyles,
  IconButton,
  Theme,
  Typography,
  Grid,
  Card,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import RecordAddLinkButton from "../../components/atoms/share/RecordAddLinkButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { TPresentationState } from "../../modules/Presentation";
import CardMenu from "../../components/molecules/CardMenu";
import { fetchPresentations } from "../../services/Presentation";
import { loginConfirm, loginUser } from "../../services/User";
import { TUserState } from "../../modules/User";
import { Label } from "@material-ui/icons";

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
  const [isPush, setIsPush] = React.useState(false);
  const open = Boolean(anchorEl);
  const state = useSelector(
    (state: { presentationState: TPresentationState; userState: TUserState }) =>
      state
  );

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
    dispatch(loginConfirm());
  }, []);

  const handleOpen = () => {
    debugger;
    setIsPush(!isPush);
  };

  return (
    <Layout title="">
      <Grid container justify="center">
        {state.presentationState?.presentations!.map((presentation) => {
          return (
            <div style={{ marginTop: 20, padding: 30 }}>
              <Card className={classes.root}>
                <CardMenu
                  presentation={presentation}
                  loginUser={state?.userState?.user!}
                />

                {/* 画像 */}
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

                <div className="float-right">
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={handleOpen}
                    >
                      <FavoriteIcon
                        color={
                          presentation?.likes?.length ? "secondary" : "disabled"
                        }
                      />
                      <div className="ml-1">
                        <Typography
                          color={presentation?.likes?.length ? "" : "error"}
                        >
                          {presentation?.likes?.length}
                        </Typography>
                      </div>
                    </IconButton>
                  </CardActions>
                </div>
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
