import { Avatar, Button, CardHeader, Menu, MenuItem } from "@material-ui/core";
import router from "next/router";
import React from "react";
import { TPresentation } from "../../modules/Presentation";
import { returnDatetimeString } from "../../utils/DateUtil";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TUser } from "../../modules/User";
import DeleteOrButton from "../atoms/share/DeleteOrButton";
interface TProps {
  loginUser: TUser;
  presentation: TPresentation;
}

const CardMenu = (props: TProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
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
          <Avatar
            src={
              props.presentation?.user?.image!
                ? props.presentation?.user?.image!
                : ""
            }
            aria-label="recipe"
          ></Avatar>
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
        <MenuItem>
          <div onClick={() => handleClose()}>
            <DeleteOrButton presentation={props.presentation} />
          </div>
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardMenu;
