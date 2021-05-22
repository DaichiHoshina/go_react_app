import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { TUser } from "../../../modules/User";
import { useRouter } from "next/router";
import { loginConfirm, logoutUser } from "../../../services/User";
import { useSnackbar } from "notistack";

const HeaderUserIcon: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clickLogout = async () => {
    const result = await dispatch(logoutUser());
    if (result?.payload?.status === 200) {
      enqueueSnackbar("Logout!!", {
        variant: "success",
      });
      router.push(`/login`);
      setAnchorEl(null);
    } else {
      enqueueSnackbar("Failure...", {
        variant: "error",
      });
    }
  };

  // ログイン中か確認する
  const userLoginConfirm = async () => {
    const result = await dispatch(loginConfirm());
    const user: TUser = await result.payload?.data;
    user && (await setUserName(user?.name!));
    user && (await setUserId(user?.id!));
    debugger;
  };

  useEffect(() => {
    userLoginConfirm();
  }, []);

  const clickUserSetting = () => {
    router.push(`/users/${userId}`);
    setAnchorEl(null);
  };

  return (
    <>
      {userName}
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
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
        <MenuItem onClick={clickUserSetting}>Profile</MenuItem>
        <MenuItem onClick={clickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUserIcon;
