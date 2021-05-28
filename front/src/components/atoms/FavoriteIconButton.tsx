import { CardActions, IconButton, Typography } from "@material-ui/core";
import React, { FC, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { TPresentation } from "../../modules/Presentation";
import { useDispatch } from "react-redux";
import { TUser } from "../../modules/User";
import { createLike, deleteLike } from "../../services/Like";
import { fetchPresentations } from "../../services/Presentation";

interface Props {
  presentation?: TPresentation;
  loginUser?: TUser;
  key?: number;
}

const FavoriteIconButton: FC<Props> = ({
  presentation,
  loginUser,
  key,
}: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isLikeCreate) {
      likeDelete(loginUser?.id!, presentation?.id!);
    } else {
      likeCreate(loginUser?.id!, presentation?.id!);
    }
  };

  const isLikeCreate = presentation?.likes?.some(
    (like) => like.user_id! == loginUser?.id!
  );

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
    user_id: number,
    presentation_id: number | string
  ) => {
    const likeValue = {
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
        <div onClick={handleClick} key={key}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon color={isLikeCreate ? "secondary" : "disabled"} />
            <div className="ml-1">
              <Typography color={isLikeCreate ? "" : "error"}>
                {presentation?.likes?.length}
              </Typography>
            </div>
          </IconButton>
        </div>
      </CardActions>
    </>
  );
};
export default FavoriteIconButton;
