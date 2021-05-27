import { CardActions, IconButton, Typography } from "@material-ui/core";
import React, { FC } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TPresentation } from "../../modules/Presentation";
import { useDispatch } from "react-redux";
import { TUser } from "../../modules/User";
import { createLike, deleteLike } from "../../services/Like";
import { fetchPresentations } from "../../services/Presentation";

interface Props {
  presentation?: TPresentation;
  loginUser?: TUser;
}

const FavoriteIconButton: FC<Props> = ({ presentation, loginUser }: Props) => {
  const dispatch = useDispatch();
  const [likeId, setLikeId] = React.useState<number | null>(null);

  const likeCreate = async (
    user_id: number,
    presentation_id: number | string
  ) => {
    const likeValue = {
      user_id: user_id,
      presentation_id: presentation_id,
    };
    await dispatch(
      createLike({
        like: likeValue,
      })
    );
    await dispatch(
      fetchPresentations({
        page: 1,
        per: 1,
      })
    );
  };

  const likeDelete = async (
    id: number,
    user_id: number,
    presentation_id: number | string
  ) => {
    const likeValue = {
      id: id,
      user_id: user_id,
      presentation_id: presentation_id,
    };
    await dispatch(
      deleteLike({
        like: likeValue,
      })
    );
    await dispatch(
      fetchPresentations({
        page: 1,
        per: 1,
      })
    );
  };

  return (
    <>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            if (presentation?.likes?.length > 0) {
              presentation?.likes?.some((like) =>
                like.user_id! == loginUser?.id! &&
                like.presentation_id! == presentation?.id!
                  ? likeDelete(like?.id!, loginUser?.id!, presentation?.id!)
                  : likeCreate(loginUser?.id!, presentation?.id!)
              );
              //likeがない場合は、そもそも動かなくなるので、条件分岐で動かす必要がある。
            } else {
              likeCreate(loginUser?.id!, presentation?.id!);
            }
          }}
        >
          <FavoriteIcon
            color={presentation?.likes?.length ? "secondary" : "disabled"}
          />
          <div className="ml-1">
            <Typography color={presentation?.likes?.length ? "" : "error"}>
              {presentation?.likes?.length}
            </Typography>
          </div>
        </IconButton>
      </CardActions>
    </>
  );
};
export default FavoriteIconButton;
