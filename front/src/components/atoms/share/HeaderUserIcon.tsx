import { IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useRouter } from 'next/router';
import { TAspUser } from '../../../services/AspUser';

const HeaderUserIcon: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [userName, setUserName] = useState('');

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clickLogout = () => {
    router.push('/login');
    setAnchorEl(null);
  };

  const clickUserSetting = () => {
    router.push('/user-setting');
    setAnchorEl(null);
  };

  useEffect(() => {
    // const aspUser = localStorage.getItem('tbmAspUser');
    const aspUser: TAspUser =
      localStorage.getItem('tbmAspUser') && JSON.parse(localStorage.getItem('tbmAspUser') ?? '');
    aspUser && setUserName((aspUser.name1 ?? '') + ' ' + (aspUser.name2 ?? ''));
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
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={clickUserSetting}>ユーザー設定</MenuItem>
        <MenuItem onClick={clickLogout}>ログアウト</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderUserIcon;
