import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { createMuiTheme } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "@material-ui/core";
import { useRouter } from "next/router";
import SideMenuArea from "./templates/SideMenuArea";

const drawerWidth = 240;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Daichi Hoshina"}
    </Typography>
  );
};

export interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(true);
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [sideMenuWidth, setSideMenuWidth] = useState(0);

  const handleDrawerOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (sideMenuRef.current !== null) {
      setSideMenuWidth(sideMenuRef.current.clientWidth);
    }
  });

  return (
    <div className="min-h-screen bg-blue-50">
      <CssBaseline />
      <AppBar style={{ zIndex: 1201 }} position="fixed">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className="flex-grow">
            管理画面
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          paddingLeft:
            isOpen && !router.pathname.includes("/login") ? sideMenuWidth : 0,
        }}
      >
        <div className="p-5">
          <Typography component="h2" variant="h5" color="inherit">
            {title}
          </Typography>
          {children}
        </div>
      </div>
      <Box className="pt-8">
        <Copyright />
      </Box>
      <Drawer open={isOpen} variant="persistent" anchor="left">
        <div ref={sideMenuRef} />
        <SideMenuArea />
      </Drawer>
    </div>
  );
};

export default Layout;
