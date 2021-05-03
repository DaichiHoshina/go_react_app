import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const IndexPage = () => (
  <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" >
      New
    </Typography>
    <Button color="inherit">Login</Button>
  </Toolbar>
</AppBar>
)

export default IndexPage
