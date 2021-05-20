import { IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { TUser } from "../../../modules/User";
import { useRouter } from "next/router";
import { loginConfirm } from "../../../services/User";

const HeaderUserIcon: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clickLogout = () => {
    router.push("/auth/logout");
    setAnchorEl(null);
  };

  const clickUserSetting = () => {
    router.push(`/users/${userId}`);
    setAnchorEl(null);
  };

  // ログイン中か確認する
  const userLoginConfirm = async () => {
    const result = await dispatch(loginConfirm());
    const user: TUser = result.payload?.data;
    user && setUserName(user?.name!);
    user && setUserId(user?.id!);
  };

  useEffect(() => {
    userLoginConfirm();
  }, []);

  useEffect(() => {
    // const user = localStorage.getItem('tbmUser');

    return () => {
      //
    };
  }, [router.pathname]);

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
        <MenuItem onClick={clickUserSetting}>ユーザー詳細</MenuItem>
        <MenuItem onClick={clickLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUserIcon;
